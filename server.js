/* Importing the express module. */
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const reviewRouter = require("./routes/review");
const bookRouter = require("./routes/book");
const userRouter = require("./routes/user");
const uploadRoute = require("./routes/upload");

const mongooseEndpoint = "mongodb://127.0.0.1/book_reviews";

const mongodbUser = process.env.MONGODB_USERNAME;
const mongodbPassword = process.env.MONGODB_PASSWORD;

const mongodDBAtlasUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@bookreview.2hzup.mongodb.net/book_review?retryWrites=true&w=majority`;

mongoose.connect(mongodDBAtlasUrl, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));

const cors = require("cors");

app.use(express.static(path.join(__dirname, "build")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
  })
);

// app.use(auth_middleware);
app.use("/api/upload", uploadRoute);
app.use("/api/review", reviewRouter);
app.use("/api/book", bookRouter);
app.use("/api/user", userRouter);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Starting server");
});
