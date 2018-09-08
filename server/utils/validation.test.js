const expect = require("expect");
const {isRealString} = require("./validation");

describe("test validation.js",()=>{
    it("should not accept non-string input",()=>{
     var result = isRealString(1234);
     expect(result).toBe(false);
    });

    it("should not accept string with empty spaces",()=>{
        var result = isRealString("    ");
        expect(result).toBe(false);
    });

    it("should accept valid string",()=>{
        var result = isRealString(" e    r  ");
        expect(result).toBe(true);
    });
});