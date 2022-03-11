const { prisma } = require("../../prismaDB");

const Schedule = {
  course(parent, args) {
    console.log("getting courses for schedules");
    return prisma.course.findFirst({
      where: {
        id: Number(parent.courseId),
      },
    });
  },
};

module.exports = {
  Schedule,
};
