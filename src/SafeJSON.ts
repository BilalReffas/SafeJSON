import { Type } from "./Type";

export class SafeJSON {

    // Custom initializer

    /**
     * Parses the json literal using JSON.parse.
     *
     * If the JSON failed to parse, a valid SafeJSON object is still returned.
     * The type property of this object has the value Type.null.
     *
     * Only use this, if the parse error can be ignored.
     * This function does not throw.
     *
     * @param json A json string literal that should be parsed.
     */
    public static parseJSON(json: string): SafeJSON {
        try {
            const data = JSON.parse(json);
            return new SafeJSON(data);
        } catch {
            return new SafeJSON(null);
        }
    }

    // Helper functions

    private static isString(value: any): boolean {
        return typeof value === "string" || value instanceof String;
    }

    private static isNumber(value: any): boolean {
        return typeof value === "number" && isFinite(value);
    }

    private static isBoolean(value: any): boolean {
        return typeof value === "boolean";
    }

    private static isArray(value: any): boolean {
        return value && typeof value === "object" && value.constructor === Array;
    }

    private static isDictionary(value: any): boolean {
        return value && typeof value === "object" && value.constructor === Object;
    }

    private static mapValue<A, B>(dict: { [key: string]: A; }, map: (value: A) => B): { [key: string]: B; } {
        const akku: { [key: string]: B } = {};

        Object.keys(dict).forEach((key: string) => {
            akku[key] = map(dict[key]);
        });

        return akku;
    }

    // Properties

    /**
     * The type of the current root object.
     * This can be used to make decision on futher handling.
     */
    public readonly type: Type;
    private readonly raw: any;

    // Constructor

    /**
     * Creates the safe interface to any object.
     * @param object An object that is the result of a JSON parse or any literal.
     */
    constructor(object: any) {
        this.raw = object;

        if (SafeJSON.isString(object)) {
            this.type = Type.string;
        } else if (SafeJSON.isNumber(object)) {
            this.type = Type.number;
        } else if (SafeJSON.isBoolean(object)) {
            this.type = Type.boolean;
        } else if (SafeJSON.isArray(object)) {
            this.type = Type.array;
        } else if (SafeJSON.isDictionary(object)) {
            this.type = Type.dictionary;
        } else  {
            this.type = Type.null;
        }
    }

    // OrNull interface

    /**
     * Tries to parse a string value and returns it.
     *
     * A number is converted to a string using toString().
     *
     * A boolean is converted to a string:
     * - true: "true"
     * - false: "false"
     *
     * @return A string value or null if it cannot be converted.
     */
    public stringOrNull(): string | null {
        switch (this.type) {
            case Type.string: {
                return this.raw;
            }
            case Type.number: {
                return (this.raw as number).toString();
            }
            case Type.boolean: {
                if (this.raw as boolean) {
                    return "true";
                } else {
                    return "false";
                }
            }
            case Type.dictionary: return null;
            case Type.array: return null;
            case Type.null: return null;
        }
    }

    /**
     * Tries to parse a number value and returns it.
     *
     * A string is converted to a number using Number() constructor.
     * If the result is NaN, null will be returned.
     *
     * A boolean is converted to a number:
     * - true: 1
     * - false: 0
     *
     * @return A number value or null if it cannot be converted.
     */
    public numberOrNull(): number | null {
        switch (this.type) {
            case Type.string: {
                const n = Number(this.raw);
                if (isNaN(n)) {
                    return null;
                } else {
                    return n;
                }
            }
            case Type.number: {
                return (this.raw as number);
            }
            case Type.boolean: {
                if (this.raw as boolean) {
                    return 1;
                } else {
                    return 0;
                }
            }
            case Type.dictionary: return null;
            case Type.array: return null;
            case Type.null: return null;
        }
    }

    /**
     * Tries to parse a boolean value and returns it.
     *
     * A string is converted to a boolean:
     * - "true": true
     * - "false": false
     *
     * A number is converted to a boolean:
     * - 0: false
     * - any other number: true
     *
     * @return A number value or null if it cannot be converted.
     */
    public booleanOrNull(): boolean | null {
        switch (this.type) {
            case Type.string: {
                if (this.raw === "true") {
                    return true;
                } else if (this.raw === "false") {
                    return false;
                } else {
                    return null;
                }
            }
            case Type.number: {
                if (this.raw === 0) {
                    return false;
                } else {
                    return true;
                }
            }
            case Type.boolean: {
                return this.raw;
            }
            case Type.dictionary: return null;
            case Type.array: return null;
            case Type.null: return null;
        }
    }

    /**
     * Tries to return the given object as a dictionary.
     *
     * @return A dictionary value or null.
     */
    public dictionaryOrNull(): { [key: string]: SafeJSON } | null {
        if (this.type === Type.dictionary) {
            return SafeJSON.mapValue(this.raw, (value: any) => {
                return new SafeJSON(value);
            });
        } else {
            return null;
        }
    }

    /**
     * Tries to return the given object as an array.
     *
     * @return An array value or null.
     */
    public arrayOrNull(): SafeJSON[] | null {
        if (this.type === Type.array) {
            return (this.raw as any[]).map((value) => {
                return new SafeJSON(value);
            });
        } else {
            return null;
        }
    }

    // Value interface

    public stringValue(): string {
        return this.stringOrDefault("");
    }

    public numberValue(): number {
        return this.numberOrDefault(0);
    }

    public booleanValue(): boolean {
        return this.booleanOrDefault(false);
    }

    public dictionaryValue(): { [key: string]: SafeJSON } {
        if (this.type === Type.dictionary) {
            return SafeJSON.mapValue(this.raw, (value: any) => {
                return new SafeJSON(value);
            });
        } else {
            return {};
        }
    }

    public arrayValue(): SafeJSON[] {
        if (this.type === Type.array) {
            return (this.raw as any[]).map((value) => {
                return new SafeJSON(value);
            });
        } else {
            return [];
        }
    }

    // OrDefault interface

    public stringOrDefault(value: string): string {
        const s = this.stringOrNull();
        if (s === null) {
            return value;
        } else {
            return s;
        }
    }

    public numberOrDefault(value: number): number {
        const n = this.numberOrNull();
        if (n === null) {
            return value;
        } else {
            return n;
        }
    }

    public booleanOrDefault(value: boolean): boolean {
        const b = this.booleanOrNull();
        if (b === null) {
            return value;
        } else {
            return b;
        }
    }

    // Direct dictionary access

    public get(key: string): SafeJSON {
        if (this.type === Type.dictionary) {
            return new SafeJSON(this.raw[key]);
        } else {
            return new SafeJSON(null);
        }
    }

    // Direct array access

    public getAsArray(index: number): SafeJSON {
        if (this.type === Type.array) {
            if (index < ((this.raw as any[]).length)) {
                return new SafeJSON(this.raw[index]);
            } else {
                return new SafeJSON(null);
            }
        } else {
            return new SafeJSON(null);
        }
    }
}
