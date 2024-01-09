const StudentModel = require("../models/studentModel");
const MentorModel = require("../models/mentorModel");

const getAllStudents = async (request, response) => {
  try {
    let students = await StudentModel.find();
    response.status(200).send({
      message: "All Students List Fetched",
      students,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

const getStudentById = async (request, response) => {
  try {
    let { id } = request.params;
    let student = await StudentModel.findById(id);

    if (student) {
      response.status(200).send({
        message: "Student Data Fetched",
        student,
      });
    } else {
      response.status(400).send({
        message: "Invalid student id",
      });
    }
  } catch (error) {
    response.status(500).send({ Error: error.message });
  }
};

const getStudentsWithOutMentor = async (request, response) => {
  try {
    let students = await StudentModel.find(
      { isMentorAssigned: false },
      { student_Name: 1, assigned_Batch: 1 }
    );
    if (students) {
      response.status(200).send({
        message: "Students List Fetched",
        students,
      });
    } else {
      response.status(400).send({
        message: "Student Not Found",
      });
    }
  } catch (error) {
    response.status(500).send({ Error: error.message });
  }
};

const getPreviousMentors = async (request, response) => {
  try {
    const { id } = request.params;
    const student = await StudentModel.findById(id, {
      previous_Mentors: 1,
      student_Name: 1,
    });

    if (student) {
      if (student.previous_Mentors.length != 0) {
        response.status(200).send({
          message: "Previously Assigned Mentors List Fetched",
          student,
        });
      } else {
        response.status(400).send({
          message: "There is no previous mentor for this student",
        });
      }
    } else {
      response.status(400).send({
        message: "Student Not Found",
      });
    }
  } catch (error) {
    response.status(500).send({ Error: error.message });
  }
};

const createStudent = async (request, response) => {
  try {
    let student = await StudentModel.findOne({
      student_Email: request.body.student_Email,
    });
    if (!student) {
      await StudentModel.create(request.body);
      response.status(201).send({ message: "Student Created Successfully" });
    } else {
      response.status(400).send({
        message: `Student with '${request.body.student_Email}' already exists`,
      });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

const editStudentById = async (request, response) => {
  try {
    let { id } = request.params;
    let student = await StudentModel.findById(id);
    console.log(request.body);
    if (student) {
      student.student_Name = request.body.student_Name;
      student.student_Phone = request.body.student_Phone;
      student.student_Email = request.body.student_Email;
      student.gender = request.body.gender;
      student.assigned_Batch = request.body.assigned_Batch;
      await student.save();

      response.status(200).send({ message: "Student Details Updated" });
    } else {
      response.status(400).send({ message: "Invalid Student ID" });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

const deleteStudentById = async (request, response) => {
  try {
    let { id } = request.params;
    let student = await StudentModel.findById(id);
    if (student) {
      await StudentModel.deleteOne({ _id: id });
      response.status(200).send({ message: "Student Deleted Succesfully" });
    } else {
      response.status(400).send({ message: "Invalid Student Id" });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

const patchStudentById = async (request, response) => {
  try {
    const id = request.params.id;

    const studentToPatch = request.body;

    StudentModel.findByIdAndUpdate(id, studentToPatch).then(
      (updatedStudent) => {
        if (updatedStudent) {
          response
            .status(200)
            .json({ message: "Student patched successfully " });
        } else {
          response.status(404).json({ message: "id does not exist" });
        }
      }
    );
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

const changeMentor = async (request, response) => {
  try {
    const { id } = request.params;

    let student = await StudentModel.findById(id);
    let newMentor = request.body;
    
    if (student) {
      if (student.currentMentor) {
        if (student.currentMentor == newMentor.currentMentor) {
          response.status(404).send({ message: "Already same data exist" });
        } else {
          console.log(newMentor.currentMentor,id);
          
          MentorModel.findByIdAndUpdate(newMentor.currentMentor,{$addToSet:{students:id}}).then((updatedMentor)=>{
            console.log(updatedMentor);
          }).catch(error=>console.log(error))
          StudentModel.findByIdAndUpdate(id, {
            $addToSet: { previous_Mentors: student.currentMentor },
            currentMentor: newMentor.currentMentor,isMentorAssigned:true
          })
            .then((updatedStudent) => {
              if (updatedStudent) {
                response.status(200).json({
                  message: "Student Mentor Assigned successfully ",
                  updatedStudent,
                });
              } else {
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }else{
        MentorModel.findByIdAndUpdate(newMentor.currentMentor,{$addToSet:{students:id}}).then((updatedMentor)=>{
          console.log(updatedMentor);
        }).catch(error=>console.log(error))
        StudentModel.findByIdAndUpdate(id, {currentMentor:newMentor.currentMentor,isMentorAssigned:true})
          .then((updatedStudent) => {
            if (updatedStudent) {
              response.status(200).json({
                message: "Student Mentor Assigned successfully ",
                updatedStudent,
              });
            } else {
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      response.status(404).json({ message: "Student does not exist" });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  getPreviousMentors,
  createStudent,
  editStudentById,
  deleteStudentById,
  patchStudentById,
  getStudentsWithOutMentor,
  changeMentor,
};
