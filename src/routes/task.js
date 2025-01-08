const express = require("express");
const router = express.Router();
const taskControllers = require("../controllers/taskControllers");
const upload = require("../utils/multer");

router.post("/addtask", upload.single("file"), taskControllers.addTask);
router.get("/task", taskControllers.getTask);
router.get("/task/:id", taskControllers.getTaskBycreatedId);

module.exports = router;
