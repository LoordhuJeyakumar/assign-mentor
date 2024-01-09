const appRouter = require("express").Router();
const mentorRouter = require("./mentors.js");
const studentRouter = require("./student.js");

appRouter.get("/", (req, res) =>
  res.status(200).send(`<h1>Mentor and Student Assigning with Database
  </h1><b style="color:white; background-color:green; padding:5">Application Health is Good</b>`)
);
appRouter.use("/mentors", mentorRouter);
appRouter.use("/students", studentRouter);
module.exports = appRouter;
