const { prisma } = require("../../../prismaDB");

const Schedule = {
  course: async (parent, args) => {
    try {
      return prisma.course.findFirst({
        where: {
          id: Number(parent.courseId),
        },
      });
    } catch (error) {
      throw new Error("error - Schedule - course");
    }
  },
};

module.exports = {
  Schedule,
};
