const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
require("./mongodb connection/databaseconnection");

const router = require("./routers/routers");

app.use(router);

app.listen(1234, () => {
  console.log("Express server is running on port 1234");
});
