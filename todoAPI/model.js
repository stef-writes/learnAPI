const todos = [
  {
    objective: "make a rest API",
    assignee: "nick",
    id: 123,
    summary: "illustrate middleware concepts and restful architecture",
    isDone: false,
    isArchived: false,
  },
];

const createTodo = (todo) => {
  todos.push(todo);
};
const readAllTodos = () => {
  return todos;
};
const readTodo = (id) => {
  return todos.find((td) => td.id == id);
};
const updateToDone = (id) => {
  const todo = todos.find((td) => td.id == id);
  todo.isDone = true;
};
const replaceTodo = (todo) => {
  const todoIndex = todos.findIndex((td) => td.id == todo.id);
  if (todoIndex < 0) throw new Error("out of bounds");
  todos.splice(todoIndex, 1, todo);
};
const deleteTodo = (id) => {
  const todoIndex = todos.findIndex((td) => td.id == id);
  if (todoIndex < 0) throw new Error("out of bounds");
  todos.splice(todoIndex, 1);
};

module.exports = {
  createTodo,
  readAllTodos,
  readTodo,
  updateToDone,
  replaceTodo,
  deleteTodo,
}; 