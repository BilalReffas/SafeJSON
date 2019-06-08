import assert from "assert";
import { SafeJSON } from "../src/SafeJSON";

describe("SafeJSON", () => {
    describe("at(key)", () => {
        it("should return \"value\"", () => {
            const sj = new SafeJSON({
                level1: {
                    level2: {
                        key: "value",
                    },
                },
            });
            assert.deepEqual(sj.at("level1").at("level2").at("key").stringValue(), "value");
        });
        it("should return \"world\"", () => {
            const sj = new SafeJSON({
                level1: {
                    level2: [
                        {

                        },
                        {
                            hello: "world",
                        },
                        {

                        },
                    ],
                },
            });
            assert.deepEqual(sj.at("level1").at("level2").atIndex(1).at("hello").stringValue(), "world");
        });
        it("should return null", () => {
            const sj = new SafeJSON({
                level1: {
                },
            });
            assert.deepEqual(sj.at("level1").at("level2").atIndex(1).at("hello").stringOrNull(), null);
        });
        it("should return \"John\"", () => {
            const parsedJSON = {
                persons: [
                    {
                        firstName: "John",
                        lastName: "Appleseed",
                    },
                ],
            };
            const object = new SafeJSON(parsedJSON);
            const value = object
                .at("persons")
                .atIndex(0)
                .at("firstName")
                .stringOrDefault("no name");
            assert.deepEqual(value, "John");
        });
    });
});
