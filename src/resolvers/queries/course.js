const { prisma } = require("../../prismaDB");

const Course = {
  teacher(parent, args) {
    return prisma.teacher.findFirst({
      where: {
        id: Number(parent.teacherId),
      },
    });
  },
  schedules: async (parent, args) => {
    console.log("getting schedules for courses");
    const results = await prisma.schedule.findMany({
      where: {
        courseId: Number(parent.id),
      },
    });
    return results;
  },
};

module.exports = {
  Course,
};
