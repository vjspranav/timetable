import React, { useState, useReducer } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@material-ui/core";

import timetableData from "./timetableData";
import { coursesData } from "./coursesData";

function clearAllPreferences() {
  localStorage.removeItem("checkboxValues");
  window.location.reload(true);
}

var checkboxValues = JSON.parse(localStorage.getItem("checkboxValues"));
console.log(checkboxValues);
const Checkbox = (props) => {
  if (checkboxValues) {
    props.setCourses(checkboxValues);
    console.log("Reached here");
  }
  const course = props.courses.find((item) => item.id == props.id);
  if (course) {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={course.selected}
            onChange={(event) => {
              const updatedCourses = [...props.courses];
              updatedCourses.forEach((obj) => {
                if (obj.id == props.id) {
                  obj.selected = event.target.checked;
                }
              });
              props.setCourses(updatedCourses);
              localStorage.setItem(
                "checkboxValues",
                JSON.stringify(updatedCourses)
              );
            }}
          />
          {course.name}
        </label>
      </div>
    );
  } else {
    return null;
  }
};

const useStyles = makeStyles({
  // table: {
  //   minWidth: 40,
  // },
  chip: {
    margin: "5px 0",
  },
});

export default function BasicTable() {
  const classes = useStyles();

  const [timetable, setTimetable] = useState(timetableData);
  const [courses, setCourses] = useState(coursesData);
  const [sem, setSem] = useState("h1");

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Days / Time</TableCell>
              <TableCell align="center">09:00 - 10:30</TableCell>
              <TableCell align="center">10:30 - 12:00</TableCell>
              <TableCell align="center">12:00 - 13:30</TableCell>
              <TableCell align="center">14:00 - 15:30</TableCell>
              <TableCell align="center">15:30 - 17:00</TableCell>
              <TableCell align="center">17:00 - 18:30</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(timetable).map((day) => (
              <TableRow key={day}>
                <TableCell component="th" scope="row">
                  {day}
                </TableCell>
                {Object.keys(timetable[day]).map((period) => {
                  return (
                    <TableCell align="center">
                      {timetable[day][period].map((item) => {
                        let curCourse = courses.find(
                          (course) => course.id == item.id && course.selected
                        );
                        let tmp = null;
                        if (curCourse) {
                          if (curCourse.type != "common") {
                            if (sem != "all") {
                              if (curCourse.type == sem) {
                                tmp = `${
                                  curCourse.name
                                } (${sem.toUpperCase()})`;
                              }
                            } else {
                              tmp = `${
                                curCourse.name
                              } (${curCourse.type.toUpperCase()})`;
                            }
                          } else {
                            tmp = curCourse.name;
                          }
                          if (item.tut && tmp) {
                            tmp = `${tmp} - Tutorial`;
                          }
                        }
                        return tmp ? (
                          <div>
                            <Chip
                              label={tmp}
                              className={classes.chip}
                              color={item.tut ? "secondary" : "primary"}
                            />
                          </div>
                        ) : null;
                      })}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        Select sem:
        <select
          value={sem}
          onChange={(event) => {
            setSem(event.target.value);
          }}
        >
          <option value={"all"}>All</option>
          <option value={"h1"}>H1</option>
          <option value={"h2"}>H2</option>
        </select>{" "}
        <button
          onClick={() => {
            clearAllPreferences();
          }}
        >
          Clear Preferences
        </button>
        <div id="checkbox-container">
          {courses.map((item) => {
            return (
              <Checkbox
                key={item.id}
                id={item.id}
                courses={courses}
                setCourses={setCourses}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
