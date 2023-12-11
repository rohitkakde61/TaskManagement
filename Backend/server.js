const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM task";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.post("/create", (req, res) => {
    const sql = "INSERT INTO task (name, description) VALUES (?, ?)";
    const values = [
        req.body.name,
        req.body.description
    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.put("/update/:id", (req, res) => {
    const sql = "UPDATE task SET `name`=?, `description`=? WHERE id=?";
    const values = [req.body.name, req.body.description];
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});


app.delete('/task/:id', (req, res) => {
    const sql = "DELETE FROM task Where id=?"

    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.listen(8081, () => {
    console.log("listening");
});