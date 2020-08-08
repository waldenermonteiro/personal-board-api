const express = require("express");
const cors = require("cors");

const app = express();

// ==> Rotas da API:
const index = require("./routes/index");
const frameRoute = require("./routes/frame.routes");
const taskRoute = require("./routes/task.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());

app.use(index);
app.use("/api/", frameRoute);
app.use("/api/", taskRoute);
module.exports = app;
