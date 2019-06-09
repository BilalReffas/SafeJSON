import { SafeJSON } from "../src/SafeJSON";
import { Address } from "./Address";

export class Person {
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly address: Address;

    constructor(json: SafeJSON) {
        this.firstName = json.at("firstName").stringValue();
        this.lastName = json.at("lastName").stringValue();
        this.address = new Address(json.at("address"));
    }
}
