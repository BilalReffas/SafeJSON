import assert from "assert";
import { SafeJSON } from "../src/SafeJSON";

describe("SafeJSON", () => {
    describe("atIndex(index)", () => {
        it("should return \"value\"", () => {
            const sj = new SafeJSON(
                [
                    [],
                    [
                        [
                            "index0",
                            "value",
                            "index2",
                        ],
                    ],
                    [],
                ],
            );
            assert.deepEqual(sj.atIndex(1).atIndex(0).atIndex(1).stringValue(), "value");
        });
        it("should return \"world\"", () => {
            const sj = new SafeJSON(
                [
                    {
                        level1: [
                            "index0",
                            "index1",
                            "index2",
                            "world",
                        ],
                    },
                ],
            );
            assert.deepEqual(sj.atIndex(0).at("level1").atIndex(3).stringValue(), "world");
        });
        it("should return null", () => {
            const sj = new SafeJSON(
                [
                ],
            );
            assert.deepEqual(sj.atIndex(0).at("level1").atIndex(3).stringOrNull(), null);
        });
    });
});
