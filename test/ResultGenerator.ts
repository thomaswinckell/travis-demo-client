import * as assert      from "power-assert";

import Result from "../src/model/Result";
import ResultGenerator from "../src/core/ResultGenerator";


describe('Result Generator', () => {

    it("don\'t generate a number that has already been generated in the past (if possible)", () => {
        assert.equal(ResultGenerator.generateNumber([1], 1, 2), 2);
    });
});