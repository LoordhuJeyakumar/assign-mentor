# Mentor and Student Assigning with DB

## Application Overview

This application provides an API for managing mentors and students, including assigning students to mentors, change or assign mentor to student.  It interacts with a database to store and retrieve data.

## Endpoints

### Base Endpoint:
```javascript
GET /api/v1/
```
Returns homepage.


## Base URL

All API endpoints are accessible at the following base URL:

http://localhost:3333/api/v1
## Endpoints

### Students
```js
GET /students/getAllStudents
```
Retrieves a list of all students.
- **Description:** Retrieves a list of all students in the system.
- **Response:** 200 OK with an array of student details.

___
</br>

```js
GET /students/getStudentsWithOutMentor
```
Retrieves a list of students who do not currently have a mentor assigned.
- **Description:** Retrieves a list of students who do not currently have a mentor assigned.
- **Response:** 200 OK with an array of student details without mentors.

___
</br>

```js
GET /students/view/:studentId
```
Retrieves details for a specific student.
- **Description:** Retrieves the details of a specific student by their ID.
- **Response:** 200 OK with the student's details, or 404 Not Found if the student does not exist.

___
</br>

```js
GET /students/previousMentors/:studentId
```
Retrieves a list of previous mentors for a specific student.
- **Description:** Retrieves a list of previous mentors for a specific student.
- **Response:** 200 OK with an array of previous mentor details, or 404 Not Found if the student does not exist.

___
</br>

```js
POST /students/createStudent
```
Creates a new student.
- **Description:** Creates a new student in the system.
- **Request Body:** Student details (student_Name, student_Phone, student_Email, gender, assigned_Batch, etc.)
- **Response:** 201 Created with the new student details on success, or appropriate error response.
___
</br>

```js
PUT /students/edit/:studentId
```
Edits an existing student.
- **Description:** Retrieves a form for editing student information.
- **Response:** 200 OK with the student's details in a form for editing.
___
</br>

```js
PATCH /students/patch/:studentId

```
Partially updates specific fields of an existing student.
- **Description:** Updates specific fields of a student's information.
- **Request Body:** Partial student details to update.
- **Response:** 200 OK with the updated student details on success, or appropriate error response.
___
</br>

```js
PUT /students/changeMentor/:studentId

```
Assigns a new mentor to an existing student.
- **Description:** Assigns or changes a mentor for a student.
- **Request Body:** Mentor details (ID or information).
- **Response:** 200 OK with the updated student details on success, or appropriate error response.
___
</br>

```js
DELETE /students/delete/:studentId
```
Deletes an existing student.
- **Description:** Deletes a student from the system.
- **Response:** 200 No Content on successful deletion, or appropriate error response.

___
</br>

### Mentors

___
</br>

```js
GET /mentors/getAllMentors
```
Retrieves a list of all mentors.
- **Description:** Retrieves a list of all mentors in the system.
- **Response:** 200 OK with an array of mentor details.
___
</br>

```js
GET /mentors/view/:mentorId
```
Retrieves details for a specific mentor.
- **Description:** Retrieves the details of a specific mentor by their ID.
- **Response:** 200 OK with the mentor's details, or 404 Not Found if the mentor does not exist.
___
</br>

```js
GET /mentors/assignedStudents/:mentorId
```
Retrieves a list of students assigned to a specific mentor.
- **Description:** Retrieves a list of students currently assigned to a specific mentor.
- **Response:** 200 OK with an array of assigned student details, or 404 Not Found if the mentor does not exist.
___
</br>

```js
POST /mentors/createMentor
```
Creates a new mentor.
- **Description:** Creates a new mentor in the system.
- **Request Body:** Mentor details (mentor_Name,mentor_Phone,mentor_Email,gender,specializedIn etc.)
- **Response:** 201 Created with the new mentor details on success, or appropriate error response.
___
</br>

```js
PUT /mentors/edit/:mentorId
```
Edits an existing mentor.
- **Description:** Retrieves a form for editing mentor information.
- **Response:** 200 OK with the mentor's details in a form for editing.
___
</br>

```js
PATCH /mentors/assignStudents/:mentorId
```
Assigns multiple students to a specific mentor.
- **Description:** Assigns one or more students to a mentor.
- **Request Body:** Student id details (IDs or information).
- **Response:** 200 OK with the updated mentor details (including assigned students) on success, or appropriate error response.
___
</br>

```js
DELETE /mentors/delete/:mentorId
```
Deletes an existing mentor.
- **Description:** Deletes a mentor from the system.
- **Response:** 200 Content successful deletion, or appropriate error response.

