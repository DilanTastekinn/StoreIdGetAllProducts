const express = require("express");
const morgan = require("morgan");

const cors = require("cors");
const router = require("./router/router");

const cookieParser = require("cookie-parser");

const app = express();
const port = 4000;
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/store", router);

app.get("/", (req, res, next) => {
  res.json({
    message: "test",
  });
});

app.listen(port, "localhost", () => {
  console.log(`Example app listening on port ${port}`);
});
