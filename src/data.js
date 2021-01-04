export const coursesData = [
  {
    id: "1",
    name: "Design and Analysis of Software Systems",
    type: "common",
    selected: true,
  },
  {
    id: "2",
    name: "Software Programming for Performance",
    type: "h2",
    selected: true,
  },
  {
    id: "3",
    name: "Machine, Data and Learning",
    type: "common",
    selected: true,
  },
  {
    id: "4",
    name: "Intro to Human Sciences",
    type: "common",
    selected: true,
  },
  {
    id: "5",
    name: "Intro to Game Theory",
    type: "common",
    selected: true,
  },
  {
    id: "6",
    name: "Value Education 2",
    type: "common",
    selected: true,
  },
];

const data = {
  Monday: {
    period1: [
      {
        id: "1",
      },
      {
        id: "3",
      },
    ],
    period2: [
      {
        id: "2",
      },
    ],
    period3: [
      {
        id: "3",
      },
    ],
    period4: [],
    period5: [],
    period6: [],
  },
  Tuesday: {
    period1: [
      {
        id: "4",
      },
    ],
    period2: [
      {
        id: "5",
      },
    ],
    period3: [],
    period4: [],
    period5: [
      {
        id: "6",
      },
    ],
    period6: [
      {
        id: "1",
        tut: true,
      },
    ],
  },
};

export default data;
