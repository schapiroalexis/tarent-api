const {
  Course,
  Schedule,
  Enrollment,
  Student,
} = require("./queries/relations");
const { Query } = require("./queries/rootQuery");
const { Mutation } = require("./mutations/mutation");

const resolvers = { Student, Enrollment, Schedule, Course, Query, Mutation };

module.exports = {
  resolvers,
};
