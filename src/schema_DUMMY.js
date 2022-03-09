const { gql } = require("apollo-server");

const typeDefs = gql`
  enum UserTypesEnum {
    TEACHER
    STUDENT
  }

  enum AreaEnum {
    MATH
    IT
    SALES
  }

  type Course {
    id: ID!
    title: String!
    teacher: Teacher!
    description: String!
  }

  type Schedule {
    id: ID!
    course: Course!
    date: String!
    availablePlaces: Int!
  }

  type Student {
    id: ID!
    fullName: String!
    userType: UserTypesEnum!
    email: String!
    enrollments: [Enrollment]!
  }

  type Teacher {
    id: ID!
    fullName: String!
    email: String!
    courses: [Course]!
  }

  type Enrollment {
    id: ID!
    course: Course!
    student: Student!
  }

  type Query {
    courses(starteDate: String, endDate: String): [Course]!
    schedules(courseId: ID!): [Course!]!
    students: [Student!]!
    student(id: ID!): Student
    enrollment: [Student!]
  }

  type Mutation {
    registerTeacher(fullName: String!, email: String!): Teacher!
    registerCourse(title: String!, teacher: ID!, description: String!): Course!
    registerEnrollment(studentId: ID!, courseId: ID!): Enrollment!
    registerStudent(email: String!, fullName: String!, dept: String): Student!
    enroll(id: ID!): Student
  }
`;
module.exports = {
  typeDefs,
};
