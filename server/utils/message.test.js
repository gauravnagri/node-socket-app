const expect = require("expect");
const {generateMessage,generateLocationMessage} = require("./message");

describe("generate message test",()=>{
    it("should return a proper message object",()=>{
        var from = "test";
        var text = "Some message";
        var result = generateMessage(from,text);
        expect(typeof(result.createdAt)).toBe("number");
        expect(result).toMatchObject({from, text });
    });
});

describe("generate location message test",()=>{
    it("should return a proper location object",()=>{
        var from = "test";
        var latitude = 1;
        var longitude = 2;
        var result = generateLocationMessage(from,latitude,longitude);
        expect(typeof(result.createdAt)).toBe("number");
        expect(result).toMatchObject({
            from,
            url:"https://google.com/maps?q=1,2"
        });
    });
});