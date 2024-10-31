import React, { useEffect, useRef, useState } from "react";
import AddEmployeesTable from "../components/Tables/AddEmployeesTable";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CalendarToday } from "@mui/icons-material";

const Employee = () => {
  // custom styling components
  const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#F3F3F3 ",

      "&:hover": {
        backgroundColor: "#F3F3F3",
      },
      "&.Mui-focused": {
        backgroundColor: "#EBF9FF", // Focused background color
        borderColor: "#5BC4FA", // Focused border color
      },
    },
  });

  const [open, setOpen] = useState(false);
  const [joiningDate, setJoiningDate] = useState(null);
  const [birthDate, setBirthDate] = useState(null);

  // Handle changes to the Date of Joining picker
  const handleJoiningDateChange = (newDate) => {
    setJoiningDate(newDate);
  };

  // Handle changes to the Date of Birth picker
  const handleBirthDateChange = (newDate) => {
    setBirthDate(newDate);
  };

  const [employeeData, setEmployeeData] = useState({
    Name: "",
    Email: "",
    Mobile: "",
    DateofBirth: "",
    Address: "",
    Designation: "",
    EmployeeID: "",
    Bloodgroup: "",
    Department: "",
    DateofJoining: "",
    Employmentstatus: "",
  });
  const [errors, setErrors] = useState({
    EmployeeID: "",
    Name: "",
    Address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Employee ID validation (exactly 8 digits using regex)
    if (name === "EmployeeID") {
      const idRegex = /^\d{0,8}$/; // Allows only up to 8 digits
      if (!idRegex.test(value)) {
        setErrors({
          ...errors,
          EmployeeID: "Employee ID must be exactly 8 digits.",
        });
      } else {
        setErrors({ ...errors, EmployeeID: "" });
      }
      setEmployeeData({ ...employeeData, EmployeeID: value });
      return; // Stop further processing
    }

    // Name validation (only letters and spaces using regex)
    if (name === "Name") {
      const nameRegex = /^[A-Za-z\s]*$/; // Allows only letters and spaces
      if (!nameRegex.test(value)) {
        setErrors({
          ...errors,
          Name: "Name can only contain letters and spaces.",
        });
      } else {
        setErrors({ ...errors, Name: "" });
      }
      setEmployeeData({ ...employeeData, Name: value });
      return; // Stop further processing
    }
    // Email validation (basic email format check using regex)
    if (name === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
      if (!emailRegex.test(value)) {
        setErrors({ ...errors, Email: "Please enter a valid email address." });
      } else {
        setErrors({ ...errors, Email: "" });
      }
      setEmployeeData({ ...employeeData, Email: value });
      return; // Stop further processing
    }
    //  Mobile number validation (10 digits, only numbers)
    if (name === "Mobile") {
      const mobileRegex = /^\d{10}$/; // Allows exactly 10 digits
      if (!mobileRegex.test(value)) {
        setErrors({
          ...errors,
          Mobile: "Mobile number must be exactly 10 digits.",
        });
      } else {
        setErrors({ ...errors, Mobile: "" });
      }
      setEmployeeData({ ...employeeData, Mobile: value });
      return; // Stop further processing
    }

    // Address validation (min 10 characters, max 100 characters)
    if (name === "Address") {
      if (value.length < 10 || value.length > 100) {
        setErrors({
          ...errors,
          Address: "Address must be between 10 and 100 characters long.",
        });
      } else {
        setErrors({ ...errors, Address: "" });
      }
    }

    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Employee Data Submitted: ", employeeData);
    handleClose();
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const StyledButton = styled(Button)({
    color: "white",
    backgroundColor: "#6666FF",
    fontSize: "1rem",
    textTransform: "none",
    padding: "6px 8px",
    borderRadius: "7px",
  });
  const [lastScrollY, setLastScrollY] = useState(0);
  const containerRef = useRef(null); // Reference for the scrollable container

  // Function to disable page scrolling
  const disablePageScroll = () => {
    document.body.style.overflow = "hidden"; // Disable window scroll
  };

  // Function to enable page scrolling (cleanup)
  const enablePageScroll = () => {
    document.body.style.overflow = ""; // Enable window scroll
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const currentScrollY = container.scrollTop;

      if (currentScrollY > lastScrollY) {
        // Scrolling down: Hide the footer
        setFooterVisible(true);
      } else {
        // Scrolling up: Show the footer
        setFooterVisible(true);
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    // Disable page scrolling on mount
    disablePageScroll();

    return () => {
      // Cleanup event listener and enable page scrolling on unmount
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      enablePageScroll();
    };
  }, [lastScrollY]);

  return (
    <>
      <Box
        marginTop={2}
        component={Paper}
        ref={containerRef}
        sx={{
          height: "calc(100vh - 57px)", // Set height to fit the viewport
          maxHeight: 620,
          position: "relative",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: "1.5rem",
          }}
        >
          <StyledButton variant="contained" onClick={handleOpen}>
            Add Employee
          </StyledButton>
        </Box>

        <AddEmployeesTable />

        <Dialog open={open} onClose={handleClose} maxWidth={860}>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogContent>
            {/* Employee_ID and Name */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginBottom: 2,
              }}
            >
              <Box>
                <Typography> ID*</Typography>
                <TextField
                  variant="outlined"
                  required
                  type="number"
                  size="small"
                  placeholder="Enter ID"
                  name="EmployeeID"
                  onChange={handleChange}
                  value={employeeData.EmployeeID}
                  sx={{
                    minWidth: 250,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F3F3F3 ",

                      "&:hover": {
                        backgroundColor: "#F3F3F3",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#EBF9FF", // Focused background color
                        borderColor: "#5BC4FA", // Focused border color
                      },
                    },
                  }}
                  onWheel={(e) => e.target.blur()}
                  error={Boolean(errors.EmployeeID)} // Shows red border when error
                  helperText={errors.EmployeeID} // Shows the error message
                />
              </Box>

              <Box>
                <Typography>Name*</Typography>
                <TextField
                  variant="outlined"
                  required
                  type="text"
                  size="small"
                  placeholder="Enter Name"
                  name="Name"
                  onChange={handleChange}
                  value={employeeData.Name}
                  sx={{
                    minWidth: 250,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F3F3F3 ",

                      "&:hover": {
                        backgroundColor: "#F3F3F3",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#EBF9FF", // Focused background color
                        borderColor: "#5BC4FA", // Focused border color
                      },
                    },
                  }}
                  error={Boolean(errors.Name)} // Shows red border when error
                  helperText={errors.Name} // Shows the error message
                />
              </Box>
            </Box>

            {/* Email and Mobile */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginBottom: 2,
              }}
            >
              <Box>
                <Typography>Email*</Typography>
                <TextField
                  variant="outlined"
                  required
                  type="email"
                  size="small"
                  placeholder="Enter Email"
                  name="Email"
                  onChange={handleChange}
                  value={employeeData.Email}
                  sx={{
                    minWidth: 250,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F3F3F3 ",

                      "&:hover": {
                        backgroundColor: "#F3F3F3",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#EBF9FF", // Focused background color
                        borderColor: "#5BC4FA", // Focused border color
                      },
                    },
                  }}
                  error={Boolean(errors.Email)} // Shows red border when error
                  helperText={errors.Email} // Shows the error message
                />
              </Box>

              <Box>
                <Typography>Mobile*</Typography>
                <TextField
                  variant="outlined"
                  required
                  type="number"
                  size="small"
                  placeholder="Enter Mobile"
                  name="Mobile"
                  onChange={handleChange}
                  value={employeeData.Mobile}
                  sx={{
                    minWidth: 250,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F3F3F3 ",

                      "&:hover": {
                        backgroundColor: "#F3F3F3",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#EBF9FF", // Focused background color
                        borderColor: "#5BC4FA", // Focused border color
                      },
                    },
                  }}
                  onWheel={(e) => e.target.blur()}
                  error={Boolean(errors.Mobile)} // Shows red border when error
                  helperText={errors.Mobile} // Shows the error message
                />
              </Box>
            </Box>

            {/* Date of Joining and Date of Birth*/}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginBottom: 2,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ display: "flex", gap: 4.4 }}>
                  {/* Date of Joining */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        Date of Joining*
      </Typography>
      <DatePicker
        label="Select Date"
        value={employeeData.joiningDate}
        required
        onChange={handleJoiningDateChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Select Date"
            sx={{
              minWidth: 200,
              "& .MuiInputBase-root": {
                height: 36,
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#F3F3F3", // Default background color
                "&:hover": {
                  backgroundColor: "#F3F3F3", // Hover background color
                },
                "&.Mui-focused": {
                  backgroundColor: "#EBF9FF", // Focused background color
                  borderColor: "#5BC4FA", // Focused border color
                  borderWidth: 1,
                },
              },
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarToday fontSize="small" sx={{ fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>

                  {/* Date of Birth */}
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Date of Birth*
                    </Typography>
                    <DatePicker
                      label="Select Date"
                      value={employeeData.birthDate}
                      required
                      onChange={handleBirthDateChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidth
                          size="small"
                          placeholder="Select Date"
                          sx={{
                            minWidth: 200,
                            "& .MuiInputBase-root": {
                              height: 36,
                            },
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "#F3F3F3 ",

                              "&:hover": {
                                backgroundColor: "#F3F3F3",
                              },
                              "&.Mui-focused": {
                                backgroundColor: "#EBF9FF", // Focused background color
                                borderColor: "#5BC4FA", // Focused border color
                              },
                            },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <InputAdornment position="end">
                                <CalendarToday
                                  fontSize="small"
                                  sx={{ fontSize: 18 }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </LocalizationProvider>
            </Box>

            {/* Department and Designation */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginBottom: 2,
              }}
            >
              {/* Department Input Field */}
              <Box>
                <Typography>Department*</Typography>
                <Select
                  displayEmpty
                  value={employeeData.Department}
                  placeholder="Select"
                  required
                  onChange={handleChange}
                  name="Department"
                  variant="outlined"
                  size="small"
                  sx={{
                    minWidth: 250,
                   
                  }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="IT">Information Technology (IT)</MenuItem>
                  <MenuItem value="Operations">Operations</MenuItem>
                  <MenuItem value="Legal">Legal</MenuItem>
                  <MenuItem value="QA">Quality Assurance (QA)</MenuItem>
                  <MenuItem value="R&D">
                    Research and Development (R&D)
                  </MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Administration">Administration</MenuItem>
                </Select>
              </Box>
              {/* Designation Input Field */}
              <Box>
                <Typography>Designation*</Typography>
                <Select
                  required
                  displayEmpty
                  value={employeeData.Designation}
                  placeholder="Select"
                  onChange={handleChange}
                  name="Designation"
                  variant="outlined"
                  size="small"
                  sx={{
                    minWidth: 250,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F3F3F3 ",

                      "&:hover": {
                        backgroundColor: "#F3F3F3",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#EBF9FF", // Focused background color
                        borderColor: "#5BC4FA", // Focused border color
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="Frontend">Frontend Developer</MenuItem>
                  <MenuItem value="Backend">Backend Developer</MenuItem>
                  <MenuItem value="Mobile">Mobile App Development</MenuItem>
                  <MenuItem value="Software Archiect">
                    Software Archiect
                  </MenuItem>
                  <MenuItem value="Product Manager">Product Manager</MenuItem>
                  <MenuItem value="UI/UX Designer">UI/UX Designer</MenuItem>
                  <MenuItem value="Business Analyst">Business Analyst</MenuItem>
                </Select>
              </Box>
            </Box>

            {/*   Blood Group and Employment Status */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginBottom: 2,
              }}
            >
              <Box>
                <Typography>Blood Group</Typography>
                <Select
                  displayEmpty
                  value={employeeData.Bloodgroup || ""}
                  onChange={handleChange}
                  name="Bloodgroup"
                  variant="outlined"
                  size="small"
                  sx={{
                    minWidth: 250,
                    "& .MuiInputBase-input": {
                    "& .MuiSelect-outlined": {
                      backgroundColor: "#F3F3F3 ",
                        "&:hover": {
                          backgroundColor: "#F3F3F3",
                        },
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#EBF9FF", // Focused background color
                        borderColor: "#5BC4FA", // Focused border color
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select{" "}
                  </MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                </Select>
              </Box>
              <Box>
                <Typography> Status*</Typography>
                <Select
                  displayEmpty
                  required
                  value={employeeData.Employmentstatus || ""}
                  onChange={handleChange}
                  name="Employmentstatus"
                  variant="outlined"
                  size="small"
                  sx={{
                    minWidth: 250,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F3F3F3 ",

                      "&:hover": {
                        backgroundColor: "#F3F3F3",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#EBF9FF", // Focused background color
                        borderColor: "#5BC4FA", // Focused border color
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select{" "}
                  </MenuItem>
                  <MenuItem value="Full Time">Full Time</MenuItem>
                  <MenuItem value="Part Time">Part Time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </Select>
              </Box>
            </Box>

            {/* Address Input Field */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginBottom: 2,
              }}
            >
              <Box>
                <Typography>Address*</Typography>
                <TextField
                  variant="outlined"
                  required
                  multiline
                  rows={2}
                  size="small"
                  placeholder="Enter Address"
                  name="Address"
                  onChange={handleChange}
                  value={employeeData.Address}
                  sx={{
                    minWidth: 300,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F3F3F3 ",

                      "&:hover": {
                        backgroundColor: "#F3F3F3",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#EBF9FF", // Focused background color
                        borderColor: "#5BC4FA", // Focused border color
                      },
                    },
                  }}
                  error={Boolean(errors.Address)} // Red border on error
                  helperText={errors.Address} // Error message
                />
              </Box>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleClose}
              sx={{ textTransform: "none" }}
              color="error"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              sx={{ textTransform: "none", color: "#6666FF" }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Employee;
