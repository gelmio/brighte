const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const mysql = require("mysql2");
const port = 3000;

const connection = mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to DB");

app.use(bodyParser.json());

app.post("/", (req, res) => {
  connection.query(
    `INSERT INTO referrals 
        (email, first_name, last_name, address_one, address_two, state, postcode, country, phone, suburb) 
        VALUES 
        ("${req.body.email}", "${req.body.first_name}", "${req.body.last_name}", "${req.body.address_one}", "${req.body.address_two}", "${req.body.state}", "${req.body.postcode}", "${req.body.country}", "${req.body.phone}", "${req.body.suburb}")`,
    function (err, rows) {
      if (err) throw err;

      res.send(rows);
    }
  );
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM referrals", function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
