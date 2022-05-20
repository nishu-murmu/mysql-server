import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "test",
  database: "inventory",
});
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/users", (req, res) => {
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const insertName =
    "insert into users (firstname, lastname, email, password) values (?,?,?,?)";
  db.query(
    insertName,
    [firstname, lastname, email, password],
    (err, result) => {
      console.log(result);
    }
  );
});

app.post("/api/sales/store", (req, res) => {
  const location = req.body.url;
  const insertcsv =
    "LOAD DATA INFILE '?' INTO  FIELDS TERMINATED BY ',' ENCLOSED BY ''' LINES TERMINATED BY '/n' IGNORE 1 ROWS;";
  db.query(insertcsv, [location], (err, result) => {
    console.log(result);
  });
});

app.listen("3001", () => {
  console.log("Port running in 3001");
});
