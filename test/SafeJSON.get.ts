import assert from "assert";
import { SafeJSON } from "../src/SafeJSON";

describe("SafeJSON", () => {
    describe("get(key)", () => {
        it("should return \"value\"", () => {
            const sj = new SafeJSON({
                level1: {
                    level2: {
                        key: "value",
                    },
                },
            });
            assert.deepEqual(sj.get("level1").get("level2").get("key").stringValue(), "value");
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
            assert.deepEqual(sj.get("level1").get("level2").getAsArray(1).get("hello").stringValue(), "world");
        });
        it("should return null", () => {
            const sj = new SafeJSON({
                level1: {
                },
            });
            assert.deepEqual(sj.get("level1").get("level2").getAsArray(1).get("hello").stringOrNull(), null);
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
                .get("persons")
                .getAsArray(0)
                .get("firstName")
                .stringOrDefault("no name");
            assert.deepEqual(value, "John");
        });
    });
});
