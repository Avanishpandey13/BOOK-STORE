const mongoose = require("mongoose")

const bookmodel = new mongoose.Schema({
    image: String,
    name: String,
    author: String,
    category: String,
    text: String,
})

const Books = mongoose.model("book", bookmodel)

module.exports = Books 