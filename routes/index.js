const appRouter = require("express").Router();
const mentorRouter = require("./mentors.js");
const studentRouter = require("./student.js");

appRouter.get("/", (req, res) =>
  res.status(200).send(`<h1>Mentor and Student Assigning with Database
  </h1><b style="color:white; background-color:green; padding:5">Application Health is Good</b>`)
);
appRouter.use("/api/v1/mentors", mentorRouter);
appRouter.use("/api/v1/students", studentRouter);
module.exports = appRouter;
