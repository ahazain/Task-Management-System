const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../configs/config");
const secret = config.secret_key;
const prisma = new PrismaClient();

class Auth {
  static async register(req, res) {
    const { email, password } = req.body;
    try {
      const user = await prisma.users.create({
        data: {
          email,
          password: await bcrypt.hash(password, 10),
        },
      });
      res
        .status(201)
        .json({
          StatusCode: 201,
          Status: "Succes",
          Message: "Berhasil Membuat akun",
          data: user,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await prisma.users.findUnique({
        where: {
          email,
        },
      });
      const match = await bcrypt.compare(password, user.password); //membandingan password yang diinputkan dengan password yang ada di database
      if (!user && !match) {
        res.status(400).json({
          statusCode: 400,
          Status: "Failed",
          message: "Invalid email or password",
        });
      }

      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = jwt.sign(payload, secret, { expiresIn: "1h" }); //signing token
      res.status(201).json({
        statusCode: 201,
        status: "Succes",
        message: "Login Success",
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = Auth;
