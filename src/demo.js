import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
var h1 = true;
var h2 = false;
function createData(day, s1, s2, s3, s4, s5, s6) {
  return { day, s1, s2, s3, s4, s5, s6 };
}

if (h2 == true) {
  monthu.s1 = monthu.s1_h2;
  monthu.s2 = monthu.s2_h2;
  monthu.s3 = monthu.s3_h2;
  monthu.s4 = monthu.s4_h2;
  monthu.s5 = monthu.s5_h2;
  monthu.s6 = monthu.s6_h2;

  tuefri.s1 = tuefri.s1_h2;
  tuefri.s2 = tuefri.s2_h2;
  tuefri.s3 = tuefri.s3_h2;
  tuefri.s4 = tuefri.s4_h2;
  tuefri.s5 = tuefri.s5_h2;
  tuefri.s6 = tuefri.s6_h2;

  wedsat.s1 = wedsat.s1_h2;
  wedsat.s2 = wedsat.s2_h1;
  wedsat.s3 = wedsat.s3_h2;
  wedsat.s4 = wedsat.s4_h2;
  wedsat.s5 = wedsat.s5_h2;
  wedsat.s6 = wedsat.s6_h2;
}

const rows = [
  createData(
    "Monday",
    monthu.s1,
    monthu.s2,
    monthu.s3,
    monthu.s4,
    monthu.s5,
    monthu.s6
  ),
  createData(
    "Tuesday",
    tuefri.s1,
    tuefri.s2,
    tuefri.s3,
    tuefri.s4,
    tuefri.s5,
    tuefri.s6
  ),
  createData(
    "Wednesday",
    wedsat.s1,
    wedsat.s2,
    wedsat.s3,
    wedsat.s4,
    wedsat.s5,
    wedsat.s6
  ),
  createData(
    "Thursday",
    monthu.s1,
    monthu.s2,
    monthu.s3,
    monthu.s4,
    monthu.s5,
    monthu.s6
  ),
  createData(
    "Friday",
    tuefri.s1,
    tuefri.s2,
    tuefri.s3,
    tuefri.s4,
    tuefri.s5,
    tuefri.s6
  ),
  createData(
    "Saturday",
    wedsat.s1,
    wedsat.s2,
    wedsat.s3,
    wedsat.s4,
    wedsat.s5,
    wedsat.s6
  ),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
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
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.day}>
              <TableCell component="th" scope="row">
                {row.day}
              </TableCell>
              <TableCell align="center">{row.s1}</TableCell>
              <TableCell align="center">{row.s2}</TableCell>
              <TableCell align="center">{row.s3}</TableCell>
              <TableCell align="center">{row.s4}</TableCell>
              <TableCell align="center">{row.s5}</TableCell>
              <TableCell align="center">{row.s6}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
