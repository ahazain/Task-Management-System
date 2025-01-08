const express = require("express");
const app = express();
const config = require("./configs/config");
const auth = require("./routes/auth");
const port = config.port;

app.use(express.json());

app.use("/", auth);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
