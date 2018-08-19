const express = require("express");
const Path = require("path");
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(Path.join(__dirname,"../public")));

app.listen(port,()=>{
    console.log(`The app is running on port ${port}`);
})