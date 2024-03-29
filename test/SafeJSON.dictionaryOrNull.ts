import assert from "assert";
import { SafeJSON } from "../src/SafeJSON";

describe("SafeJSON", () => {
    describe("dictionaryOrNull()", () => {
        it("should return null from string", () => {
            const sj = new SafeJSON("hello, world");
            assert.deepEqual(sj.dictionaryOrNull(), null);
        });
        it("should return null from String", () => {
            const sj = new SafeJSON(String("hello, world"));
            assert.deepEqual(sj.dictionaryOrNull(), null);
        });
        it("should return null from number", () => {
            const sj = new SafeJSON(123.45);
            assert.deepEqual(sj.dictionaryOrNull(), null);
        });
        it("shoule return null from Number", () => {
            const sj = new SafeJSON(Number(123.45));
            assert.deepEqual(sj.dictionaryOrNull(), null);
        });
        it("should return null from boolean", () => {
            const sj = new SafeJSON(true);
            assert.deepEqual(sj.dictionaryOrNull(), null);
        });
        it("should return null from Boolean", () => {
            const sj = new SafeJSON(Boolean(true));
            assert.deepEqual(sj.dictionaryOrNull(), null);
        });
        it("should return { hello: \"world\" } from dictionary", () => {
            const sj = new SafeJSON({ hello: "world" });
            const d = sj.dictionaryOrNull();
            if (d == null) {
                assert.fail();
            } else {
                assert.deepEqual(d.hello.stringOrNull(), "world");
            }
        });
        it("should return null from array", () => {
            const sj = new SafeJSON(["hello", "world"]);
            assert.deepEqual(sj.dictionaryOrNull(), null);
        });
        it("should return null from null", () => {
            const sj = new SafeJSON(null);
            assert.deepEqual(sj.dictionaryOrNull(), null);
        });
        it("should return null from undefined", () => {
            const sj = new SafeJSON(undefined);
            assert.deepEqual(sj.dictionaryOrNull(), null);
        });
        it("should return null from function", () => {
            const func = () => {
                return 3;
            };
            const sj = new SafeJSON(func);
            assert.deepEqual(sj.dictionaryOrNull(), null);
        });
    });
});
