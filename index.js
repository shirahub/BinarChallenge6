const apiStatus = require("./src/lib/api_status");
const apiAdmins = require("./src/controllers/admins");
const apiUsers = require("./src/controllers/users");
const bodyParser = require("body-parser");

var morgan = require("morgan");
var path = require("path");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

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

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view-engine", "ejs");
app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.get("/dashboard", async (req, res) => {
  fetch("http://localhost:8001/api/users").then(async (resApi) => {
    try {
      const response = await resApi;
      const data = await response.json();
      if (data) {
        res.render("dashboard.ejs", { data: data });
      } else {
        res.render("dashboard.ejs", { data: [] });
      }
    } catch (err) {
      res.render("dashboard.ejs", { data: [] });
    }
  });
});

app.get("/users/create", async (req, res) => {
  res.render("create-user.ejs");
});

app.get("/users/edit/:id", async (req, res) => {
  let url = "http://localhost:8001/api/users/" + req.params.id;
  fetch(url, {
    method: "GET",
  }).then(async (resApi) => {
    try {
      const response = await resApi;
      const data = await response.json();
      if (data) {
        res.render("edit-user.ejs", { id: req.params.id, data });
      }
    } catch (err) {
      res.render("edit-user.ejs", { id: req.params.id, data });
    }
  });
});

app.get("/users/delete/:id", async (req, res) => {
  let url = "http://localhost:8001/api/users/" + req.params.id;
  fetch(url, {
    method: "DELETE",
  }).then(async (resApi) => {
    try {
      const response = await resApi;
      const data = await response.json();
      res.redirect(301, "/dashboard");
    } catch (err) {
      res.redirect(301, "/dashboard");
    }
  });
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
