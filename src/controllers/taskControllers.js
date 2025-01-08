const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imageKit = require("../utils/imageKit");
const {
  sendSuccesCreateTask,
  sendSuccesTaskAssign,
} = require("../utils/nodemailer");
const { io } = require("../utils/socket");

class TaskControllers {
  static async addTask(req, res) {
    const { title, deskripsi, assigneeId } = req.body;
    const created = req.user.email;
    console.log(req.file);
    if (!title || !deskripsi || !created) {
      return res.status(400).json({
        statusCode: 400,
        Status: "Failed",
        message: "Title, deskripsi, and created are required",
      });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ statusCode: 400, Status: Failed, message: "File is required" });
    }
    const linkfile = req.file.buffer.toString("base64");
    const uploadFile = await imageKit.upload({
      file: linkfile,
      fileName: req.file.originalname,
    });
    console.log("image upplod : ", uploadFile);

    try {
      const task = await prisma.task.create({
        data: {
          title,
          deskripsi,
          urlFile: uploadFile.url,
          created: {
            connect: { email: created }, // Hubungkan berdasarkan ID pembuat tugas
          },
          assignee: assigneeId
            ? { connect: { email: assigneeId } } // Hubungkan berdasarkan ID assignee (opsional)
            : undefined,
        },
      });

      io.emit("task", {
        message: "Pengumuman ini menggunakan socket.io",
        task,
      });
      console.log("Notifikasi task dikirim melalui socket:", task);
      sendSuccesCreateTask(created, task);
      sendSuccesTaskAssign(assigneeId, task);

      res.status(201).json({
        statusCode: 201,
        Status: "Succes",
        message: "Task Created",
        data: task,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getTask(req, res) {
    try {
      const task = await prisma.task.findMany({
        include: {
          created: true,
          assignee: true,
        },
      });

      res.status(200).json({
        statusCode: 200,
        Status: "Succes",
        message: "Task Created",
        data: task,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getTaskBycreatedId(req, res) {
    const { id } = req.params;
    try {
      const task = await prisma.task.findMany({
        where: {
          createdById: parseInt(id),
        },
        include: {
          created: true,
          assignee: true,
        },
      });

      res.status(200).json({
        statusCode: 200,
        Status: "Succes",
        message: "Task Created",
        data: task,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateTask(req, res) {
    const { id } = req.params;
    const { title, deskripsi, assigneeId } = req.body;
    const created = req.user.email;
    try {
      const task = await prisma.task.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          deskripsi,
          created: {
            connect: { email: created }, // Hubungkan berdasarkan ID pembuat tugas
          },
          assignee: assigneeId
            ? { connect: { email: assigneeId } } // Hubungkan berdasarkan ID assignee (opsional)
            : undefined,
        },
      });

      res.status(200).json({
        statusCode: 200,
        Status: "Succes",
        message: "Task Updated",
        data: task,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteTask(req, res) {
    const { id } = req.params;
    try {
      const task = await prisma.task.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(200).json({
        statusCode: 200,
        Status: "Succes",
        message: "Task Deleted",
        data: task,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = TaskControllers;
