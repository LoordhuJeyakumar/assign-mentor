const mongoose = require("mongoose");

//define a schema
const mentorSchema = new mongoose.Schema({
  mentor_Name: { type: String, required: [true, "Name is required"] },
  mentor_Phone: { type: String, required: [true, "Phone is required"] },
  mentor_Email: { type: String, required: [true, "Email is required"] },
  gender: { type: String, required: [true, "Gender is required"] },
  specializedIn: [
    { type: String, required: [true, "Specialized stack is required"] },
  ],
  assigned_Batches: [{ type: String, default: "" }],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Mentor = mongoose.model("Mentor", mentorSchema, "mentors");

module.exports = Mentor;
