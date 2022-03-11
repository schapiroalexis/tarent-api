const { prisma } = require("../prismaDB");
const { Course } = require("./queries/course");
const { Schedule } = require("./queries/schedule");
const { Query } = require("./queries/query");
const { Mutation } = require("./mutations/mutation");

const resolvers = { Schedule, Course, Query, Mutation };

module.exports = {
  resolvers,
};
