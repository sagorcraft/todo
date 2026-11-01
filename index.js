const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Task = require("./model/todoModel");

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://nodejs2603:ATOfvamnBfSbjxPC@cluster0.hwgsmpr.mongodb.net/todo",
  )
  .then(() => console.log("Database Connected!"));

app.post("/create/todo", (req, res) => {
  let { task, priority } = req.body;

  if (!task) {
    return res.status(400).send("Task required");
  }

  let todo = new Task({
    task: task,
    priority: priority,
  });

  todo.save();
  res.send(todo);
});

function securityGard(req, res, next) {
  if (req.headers.authorization == "sdfasdfsdfasdfasd") {
    next();
  } else {
    res.status(401).send("you are lot authorized");
  }
}

app.get("/all/todo", securityGard, async (req, res) => {
  let data = await Task.find({});

  res.send(data);
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await Task.findByIdAndDelete(id);

  res.send("delete");
});

app.post("/update/:id", async (req, res) => {
  let { id } = req.params;

  const update = await Task.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  res.send(update);
});

app.listen(5000, () => {
  console.log("server running");
});
