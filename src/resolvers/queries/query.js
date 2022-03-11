const { prisma } = require("../../prismaDB");

const Query = {
  // enrollment: (parent, args) => {
  //   return prisma.student.findMany({
  //     where: { enrolled: true },
  //   });
  // },
  students: (parent, args) => {
    return prisma.student.findMany({});
  },
  student: (parent, args) => {
    return prisma.student.findFirst({
      where: { id: Number(args.id) },
    });
  },
  courses: async () => {
    console.log("Query: courses!!");
    const results = await prisma.course.findMany({});
    console.log("results = ", results);
    return results;
  },
  course: (parent, args) => {
    return prisma.course.findFirst({
      where: { id: Number(args.id) },
    });
  },
  schedules: async () => {
    const schedules = await prisma.schedule.findMany({});
    const result = schedules.map(schedule => ({
      ...schedule,
      startDate: schedule.startDate.toDateString(),
      endDate: schedule.endDate.toDateString(),
    }));
    return result;
  },
  schedule: async (parent, args) => {
    const result = await prisma.schedule.findFirst({
      where: { id: Number(args.id) },
    });
    result.startDate = result.startDate.toDateString();
    result.endDate = result.endDate.toDateString();
    return result;
  },
};

module.exports = {
  Query,
};
