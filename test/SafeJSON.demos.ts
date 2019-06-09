import assert from "assert";
import { SafeJSON } from "../src/SafeJSON";
import { Type } from "../src/Type";
import { Person } from "./Person";

describe("SafeJSON", () => {
    describe("Demos", () => {
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
            assert.deepEqual(object.type, Type.dictionary);
        });
        it("should parse tree object Person", () => {
            const json = `
            [
                {
                    "firstName": "John",
                    "lastName": "Appleseed",
                    "address": {
                        "street": "Main Street 1",
                        "postCode": "2213",
                        "city": "Washington DC",
                        "country": "USA"
                    }
                },
                {
                    "firstName": "Max",
                    "lastName": "Mustermann",
                    "address": {
                        "street": "Hauptstraße 1",
                        "postCode": "34223",
                        "city": "Berlin",
                        "country": "Germany"
                    }
                }
            ]
            `;

            const arr = SafeJSON.parseJSON(json);
            const persons = arr.arrayValue().map((obj: SafeJSON) => {
                return new Person(obj);
            });

            assert.deepEqual(persons[0].firstName, "John");
            assert.deepEqual(persons[0].lastName, "Appleseed");
            assert.deepEqual(persons[0].address.street, "Main Street 1");
            assert.deepEqual(persons[0].address.postCode, "2213");
            assert.deepEqual(persons[0].address.city, "Washington DC");
            assert.deepEqual(persons[0].address.country, "USA");

            assert.deepEqual(persons[1].firstName, "Max");
            assert.deepEqual(persons[1].lastName, "Mustermann");
            assert.deepEqual(persons[1].address.street, "Hauptstraße 1");
            assert.deepEqual(persons[1].address.postCode, "34223");
            assert.deepEqual(persons[1].address.city, "Berlin");
            assert.deepEqual(persons[1].address.country, "Germany");
        });
    });
});
