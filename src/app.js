const express = require("express");
const app = express();
const config = require("./configs/config");
const auth = require("./routes/auth");
const task = require("./routes/task");
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", auth);
app.use("/", task);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
