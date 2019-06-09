import { SafeJSON } from "../src/SafeJSON";

export class Address {
    public readonly street: string;
    public readonly postCode: string;
    public readonly city: string;
    public readonly country: string;

    constructor(json: SafeJSON) {
        this.street = json.at("street").stringValue();
        this.postCode = json.at("postCode").stringValue();
        this.city = json.at("city").stringValue();
        this.country = json.at("country").stringValue();
    }
}
