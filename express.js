import pg from "pg";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.static("public"))


const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})

app.use(express.static("public"));

app.get("/api/students", (_, res) => {
  db.query('SELECT * FROM student').then((data) => {
    res.json(data.rows);
  });
});


app.listen(3000, () => {
  console.log(`listening on Port ${3000}`);
});