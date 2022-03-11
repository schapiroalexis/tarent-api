const { prisma } = require("../../prismaDB");

const Mutation = {
  registerTeacher: (parent, args) => {
    return prisma.teacher.create({
      data: {
        email: args.email,
        fullName: args.fullName,
      },
    });
  },
  registerStudent: (parent, args) => {
    return prisma.student.create({
      data: {
        email: args.email,
        fullName: args.fullName,
      },
    });
  },
  registerCourse: (parent, args) => {
    debugger;
    const { description, title, teacherId } = args;
    return prisma.course.create({
      data: {
        description,
        title,
        teacherId,
      },
    });
  },
  registerSchedule: (parent, args) => {
    const {
      courseId,
      startDate,
      endDate,
      frecuency,
      availability,
      daysAndHours,
    } = args;
    const { mo, tu, we, th, fr, sa, su } = daysAndHours;
    return prisma.schedule.create({
      data: {
        availability,
        endDate,
        startDate,
        frecuency,
        fr: fr ?? "",
        mo: mo ?? "",
        sa: sa ?? "",
        su: su ?? "",
        th: th ?? "",
        tu: tu ?? "",
        we: we ?? "",
        courseId,
      },
    });
  },
  patchCourse: async (parent, args) => {
    try {
      const { id, teacherId, title, description, price } = args;
      const courseExists = await prisma.course.findUnique({
        where: {
          id,
        },
      });
      //if (!courseExists) return "course id not found";
      const patchResult = await prisma.course.update({
        where: { id },
        data: {
          teacherId,
          title,
          description,
          price,
        },
      });
      if (patchResult) return "sucess";
      return "error: course not found";
    } catch (error) {
      console.log(error);
      return "error: course could not be updated";
    }
  },
  // enroll: (parent, args) => {
  //   return prisma.student.update({
  //     where: { id: Number(args.id) },
  //     data: {
  //       enrolled: true,
  //     },
  //   });
  // },
};

module.exports = {
  Mutation,
};
