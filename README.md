# SafeJSON

[![Build Status](https://travis-ci.org/SamuelSchepp/SafeJSON.svg?branch=master)](https://travis-ci.org/SamuelSchepp/SafeJSON)

Safe wrapper for any and JSON for TypeScript.

## Usage

```typescript
// Parse JSON
const parsedJSON = {
  persons: [
    {
      firstName: "John",
      lastName: "Appleseed",
    },
  ],
};

// Create safe object
const object = new SafeJSON(parsedJSON);

// Safe access
const value = object
  .get("persons")
  .getAsArray(0)
  .get("firstName")
  .stringOrDefault("no name");

// firstName === "John"
```