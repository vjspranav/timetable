import React, { useState, useEffect } from "react";
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
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import Modal from "@mui/material/Modal";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@mui/material/Menu";

import timetableData from "./timetableData";
import { coursesData } from "./coursesData";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useMediaQuery } from "react-responsive";

// Map 1-7 to Monday to Sunday
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function clearAllPreferences() {
  localStorage.removeItem("checkboxValues");
  localStorage.removeItem("semValue");
  window.location.reload(true);
}

var checkboxValues = JSON.parse(localStorage.getItem("checkboxValues"));
var semValue = localStorage.getItem("semValue");

// Create a Responsive App Bar Component using Material UI
// Position at the top of screen
// With hamburger icon at left
const Topbar = ({ sem, setSem, handleOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IIIT-Hyderabad Timetable Monsoon 2021
          </Typography>
          {
            <div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={() => {
                  setAnchorEl(null);
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    setSem("all");
                    localStorage.setItem("semValue", "all");
                  }}
                  value={"all"}
                >
                  All
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    setSem("h1");
                    localStorage.setItem("semValue", "h1");
                  }}
                  value={"h1"}
                >
                  H1
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    setSem("h2");
                    localStorage.setItem("semValue", "h2");
                  }}
                  value={"h2"}
                >
                  H2
                </MenuItem>
              </Menu>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                style={{ padding: "12px" }}
              >
                Selected:
                <Chip
                  style={{ marginLeft: "12px", padding: "1px" }}
                  onClick={handleMenu}
                  label={sem.toUpperCase()}
                />
              </Typography>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const CustomCheckbox = (props) => {
  useEffect(() => {
    if (checkboxValues) {
      props.setCourses(checkboxValues);
    }
  }, []);

  const course = props.courses.find((item) => item.id == props.id);
  if (course) {
    return (
      <Box>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
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
            }
            label={course.name}
          />
        </FormGroup>
      </Box>
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

  // For Course Selection
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const CustomModal = () => {
    const [searchCourses, setSearchCourses] = useState("");
    const style = {
      color: {
        secondary: "#f50057",
      },
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      height: "50%",
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
    return (
      <Modal
        key={"modal"}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={style}>
          <TextField
            style={{ marginBottom: "5px" }}
            fullWidth
            margin="dense"
            id="outlined-search"
            variant="outlined"
            label="Search Courses"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon variant="filled" />
                </InputAdornment>
              ),
            }}
            type="search"
            value={searchCourses}
            onChange={(e) => setSearchCourses(e.target.value)
            }
          />
          <Box
            id="checkbox-container"
            pl={2}
            fullWidth
            style={{
              overflowY: "auto",
              height: "75%",
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
                  <CustomCheckbox
                    key={item.id}
                    id={item.id}
                    courses={courses}
                    setCourses={setCourses}
                    setSem={setSem}
                  />
                );
            })}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              clearAllPreferences();
            }}
          >
            Clear Preferences
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close{" "}
          </Button>
        </Box>
      </Modal>
    );
  };
  const HorizontalTimeTable = () => {
    return (
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
                    <TableCell align="center" key={period}>
                      {timetable[day][period].map((item) => {
                        let curCourse = courses.find(
                          (course) => course.id == item.id && course.selected
                        );
                        let tmp = null;
                        if (curCourse) {
                          if (curCourse.type != "common") {
                            if (sem != "all") {
                              if (curCourse.type == sem) {
                                tmp = `${curCourse.name
                                  } (${sem.toUpperCase()})`;
                              }
                            } else {
                              tmp = `${curCourse.name
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
                          <div key={tmp}>
                            <Chip
                              id={tmp}
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
    );
  };
  const TableCellWithdata = ({ index, period }) => {
    return (
      <TableCell>
        {timetable[days[index]][period].map((item) => {
          let curCourse = courses.find(
            (course) => course.id == item.id && course.selected
          );
          let tmp = null;
          if (curCourse) {
            if (curCourse.type != "common") {
              if (sem != "all") {
                if (curCourse.type == sem) {
                  tmp = `${curCourse.name} (${sem.toUpperCase()})`;
                }
              } else {
                tmp = `${curCourse.name} (${curCourse.type.toUpperCase()})`;
              }
            } else {
              tmp = curCourse.name;
            }
            if (item.tut && tmp) {
              tmp = `${tmp} - Tutorial`;
            }
          }
          return tmp ? (
            <div key={tmp}>
              <Chip
                id={tmp}
                label={tmp}
                className={classes.chip}
                color={item.tut ? "secondary" : "primary"}
              />
            </div>
          ) : null;
        })}
      </TableCell>
    );
  };
  const VerticalTimeTable = () => {
    function TabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          style={{ width: "100%" }}
          {...other}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="center" variant="head">
                  Time
                </TableCell>
                <TableCell variant="head">Course</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">09:00 - 10:30</TableCell>
                <TableCellWithdata index={index} period="period1" />
              </TableRow>
              <TableRow>
                <TableCell align="center">10:30 - 12:00</TableCell>
                <TableCellWithdata index={index} period="period2" />
              </TableRow>
              <TableRow>
                <TableCell align="center">12:00 - 13:30</TableCell>
                <TableCellWithdata index={index} period="period3" />
              </TableRow>
              <TableRow>
                <TableCell align="center">14:00 - 15:30</TableCell>
                <TableCellWithdata index={index} period="period4" />
              </TableRow>
              <TableRow>
                <TableCell align="center">15:30 - 17:00</TableCell>
                <TableCellWithdata index={index} period="period5" />
              </TableRow>
              <TableRow>
                <TableCell align="center">17:00 - 18:30</TableCell>
                <TableCellWithdata index={index} period="period6" />
              </TableRow>
              <TableRow>
                <TableCell align="center">18:30 - 19:00</TableCell>
                <TableCellWithdata index={index} period="period7" />
              </TableRow>
            </TableBody>
          </Table>
        </div>
      );
    }
    TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    };
    function a11yProps(index) {
      return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
      };
    }
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "80%",
        }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          variant="scrollable"
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Monday" {...a11yProps(0)} />
          <Tab label="Tuesday" {...a11yProps(1)} />
          <Tab label="Wednesday" {...a11yProps(2)} />
          <Tab label="Thursday" {...a11yProps(3)} />
          <Tab label="Friday" {...a11yProps(4)} />
          <Tab label="Saturday" {...a11yProps(5)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
      </Box>
    );
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <div>
      <Topbar sem={sem} setSem={setSem} handleOpen={handleOpen} />
      <div>
        <CustomModal />
        <>
          <div>
            {/* <select
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
        </select>{" "} */}
            {/* <VerticalTimeTable /> */}
            {isDesktopOrLaptop && <HorizontalTimeTable />}
            {isTabletOrMobile && <VerticalTimeTable />}
            <div
              style={{
                marginTop: "15px",
                marginBottom: "5px",
              }}
            >
              <strong>Selected Courses</strong>
            </div>
            <div>
              {courses
                .filter((item) => item.selected)
                .map((course) => {
                  return (
                    <Chip
                      key={course.name}
                      label={course.name}
                      className={classes.chip}
                      style={{ margin: "5px" }}
                      color="default"
                    />
                  );
                })}
            </div>
            <hr />
          </div>
        </>
      </div>
    </div>
  );
}
