const express = require("express");
const app = express();
const blogRoute = require("./routes/blog");
require("dotenv").config();
const morgan = require("morgan");


app.use(express.json());
app.use(morgan("dev"));

app.use("/api/blogs", blogRoute);

let port = process.env.PORT || 8000;


app.listen(port, () => {
  console.log(`server running on port ${port}`);
});