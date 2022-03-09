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
  schedules(parent, args) {
    console.log("getting schedules");
    return prisma.schedule.findMany({
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
  courses: () => {
    return prisma.course.findMany({});
  },
  schedules: () => {
    return prisma.schedule.findMany({});
  },
  schedule: (parent, args) => {
    return prisma.schedule.findFirst({
      where: { id: Number(args.id) },
    });
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
  // enroll: (parent, args) => {
  //   return prisma.student.update({
  //     where: { id: Number(args.id) },
  //     data: {
  //       enrolled: true,
  //     },
  //   });
  // },
};

const resolvers = { Student, Course, Query, Mutation };

module.exports = {
  resolvers,
};
