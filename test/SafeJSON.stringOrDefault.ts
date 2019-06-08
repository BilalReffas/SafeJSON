import assert from "assert";
import { SafeJSON } from "../src/SafeJSON";

describe("SafeJSON", () => {
    describe("stringOrDefault()", () => {
        it("should return \"hello, world\" from string", () => {
            const sj = new SafeJSON("hello, world");
            assert.deepEqual(sj.stringOrDefault("hello"), "hello, world");
        });
        it("should return \"hello, world\" from String", () => {
            const sj = new SafeJSON(String("hello, world"));
            assert.deepEqual(sj.stringOrDefault("hello"), "hello, world");
        });
        it("should return \"hello\" from number", () => {
            const sj = new SafeJSON(123.45);
            assert.deepEqual(sj.stringOrDefault("hello"), "hello");
        });
        it("shoule return \"hello\" from Number", () => {
            const sj = new SafeJSON(Number(123.45));
            assert.deepEqual(sj.stringOrDefault("hello"), "hello");
        });
        it("should return \"hello\" from boolean", () => {
            const sj = new SafeJSON(true);
            assert.deepEqual(sj.stringOrDefault("hello"), "hello");
        });
        it("should return \"hello\" from Boolean", () => {
            const sj = new SafeJSON(Boolean(true));
            assert.deepEqual(sj.stringOrDefault("hello"), "hello");
        });
        it("should return \"hello\" from dictionary", () => {
            const sj = new SafeJSON({hello: "world"});
            assert.deepEqual(sj.stringOrDefault("hello"), "hello");
        });
        it("should return \"hello\" from array", () => {
            const sj = new SafeJSON(["hello", "world"]);
            assert.deepEqual(sj.stringOrDefault("hello"), "hello");
        });
        it("should return \"hello\" from null", () => {
            const sj = new SafeJSON(null);
            assert.deepEqual(sj.stringOrDefault("hello"), "hello");
        });
        it("should return \"hello\" from undefined", () => {
            const sj = new SafeJSON(undefined);
            assert.deepEqual(sj.stringOrDefault("hello"), "hello");
        });
        it("should return \"hello\" from function", () => {
            const func = () => {
                return 3;
            };
            const sj = new SafeJSON(func);
            assert.deepEqual(sj.stringOrDefault("hello"), "hello");
        });
    });
});
