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

const today = Date();

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
];

const seedDB = async () => {
  await prisma.schedule.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.teacher.deleteMany({});
  const seededTeachersCount = await prisma.teacher.createMany({
    data: teachers,
    skipDuplicates: true,
  });
  console.log("seeded teachers = ", seededTeachersCount);
  const teachersInDB = await prisma.teacher.findMany({});
  const coursesWithTeachers = teachersInDB.map((teacher, index) => ({
    ...courses[index],
    teacherId: teacher.id,
  }));
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
};

module.exports = {
  seedDB,
};
