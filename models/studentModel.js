const mongoose = require("mongoose");

//define a schema
const studentSchema = new mongoose.Schema({
  student_Name: { type: String, required: [true, "Name is required"] },
  student_Phone: { type: String, required: [true, "Phone is required"] },
  student_Email: { type: String, required: [true, "Email is required"] },
  gender: { type: String, required: [true, "Gender is required"] },
  assigned_Batch: { type: String, required: [true, "Batch name is required"] },
  isMentorAssigned: { type: Boolean, default: false },
  currentMentor: { type: mongoose.Schema.Types.ObjectId, ref:"Mentor", default:null },
  previous_Mentors: [{ type: mongoose.Schema.Types.ObjectId, ref:"Mentor" }],
});

const Student = mongoose.model("Student", studentSchema, "students");

module.exports = Student;
