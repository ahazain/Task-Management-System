const express = require("express");
const router = express.Router();
const taskControllers = require("../controllers/taskControllers");
const upload = require("../utils/multer");
const { auth } = require("../middlewares/authMid");

router.post("/addtask", upload.single("file"), auth, taskControllers.addTask);
router.get("/task", taskControllers.getTask);
router.get("/task/:id", auth, taskControllers.getTaskBycreatedId);
router.put(
  "/task/:id",
  upload.single("file"),
  auth,
  taskControllers.updateTask
);
router.delete("/task/:id", auth, taskControllers.deleteTask);

module.exports = router;
