const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT;
const publicDirPath = path.join(__dirname, "./public");
app.use(express.static(publicDirPath));

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(express.json());
app.use(cookieParser());

app.use(
  compression({
    level: 9,
  })
);

// SQL Password: }M0!mW]4,1*P

app.use(cors()); // Enable CORS for all origins

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  express.urlencoded({
    extended: true,
  })
);

const Admin = require("./web-server/routes/Admin/Admin.routes");
const users = require("./web-server/routes/users.routes.js");

app.use(users),
  app.use("/admin", Admin, Genre, ArtistVerification, AdminSongsManagement);
app.get("/", (req, res) => {
  res.send({
    message: "Server is up and running....",
  });
});

const mysql = require("mysql");
app.get("/test-db", (req, res) => {
  const db = mysql.createConnection({
    host: "localhost",
    user: process.env.database_user,
    database: process.env.database_name,
    password: process.env.database_password,
    charset: "utf8mb4",
  });
  db.connect((error) => {
    if (error) {
      console.log(error);
    }
    console.log("SQL Connected");
    res.send("<h1>SQL Connected</h1>");
  });
});

app.get("*", (req, res) => {
  res.status(404).send(JSON.stringify("404"));
});

// testPinataConnection()

server.listen(port, () => {
  console.log("Server runs on " + port);
});
