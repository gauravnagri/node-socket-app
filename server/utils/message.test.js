const expect = require("expect");
const {generateMessage} = require("./message");

describe("generate message test",()=>{
    it("should return a proper message object",()=>{
        var from = "test";
        var text = "Some message"
        var result = generateMessage(from,text);
        expect(typeof(result.createdAt)).toBe("number");
        expect(result).toMatchObject({from, text });
    });
});