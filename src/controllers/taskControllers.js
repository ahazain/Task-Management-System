const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imageKit = require("../utils/imageKit");

class TaskControllers {
  static async addTask(req, res) {
    const { title, deskripsi, createdById, assigneeId } = req.body;
    if (!title || !deskripsi || !createdById) {
      return res.status(400).json({
        statusCode: 400,
        Status: "Failed",
        message: "Title, deskripsi, and createdById are required",
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
            connect: { email: createdById }, // Hubungkan berdasarkan ID pembuat tugas
          },
          assignee: assigneeId
            ? { connect: { email: assigneeId } } // Hubungkan berdasarkan ID assignee (opsional)
            : undefined,
        },
      });

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
}

module.exports = TaskControllers;
