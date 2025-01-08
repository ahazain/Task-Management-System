const express = require("express");
const app = express();
const config = require("./configs/config");
const auth = require("./routes/auth");
const task = require("./routes/task");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../docs/swagger");
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", auth);
app.use("/", task);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const status = err.status || "Error";
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    statusCode,
    status,
    message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
