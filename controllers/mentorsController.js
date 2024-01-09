const MentorModel = require("../models/mentorModel");
const StudentModel = require("../models/studentModel");

const getAllMentors = async (req, res) => {
  try {
    let mentors = await MentorModel.find();
    res.status(200).send({
      message: "Mentors list Fetched",
      mentors,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getMentorById = async (req, res) => {
  try {
    let { id } = req.params;
    let mentor = await MentorModel.findById(id);

    if (mentor) {
      res.status(200).send({
        message: "Mentor Data Fetched",
        mentor,
      });
    } else {
      res.status(400).send({ message: "Invalid Mentor Id" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAssignedStudents = async (request, response) => {
  try {
    const { id } = request.params;

    const mentor = await MentorModel.findById(id, {
      students: 1,
      mentor_Name: 1,
    });

    if (mentor) {
      response.status(200).send({ message: "Students List Fetched", mentor });
    } else {
      response.status(400).send({ message: "Invalid Mentor Id" });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

const createMentor = async (req, res) => {
  try {
    let mentor = await MentorModel.findOne({
      mentor_Email: req.body.mentor_Email,
    });
    if (!mentor) {
      await MentorModel.create(req.body);
      res.status(201).send({ message: "Mentor Created Successfully" });
    } else {
      res.status(400).send({
        message: `Mentor with '${req.body.mentor_Email}' already exists`,
      });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const editMentorById = async (req, res) => {
  try {
    let { id } = req.params;
    let mentor = await MentorModel.findById(id);
    if (mentor) {
      mentor.mentor_Name = req.body.mentor_Name;
      mentor.mentor_Phone = req.body.mentor_Phone;
      mentor.mentor_Email = req.body.mentor_Email;
      mentor.gender = req.body.gender;
      mentor.specializedIn = req.body.specializedIn;
      mentor.assigned_Batches = req.body.assigned_Batches;
      mentor.students = req.body.students;

      await mentor.save();

      res.status(200).send({ message: "Mentor Details Updated" });
    } else {
      res.status(400).send({ message: "Invalid Mentor Id" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteMentorById = async (req, res) => {
  try {
    let { id } = req.params;
    let mentor = await MentorModel.findById(id);
    if (mentor) {
      await MentorModel.deleteOne({ _id: id });

      res.status(200).send({ message: "Mentor Deleted Succesfully" });
    } else {
      res.status(400).send({ message: "Invalid Mentor Id" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const assignStudentsToMentor = async (request, response) => {
  try {
    let { id } = request.params;
    let mentor = await MentorModel.findById(id);
    let requestObj = request.body;
    let assigned_Batches = [];
    if (mentor) {
      for (let i = 0; i < requestObj.students.length; i++) {
        let student = await StudentModel.findById(requestObj.students[i]);
        async function updateStudent() {
          await StudentModel.findByIdAndUpdate(student._id, {
            isMentorAssigned: true,
            currentMentor: id,
          });

          let studentBatch = await StudentModel.findById(
            { _id: requestObj.students[i] },
            { assigned_Batch: 1, _id: 0 }
          );

          if (!assigned_Batches.includes(studentBatch.assigned_Batch)) {
            assigned_Batches.push(studentBatch.assigned_Batch);
          }
        }
        if (!student.isMentorAssigned) {
          await updateStudent();

          let updatedMentor = await MentorModel.updateOne(
            { _id: id },
            {
              students: request.body.students,
              assigned_Batches: assigned_Batches,
            }
          );
        } else {
          return response.status(400).send({
            message: `Mentor Alreay Assigned for this Student`,
            student,
          });
        }
      }
      return response.status(200).send({
        message: "Mentor Details Updated : Students are assigned",
      });
    } else {
      return response.status(400).send({ message: "Invalid Mentor Id" });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllMentors,
  getMentorById,
  getAssignedStudents,
  createMentor,
  editMentorById,
  deleteMentorById,
  assignStudentsToMentor,
};
