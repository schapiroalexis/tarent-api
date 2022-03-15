const { prisma } = require("../../prismaDB");

const Mutation = {
  registerTeacher: (parent, { email, fullName }) => {
    return prisma.teacher.create({
      data: {
        email,
        fullName,
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
  registerCourse: (parent, { description, title, teacherId, price }) => {
    return prisma.course.create({
      data: {
        description,
        title,
        teacherId,
        price,
      },
    });
  },
  registerSchedule: (
    parent,
    { courseId, startDate, endDate, frecuency, availability, daysAndHours }
  ) => {
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
  enrollStudent: async (parent, args) => {
    try {
      const scheduleId = Number(args.scheduleId);
      const studentId = Number(args.studentId);
      // CHECK SCHEDULE
      const schedule = await prisma.schedule.findFirst({
        where: { id: scheduleId },
      });
      if (!schedule) throw new Error("wrong schedule id");
      if (schedule.availability === 0) throw new Error("no available places");
      // CHECK STUDENT
      const student = await prisma.student.findFirst({
        where: { id: studentId },
      });
      if (!student) throw new Error("wrong student id");

      const updatedSchedule = await prisma.schedule.update({
        where: { id: scheduleId },
        data: {
          availability: { decrement: 1 },
        },
      });
      const newEnrollment = await prisma.enrollment.create({
        data: {
          scheduleId,
          studentId,
        },
      });

      const updatedStudent = await prisma.student.update({
        where: { id: studentId },
        data: {
          enrolled: true,
        },
      });
      return updatedStudent;
    } catch (error) {
      console.log(error);
      throw new Error(error);
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
