# Mentor and Student Assigning with DB

## Application Overview

This application provides an API for managing mentors and students, including assigning students to mentors, change or assign mentor to student.  It interacts with a database to store and retrieve data.

# Endpoints

## Base Endpoint:
### <code style="color:limegreen">GET</code><code>/api/v1/</code>
    Returns a basic health check message indicating the application's status.

## Mentor Endpoints

### <code style="color:limegreen">GET</code><code>/api/v1/</code>
GET /api/v1/mentors/getAllMentors
### <code style="color:limegreen">GET</code><code>/api/v1/</code>
GET /api/v1/mentors/view/:id
### <code style="color:limegreen">GET</code><code>/api/v1/</code>
GET /api/v1/mentors/assignedStudents/:id

POST /api/v1/mentors/createMentor
PUT /api/v1/mentors/edit/:id
DELETE /api/v1/mentors/delete/:id
PATCH /api/v1/mentors/assignStudents/:id
Student Endpoints:

GET /api/v1/students/getAllStudents
GET /api/v1/students/view/:id
GET /api/v1/students/previousMentors/:id
POST /api/v1/students/createStudent
PUT /api/v1/students/edit/:id
DELETE /api/v1/students/delete/:id
PATCH /api/v1/students/patch/:id
GET /api/v1/students/getStudentsWithOutMentor
PATCH /api/v1/students/changeMentor/:id
Detailed Descriptions

(Provide detailed descriptions for each endpoint, including request methods, response formats, sample responses, authentication requirements, error handling, examples, and further information.)

Authentication

(Specify any required authentication methods for accessing the endpoints.)

Error Handling

(Describe the format of error responses and potential error codes.)

Examples

(Provide examples of how to use the endpoints, including request and response examples for each endpoint.)

Further Information

(Link to more detailed documentation or resources, if available.)