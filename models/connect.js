const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/bookstore2db").then(()=>{
    console.log("db connected");
}).catch((err)=>{console.log(err);})