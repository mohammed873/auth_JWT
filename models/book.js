const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  price: {
    type: String,
  },
});

const book = mongoose.model("book", bookSchema);
module.exports = book;
