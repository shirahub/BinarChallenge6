const apiStatus = require("./src/lib/api_status");
const apiAdmins = require("./src/controllers/admins");
const apiUsers = require("./src/controllers/users");

var morgan = require("morgan");
var path = require("path");

const express = require("express");
const app = express();
const PORT = 8001;
const originalSend = app.response.send;

morgan.token("request-body", (req, res) => {
  if (req.body.password) {
    req.body.password = "SECRET";
  }
  return JSON.stringify(req.body);
});

morgan.token("response-body", (req, res) => res.resBody);

app.set("views", path.join(__dirname, "views"));
app.set("view-engine", "ejs");
app.get("/", (req, res) => {
  res.render("login.ejs", { url: "/api/admins/login" });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
});

app.response.send = function sendOverWrite(body) {
  originalSend.call(this, body);
  this.resBody = body;
};

app.use(
  "/api",
  morgan(
    "[:date[clf]] :method :url :status :res[content-length] - :response-time ms REQ: :request-body RES: :response-body"
  )
);

app.use(express.json());
app.use("/api/admins", apiAdmins);
app.use("/api/users", apiUsers);

app.use("/api/*", function (req, res) {
  apiStatus(res, { message: "API NOT FOUND" }, 404);
});

app.use("*", function (req, res) {
  res.status(404).send("<h1>PAGE NOT FOUND</h1>");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
