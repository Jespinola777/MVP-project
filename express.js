import pg from "pg";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.static("public"));

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.static("public"));

app.get("/api/todolist", (req, res) => {
  db.query("SELECT * FROM todo ORDER BY id").then((data) => {
    res.send(data.rows);
  });
});

app.use(express.json());

app.post("/api/todolist", (req, res) => {
  const { task_name, prio } = req.body;

  db.query("INSERT INTO todo (task_name, prio) VALUES ($1, $2) RETURNING *", [
    task_name,
    prio,
  ])
    .then((result) => {
      res.status(201).send(result.rows[0]);
    })
    .catch((error) => {
      res.status(500).send("Error inserting task into the database.");
    });
});

//PATCH REQ

app.patch("/api/todolist/:id", (req, res) => {
  const id = Number(req.params.id);
  const { task_name, prio } = req.body;

  db.query(
    "UPDATE todo SET task_name = COALESCE($1, task_name), prio = COALESCE($2, prio) WHERE id = $3 RETURNING *",
    [task_name, prio, id]
  ).then((result) => {
    if (result.rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.send(result.rows[0]);
    }
  });
});

app.delete("/api/todolist/:id", (req, res) => {
  const id = Number(req.params.id);
  db.query("DELETE FROM todo WHERE id = $1 RETURNING *", [id]).then(
    (result) => {
      res.send(result);
    }
  );
});

app.listen(3000, () => {
  console.log(`listening on Port ${3000}`);
});
