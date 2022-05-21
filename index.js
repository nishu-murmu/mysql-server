import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Users
app.post("/api/users/register", (req, res) => {
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
app.get("/api/users/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "select email,password from users",
    [email, password],
    (err, result, fields) => {
      res.send(result);
    }
  );
});

// master skus

// Purchase
app.post("/api/purchase/create", (req, res) => {
  const date = req.body.Date;
  const quantity = req.body.quantity;
  const mastersku = req.body.mastersku;

  const insertPurchase =
    "insert into purchase (quantity, date,mastersku) values (?,?,?)";
  db.query(insertPurchase, [quantity, date, mastersku], (err, result) => {
    if (err) console.log(err);
    else console.log(result);
  });
});
app.get("/api/purchase/getAll", (req, res) => {
  db.query("select * from purchase", (err, result) => {
    res.json(result);
  });
});
app.put("/api/purchase/update", (req, res) => {
  const mastersku = req.body.mastersku;
  const quantity = req.body.quantity;
  const date = req.body.date;
  const updateSelected =
    "update purchase set mastersku=?, date=?, quantity=? where mastersku=?";
  db.query(
    updateSelected,
    [mastersku, date, quantity, mastersku],
    (err, result, fields) => {
      if (err) console.log(err);
      else console.log(result);
    }
  );
});
app.delete("/api/purchase/delete", (req, res) => {
  const mastersku = req.body.mastersku;
  const deleteOne = "delete from purchase where mastersku=?";
  db.query(deleteOne, [mastersku], (err, result, fields) => {
    if (err) console.log(err);
    else console.log(result);
  });
});
app.get("/api/purchase/sort", (req, res) => {
  const value = req.body.value;
  db.query("select * from purchase order by ? asc", [value], (err, result) => {
    res.json(result);
  });
});

// Purchase Return
app.post("/api/purchaseReturn/create", (req, res) => {
  const mastersku = req.body.mastersku;
  const date = req.body.Date;
  const quantity = req.body.quantity;
  const enterPurchase =
    "insert into purchaseReturn (mastersku,quantity, date) values (?,?,?);";
  db.query(
    enterPurchase,
    [mastersku, quantity, date],
    (err, result, fields) => {
      if (err) console.log(err);
      else console.log(result);
    }
  );
});
app.get("/api/purchaseReturn/getAll", (req, res) => {
  db.query("select * from purchasereturn", (err, result) => {
    res.json(result);
  });
});
app.put("/api/purchaseReturn/update", (req, res) => {
  const mastersku = req.body.mastersku;
  const quantity = req.body.quantity;
  const date = req.body.date;
  const updateSelected =
    "update purchasereturn set mastersku=?, date=?, quantity=? where mastersku=?";
  db.query(
    updateSelected,
    [mastersku, date, quantity, mastersku],
    (err, result, fields) => {
      if (err) console.log(err);
      else console.log(result);
    }
  );
});
app.delete("/api/purchaseReturn/delete", (req, res) => {
  const mastersku = req.body.mastersku;
  const deleteOne = "delete from purchasereturn where mastersku=?";
  db.query(deleteOne, [mastersku], (err, result, fields) => {
    if (err) console.log(err);
    else console.log(result);
  });
});
app.get("/api/purchaseReturn/sort", (req, res) => {
  const value = req.body.value;
  db.query(
    "select * from purchasereturn order by ? asc",
    [value],
    (err, result) => {
      res.json(result);
    }
  );
});

// Sales

app.listen(port, () => {
  console.log(`Port running in ${port}`);
});
