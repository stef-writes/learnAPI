const express = require("express");
const todoRouter = express.Router();
const todoModel = require("./model");

todoRouter.get("/sanity", (req, res) => {
  res.send("this is the todo router");
});

todoRouter.get("/", (req, res) => {
  res.json(todoModel.readAllTodos());
});
todoRouter.get("/:id", (req, res) => {
  res.json(todoModel.readTodo(req.params.id));
});
todoRouter.post("/", (req, res) => {
  todoModel.createTodo({
    ...req.body,
    id: 9000,
    isDone: false,
    isArchived: false,
  });
  res.status(201).send("todo created");
});
todoRouter.patch("/:id", (req, res) => {
  const { id } = req.params;
  todoModel.updateToDone(id);
  res.sendStatus(204);
});
todoRouter.put("/", (req, res) => {
  todoModel.replaceTodo(req.body);
  res.sendStatus(204);
});
todoRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  todoModel.deleteTodo(id);
  res.send(`todo ${id} deleted`);
});

module.exports = todoRouter; 