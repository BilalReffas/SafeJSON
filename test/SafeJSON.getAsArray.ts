import assert from "assert";
import { SafeJSON } from "../src/SafeJSON";

describe("SafeJSON", () => {
    describe("getAsArray(index)", () => {
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
            assert.deepEqual(sj.getAsArray(1).getAsArray(0).getAsArray(1).stringValue(), "value");
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
            assert.deepEqual(sj.getAsArray(0).get("level1").getAsArray(3).stringValue(), "world");
        });
        it("should return null", () => {
            const sj = new SafeJSON(
                [
                ],
            );
            assert.deepEqual(sj.getAsArray(0).get("level1").getAsArray(3).stringOrNull(), null);
        });
        it("should return null at bad array index", () => {
            const sj = new SafeJSON(
                [
                    1,
                    2,
                    3,
                ],
            );
            assert.deepEqual(sj.getAsArray(0).numberOrNull(), 1);
            assert.deepEqual(sj.getAsArray(1).numberOrNull(), 2);
            assert.deepEqual(sj.getAsArray(2).numberOrNull(), 3);
            assert.deepEqual(sj.getAsArray(3).numberOrNull(), null);
            assert.deepEqual(sj.getAsArray(8).numberOrNull(), null);
        });
    });
});
