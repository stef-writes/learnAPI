const express = require("express");
const app = express();
const PORT = 3000;
const morgan = require("morgan");
const todoRouter = require("./routes");

app.use(express.urlencoded());
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url} ${res.statusCode}`);
//   next();
// });
app.use(morgan("tiny"));
app.use("/api/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("sanity check");
});

app.get("/*splat", (req, res) => {
  res.send(`${req.url} was un anexpected route, but the star caught it`);
});

app.listen(PORT, () => {
  console.log(`the app is listening on http://localhost:${PORT}`);
}); 