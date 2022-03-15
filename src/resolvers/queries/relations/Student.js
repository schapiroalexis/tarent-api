const { prisma } = require("../../../prismaDB");

const Student = {
  enrollments: async (parent, args) => {
    try {
      const results = await prisma.enrollment.findMany({
        where: {
          studentId: parent.id,
        },
      });
      return results;
    } catch (error) {
      throw new Error("error - Student - enrollments");
    }
  },
};

module.exports = {
  Student,
};
