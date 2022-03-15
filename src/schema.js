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
    schedules: [Schedule]
    enrollments: [Enrollment]
    price: Int
  }

  type ScheduledDays {
    mo: String!
    tu: String!
    we: String!
    th: String!
    fr: String!
    sa: String!
    su: String!
  }

  type Schedule {
    id: ID!
    course: Course!
    startDate: String!
    endDate: String!
    frecuency: String!
    availability: Int!
    mo: String!
    tu: String!
    we: String!
    th: String!
    fr: String!
    sa: String!
    su: String!
    enrollments: [Enrollment]
  }

  type Student {
    id: ID!
    fullName: String!
    email: String!
    enrollments: [Enrollment]
    enrolled: Boolean
  }

  type Teacher {
    id: ID!
    fullName: String!
    email: String!
    courses: [Course]!
  }

  input DayHour {
    mo: String
    tu: String
    we: String
    th: String
    fr: String
    sa: String
    su: String
  }

  type Enrollment {
    id: ID!
    schedule: Schedule!
    student: Student!
    course: Course!
  }

  type Query {
    students: [Student!]!
    student(id: ID!): Student
    courses: [Course]!
    course(id: ID!): Course
    schedules(fromDate: String, tillDate: String): [Schedule]!
    schedule(id: ID!): Schedule
    enrollments: [Enrollment]!
    enrollment(id: ID!): Enrollment
  }

  type Mutation {
    enrollStudent(studentId: ID!, scheduleId: ID!): Student!
    registerTeacher(email: String!, fullName: String!): Teacher!
    registerCourse(
      teacherId: Int!
      title: String!
      description: String!
      price: Int!
    ): Course!
    patchCourse(
      id: Int!
      teacherId: Int
      title: String
      description: String
      price: Int
    ): String!
    registerStudent(email: String!, fullName: String!): Student!
    registerSchedule(
      courseId: Int!
      startDate: String!
      endDate: String!
      frecuency: String!
      availability: Int!
      daysAndHours: DayHour!
    ): Schedule!
  }
`;
module.exports = {
  typeDefs,
};
