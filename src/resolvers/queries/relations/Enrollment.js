const { prisma } = require("../../../prismaDB");

const Enrollment = {
  student: async (parent, args) => {
    try {
      return prisma.student.findFirst({
        where: {
          id: Number(parent.studentId),
        },
      });
    } catch (error) {
      throw new Error("error - Enrollment - student");
    }
  },
  schedule: async (parent, args) => {
    try {
      const result = await prisma.schedule.findFirst({
        where: {
          id: Number(parent.scheduleId),
        },
      });

      return {
        ...result,
        startDate: result.startDate.toDateString(),
        endDate: result.endDate.toDateString(),
      };
    } catch (error) {
      throw new Error("error - Enrollment - student");
    }
  },
  course: async (parent, args) => {
    try {
      const result = await prisma.course.findFirst({
        where: {
          id: Number(parent.courseId),
        },
      });
      return result;
    } catch (error) {
      throw new Error("error - Enrollment - course");
    }
  },
};

module.exports = {
  Enrollment,
};
