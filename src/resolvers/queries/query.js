const { prisma } = require("../../prismaDB");
const moment = require("moment");
const Query = {
  // enrollment: (parent, args) => {
  //   return prisma.student.findMany({
  //     where: { enrolled: true },
  //   });
  // },
  students: (parent, args) => {
    try {
      return prisma.student.findMany({});
    } catch (error) {
      throw new Error("error - query - students");
    }
  },
  student: (parent, args) => {
    try {
      return prisma.student.findFirst({
        where: { id: Number(args.id) },
      });
    } catch (error) {
      throw new Error("error - query - student");
    }
  },
  courses: async () => {
    try {
      console.log("Query: courses");
      const results = await prisma.course.findMany({});
      return results;
    } catch (error) {
      throw new Error("error - query - courses");
    }
  },
  course: (parent, args) => {
    try {
      return prisma.course.findFirst({
        where: { id: Number(args.id) },
      });
    } catch (error) {
      throw new Error("error - query - course");
    }
  },
  schedules: async (parent, args) => {
    try {
      const { fromDate, tillDate } = args;
      const gte = fromDate
        ? moment(fromDate).startOf("day").subtract(1, "seconds").format()
        : undefined;
      const lte = tillDate
        ? moment(tillDate).endOf("day").add(1, "second").format()
        : undefined;
      const schedules = await prisma.schedule.findMany({
        where: {
          startDate: {
            gte,
            lte,
          },
        },
      });
      const result = schedules.map(schedule => ({
        ...schedule,
        startDate: schedule.startDate.toDateString(),
        endDate: schedule.endDate.toDateString(),
      }));
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("error - query - schedules");
    }
  },
  schedule: async (parent, args) => {
    try {
      const result = await prisma.schedule.findFirst({
        where: { id: Number(args.id) },
      });
      result.startDate = result.startDate.toDateString();
      result.endDate = result.endDate.toDateString();
      return result;
    } catch (error) {
      throw new Error("error - query - schedule");
    }
  },
};

module.exports = {
  Query,
};
