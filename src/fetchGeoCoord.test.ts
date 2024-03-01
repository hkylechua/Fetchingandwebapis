import assert from "assert";
import { fetchGeoCoord } from "./fetchGeoCoord.js";

describe("fetchGeoCoord", () => {
  it("follows type specification", () => {
    const promise = fetchGeoCoord("University of Massachusetts Amherst");

    return promise.then(result => {
      assert(typeof result === "object"); //  Assert the result is an object
      assert(typeof result.lon === "number"); // Assert that the lon value is a number
      assert(typeof result.lat === "number"); // Assert that the lat value is a number
      assert(Object.keys(result).length === 2); // Assert there are only two keys in the object
    });
  });

  it("should throw an error if no results are found", () => {
    const promise = fetchGeoCoord("");

    return expect(promise).rejects.toThrow("No results found for query.");
  });
});
