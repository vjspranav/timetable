export const coursesData = [
  {
    id: "1",
    course: "Design and Analysis of Software Systems",
    type: "common",
    selected: true,
  },
  {
    id: "2",
    course: "Software Programming for Performance",
    type: "h2",
    selected: true,
  },
  {
    id: "3",
    course: "Machine, Data and Learning",
    type: "common",
    selected: true,
  },
  {
    id: "4",
    course: "Intro to Human Sciences",
    type: "common",
    selected: true,
  },
  {
    id: "5",
    course: "Intro to Game Theory",
    type: "common",
    selected: true,
  },
  {
    id: "6",
    course: "Value Education 2",
    type: "common",
    selected: true,
  },
];

const data = {
  monday: {
    period1: [
      {
        course: "Design and Analysis of Software Systems",
      },
    ],
    period2: [
      {
        course: "Software Programming for Performance",
        type: "h2",
        selected: true,
      },
    ],
    period3: [
      {
        course: "Machine, Data and Learning",
        type: "common",
        selected: true,
      },
    ],
    period4: [],
    period5: [],
    period6: [],
  },
  tuesday: {
    period1: [
      {
        course: "Intro to Human Sciences",
        type: "common",
        selected: true,
      },
    ],
    period2: [
      {
        course: "Intro to Game theory",
        type: "common",
        selected: true,
      },
    ],
    period3: [],
    period4: [],
    period5: [
      {
        course: "Value Education 2",
        type: "common",
        selected: true,
      },
    ],
    period6: [],
  },
};

export default data;
