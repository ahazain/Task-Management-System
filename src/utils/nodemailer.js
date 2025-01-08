const mailer = require("nodemailer");
const config = require("../configs/config");

const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email,
    pass: config.password,
  },
});

sendSuccesCreateTask = (email, task) => {
  const mailOptions = {
    from: config.email,
    to: email,
    subject: "Task Created",
    text: `Task created with title: ${task.title} and description: ${task.deskripsi}\n\n File: ${task.urlFile}`,
  };
  return transporter.sendMail(mailOptions);
};

sendSuccesTaskAssign = (email, task) => {
  const mailOptions = {
    from: config.email,
    to: email,
    subject: "Task Assigned",
    text: `Task assigned with title: ${task.title} and description: ${task.deskripsi}\n\n File: ${task.urlFile}`,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendSuccesCreateTask, sendSuccesTaskAssign };
