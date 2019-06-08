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
    });
});
