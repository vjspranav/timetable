import React, { useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import timetableData, { coursesData } from "./data";

const Checkbox = (props) => (
  <div>
    <label>
      <input type="checkbox" />
      {props.title}
    </label>
  </div>
);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
  const classes = useStyles();

  const [timetable, setTimetable] = useState(timetableData);
  const [sem, setSem] = useState(0);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Days / Time</TableCell>
              <TableCell align="center">9 - 10:30</TableCell>
              <TableCell align="center">10:30 - 12:00</TableCell>
              <TableCell align="center">12:00 - 13:30</TableCell>
              <TableCell align="center">14:00 - 15:30</TableCell>
              <TableCell align="center">15:30 - 1700</TableCell>
              <TableCell align="center">17:00 - 18:30</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {rows.map((row) => (
              <TableRow key={row.day}>
                <TableCell component="th" scope="row">
                  {row.day}
                </TableCell>
                <TableCell align="center">{row.s1[sem]}</TableCell>
                <TableCell align="center">{row.s2[sem]}</TableCell>
                <TableCell align="center">{row.s3[sem]}</TableCell>
                <TableCell align="center">{row.s4[sem]}</TableCell>
                <TableCell align="center">{row.s5[sem]}</TableCell>
                <TableCell align="center">{row.s6[sem]}</TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </TableContainer>
      <div>
        Select sem:
        <select
          value={sem}
          onChange={(event) => {
            setSem(event.target.value);
            ict_bool = false;
          }}
        >
          <option value={0}>H1</option>
          <option value={1}>H2</option>
        </select>
        <div>
          {coursesData.map((item) => {
            return (
              <Checkbox
                title={item.course}
                timetable={timetable}
                setTimetable={setTimetable}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
