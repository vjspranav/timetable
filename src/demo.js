import React, { useState, useReducer } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  InputAdornment,
} from "@material-ui/core";

import timetableData from "./timetableData";
import { coursesData } from "./coursesData";

function clearAllPreferences() {
  localStorage.removeItem("checkboxValues");
  localStorage.removeItem("semValue");
  window.location.reload(true);
}

var checkboxValues = JSON.parse(localStorage.getItem("checkboxValues"));
var semValue = JSON.parse(localStorage.getItem("semValue"));

const Checkbox = (props) => {
  if (checkboxValues) {
    props.setCourses(checkboxValues);
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
  chip: {
    margin: "5px 0",
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function BasicTable() {
  const classes = useStyles();

  const [timetable, setTimetable] = useState(timetableData);
  const [courses, setCourses] = useState(coursesData);
  const [sem, setSem] = useState(semValue ? semValue : "h1");
  const [searchCourses, setSearchCourses] = useState("");
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
              <TableCell align="center">18:30 - 19:00</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(timetable).map((day) => (
              <StyledTableRow key={day}>
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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        Select Term:
        <select
          value={sem}
          onChange={(event) => {
            setSem(event.target.value);
            localStorage.setItem(
              "semValue",
              JSON.stringify(event.target.value)
            );
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
        <hr />
        <div
          style={{
            marginTop: "15px",
            marginBottom: "5px",
          }}
        >
          <strong>Selected Courses</strong>
        </div>
        <div style={{}}>
          {courses
            .filter((item) => item.selected)
            .map((course) => {
              return (
                <Chip
                  label={course.name}
                  className={classes.chip}
                  style={{ margin: "5px" }}
                  color="inherit"
                />
              );
            })}
        </div>
        <hr />
        <TextField
          style={{ display: "block", marginBottom: "5px" }}
          id="outlined-search"
          label="Search Courses"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          type="search"
          onChange={(e) => {
            setSearchCourses(e.target.value);
          }}
        />
        <div
          id="checkbox-container"
          style={{
            float: "left",
            width: "100%",
            overflowY: "auto",
            height: "200px",
            border: "1px solid black",
            marginBottom: "2px",
          }}
        >
          {courses.map((item) => {
            if (
              item.name.toLowerCase().indexOf(searchCourses.toLowerCase()) !==
              -1
            )
              return (
                <Checkbox
                  key={item.id}
                  id={item.id}
                  courses={courses}
                  setCourses={setCourses}
                  setSem={setSem}
                />
              );
          })}
        </div>
      </div>
    </>
  );
}
