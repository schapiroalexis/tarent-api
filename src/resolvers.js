const { prisma } = require("./prismaDB.js");

const Student = {
  id: (parent, args, context, info) => parent.id,
  email: parent => parent.email,
  fullName: parent => parent.fullName,
  //enrolled: parent => parent.enrolled,
};

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
    const results = await prisma.course.findMany({});
    return results;
  },
  course: (parent, args) => {
    return prisma.course.findFirst({
      where: { id: Number(args.id) },
    });
  },
  schedules: () => prisma.schedule.findMany({}),
  schedule: async (parent, args) => {
    const result = await prisma.schedule.findFirst({
      where: { id: Number(args.id) },
    });
    return result;
  },
};

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

const resolvers = { Schedule, Student, Course, Query, Mutation };

module.exports = {
  resolvers,
};
