const { prisma } = require("../../prismaDB");

const Course = {
  teacher: async (parent, args) => {
    try {
      return prisma.teacher.findFirst({
        where: {
          id: Number(parent.teacherId),
        },
      });
    } catch (error) {
      throw new Error("error - Course - teacher");
    }
  },
  schedules: async (parent, args) => {
    try {
      const schedules = await prisma.schedule.findMany({
        where: {
          courseId: Number(parent.id),
        },
      });
      const results = schedules.map(schedule => ({
        ...schedule,
        startDate: schedule.startDate.toDateString(),
        endDate: schedule.endDate.toDateString(),
      }));
      return results;
    } catch (error) {
      throw new Error("error Course - schedules");
    }
  },
};

module.exports = {
  Course,
};
