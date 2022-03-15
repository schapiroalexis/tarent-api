const moment = require("moment"); // require
const { prisma } = require("./prismaDB.js");

const teachers = [
  {
    fullName: "teacher_1",
    email: "teacher_1@g.com",
  },
  {
    fullName: "teacher_2",
    email: "teacher_2@g.com",
  },
  {
    fullName: "teacher_3",
    email: "teacher_3@g.com",
  },
];

const students = [
  {
    fullName: "student_1",
    email: "student_1@g.com",
  },
  {
    fullName: "student_2",
    email: "student_2@g.com",
  },
  {
    fullName: "student_3",
    email: "student_3@g.com",
  },
];

const courses = [
  {
    title: "course nr. 1: the being of scarlet",
    description: "course nr. 1: being scarlet on the modern world",
    price: 100,
  },
  {
    title: "course nr. 2: who will help bob",
    description: "course nr. 2: finding the teddy",
    price: 500,
  },
  {
    title: "course nr. 3: Kevin and the modern hero",
    description: "course nr. 3: the goal of being a super minion",
    price: 5000,
  },
];

const schedules = [
  {
    startDate: moment().utc().format(),
    endDate: moment().utc().add(10, "days").format(),
    mo: "10:00",
    tu: "10:00",
    we: "10:00",
    th: "10:00",
    fr: "10:00",
    sa: "10:00",
    su: "10:00",
    frecuency: "w",
    availability: 20,
  },
  {
    startDate: moment().utc().format(),
    endDate: moment().utc().add(30, "days").format(),
    mo: "10:00",
    tu: "12:00",
    we: "",
    th: "",
    fr: "20:00",
    sa: "",
    su: "",
    frecuency: "w",
    availability: 10,
  },
  {
    startDate: moment().utc().add(40, "days").format(),
    endDate: moment().utc().add(55, "days").format(),
    mo: "19:00",
    tu: "20:00",
    we: "",
    th: "",
    fr: "",
    sa: "",
    su: "",
    frecuency: "w",
    availability: 50,
  },
];

const seedDB = async () => {
  try {
    const deletedEnrollments = await prisma.enrollment.deleteMany({});
    const deletedSchedules = await prisma.schedule.deleteMany({});
    const deletedCourses = await prisma.course.deleteMany({});
    const deletedTeacher = await prisma.teacher.deleteMany({});
    const deletedStudents = await prisma.student.deleteMany({});
    console.log({
      deletedSchedules,
      deletedCourses,
      deletedTeacher,
      deletedStudents,
      deletedEnrollments,
    });
    const seededStudentCount = await prisma.student.createMany({
      data: students,
      skipDuplicates: true,
    });
    console.log("seeded students = ", seededStudentCount);
    const seededTeachersCount = await prisma.teacher.createMany({
      data: teachers,
      skipDuplicates: true,
    });
    console.log("seeded teachers = ", seededTeachersCount);
    const teachersInDB = await prisma.teacher.findMany({});
    console.log({ teachersInDB });
    const coursesWithTeachers = teachersInDB.map((teacher, index) => ({
      ...courses[index],
      teacherId: teacher.id,
    }));
    console.log({ coursesWithTeachers });
    const seededCoursesCount = await prisma.course.createMany({
      data: coursesWithTeachers,
      skipDuplicates: true,
    });
    console.log("seeded courses = ", seededCoursesCount);
    const coursesWithId = await prisma.course.findMany({});
    console.log({ coursesWithId });
    const newSchedule_1 = await prisma.schedule.create({
      data: { ...schedules[0], courseId: coursesWithId[0].id },
    });
    console.log("newSchedule_1 = ", newSchedule_1);
    const newSchedule_2 = await prisma.schedule.create({
      data: { ...schedules[1], courseId: coursesWithId[1].id },
    });
    console.log("newSchedule_2 = ", newSchedule_2);
    console.log(" ***  SEED END **** ");
  } catch (error) {
    console.log("seeding DB - ERROR");
    console.log(error);
  }
};

module.exports = {
  seedDB,
};
