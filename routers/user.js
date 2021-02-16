const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//adding new user
router.route("/signup").post((req, res, next) => {
  User
    .find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "email alrady exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              password: hash,
            });

            newUser
              .save()
              .then((data) => {
                console.log(data);
                return res.status(200).json({
                  message: "user successfully added",
                });
              })
              .catch((err) => {
                console.log(err);
                return res.status(400).json({
                  message: err,
                });
              });
          }
        });
      }
    });
});

//loging a user
router.route("/login").post((req, res, next) => {
  User
    .findOne({ phone: req.body.phone })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign({ email: user.email, id: user._id }, "secret", {
            expiresIn: "1h",
          });
          return res.status(401).json({
            message: "Auth made successfully",
            token: token,
          });
        }
        return res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        message: "Auth failed",
      });
    });
});

module.exports = router;
