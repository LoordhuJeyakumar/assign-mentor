const mentorRouter = require("express").Router();
const MentorController = require("../controllers/mentorsController.js");

mentorRouter.get("/getAllMentors", MentorController.getAllMentors);
mentorRouter.get("/view/:id", MentorController.getMentorById);
mentorRouter.get("/assignedStudents/:id",MentorController.getAssignedStudents)
mentorRouter.post("/createMentor", MentorController.createMentor);
mentorRouter.put("/edit/:id", MentorController.editMentorById);
mentorRouter.delete("/delete/:id", MentorController.deleteMentorById);
mentorRouter.patch(
  "/assignStudents/:id",
  MentorController.assignStudentsToMentor
);

module.exports = mentorRouter;
