import assert from "assert";
import { SafeJSON } from "../src/SafeJSON";

describe("SafeJSON", () => {
    describe("stringValue()", () => {
        it("should return \"hello, world\" from string", () => {
            const sj = new SafeJSON("hello, world");
            assert.deepEqual(sj.stringValue(), "hello, world");
        });
        it("should return \"hello, world\" from String", () => {
            const sj = new SafeJSON(String("hello, world"));
            assert.deepEqual(sj.stringValue(), "hello, world");
        });
        it("should return \"\" from number", () => {
            const sj = new SafeJSON(123.45);
            assert.deepEqual(sj.stringValue(), "");
        });
        it("shoule return \"\" from Number", () => {
            const sj = new SafeJSON(Number(123.45));
            assert.deepEqual(sj.stringValue(), "");
        });
        it("should return \"\" from boolean", () => {
            const sj = new SafeJSON(true);
            assert.deepEqual(sj.stringValue(), "");
        });
        it("should return \"\" from Boolean", () => {
            const sj = new SafeJSON(Boolean(true));
            assert.deepEqual(sj.stringValue(), "");
        });
        it("should return \"\" from dictionary", () => {
            const sj = new SafeJSON({hello: "world"});
            assert.deepEqual(sj.stringValue(), "");
        });
        it("should return \"\" from array", () => {
            const sj = new SafeJSON(["hello", "world"]);
            assert.deepEqual(sj.stringValue(), "");
        });
        it("should return \"\" from null", () => {
            const sj = new SafeJSON(null);
            assert.deepEqual(sj.stringValue(), "");
        });
        it("should return \"\" from undefined", () => {
            const sj = new SafeJSON(undefined);
            assert.deepEqual(sj.stringValue(), "");
        });
        it("should return \"\" from function", () => {
            const func = () => {
                return 3;
            };
            const sj = new SafeJSON(func);
            assert.deepEqual(sj.stringValue(), "");
        });
    });
});
