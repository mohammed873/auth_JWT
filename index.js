const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

//using cors
app.use(cors());

// connect our database:
mongoose.connect("mongodb://localhost/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  createIndexes: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DataBase !!!"));

app.get("/", (req, res) => {
  res.send("Hello I am You coder");
});
//user router
const userRouter = require("./routers/user");
app.use("/user", userRouter);
//book router
const bookRouter = require("./routers/book");
app.use("/book", bookRouter);

app.listen(8888, () => console.log("the server is started on port 8888"));
