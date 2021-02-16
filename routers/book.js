const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const check_auth = require("../middelware/autch_check");

//adding new Book
router.route("/").post(check_auth, (req, res, next) => {
  const newBook = new Book({
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
  });
  newBook
    .save()
    .then((data) => {
      console.log(data);
      return res.status(200).json({
        message: "Book successfully added",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        message: err,
      });
    });
});

//showing Books
router.route("/").get(check_auth, (req, res, next) => {
  Book.find()
    .then((data) => {
      console.log(data);
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        message: err,
      });
    });
});

module.exports = router;
