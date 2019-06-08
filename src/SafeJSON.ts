import { Type } from "./Type";

export class SafeJSON {

    // Custom initializer

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

    public readonly type: Type;
    private readonly raw: any;

    // Constructor

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

    public stringOrNull(): string | null {
        if (this.type === Type.string) {
            return this.raw;
        } else {
            return null;
        }
    }

    public numberOrNull(): number | null {
        if (this.type === Type.number) {
            return this.raw;
        } else {
            return null;
        }
    }

    public booleanOrNull(): boolean | null {
        if (this.type === Type.boolean) {
            return this.raw;
        } else {
            return null;
        }
    }

    public dictionaryOrNull(): { [key: string]: SafeJSON } | null {
        if (this.type === Type.dictionary) {
            return SafeJSON.mapValue(this.raw, (value: any) => {
                return new SafeJSON(value);
            });
        } else {
            return null;
        }
    }

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
        if (this.type === Type.string) {
            return this.raw;
        } else {
            return value;
        }
    }

    public numberOrDefault(value: number): number {
        if (this.type === Type.number) {
            return this.raw;
        } else {
            return value;
        }
    }

    public booleanOrDefault(value: boolean): boolean {
        if (this.type === Type.boolean) {
            return this.raw;
        } else {
            return value;
        }
    }
}
