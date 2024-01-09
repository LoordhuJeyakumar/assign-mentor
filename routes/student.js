const studentRouter = require("express").Router();
const StudentController = require("../controllers/studentController");

studentRouter.get("/getAllStudents", StudentController.getAllStudents);
studentRouter.get("/view/:id", StudentController.getStudentById);
studentRouter.get("/previousMentors/:id", StudentController.getPreviousMentors);
studentRouter.post("/createStudent", StudentController.createStudent);
studentRouter.put("/edit/:id", StudentController.editStudentById);
studentRouter.delete("/delete/:id", StudentController.deleteStudentById);
studentRouter.patch("/patch/:id", StudentController.patchStudentById);
studentRouter.get("/getStudentsWithOutMentor",StudentController.getStudentsWithOutMentor);
studentRouter.patch("/changeMentor/:id", StudentController.changeMentor);

module.exports = studentRouter;
