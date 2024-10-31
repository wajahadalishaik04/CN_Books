import styled from "@emotion/styled";
import { BorderColor } from "@mui/icons-material";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  colors,
  FormControl,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";

const AddManually = () => {
  // custom styling components
  const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#F3F3F3",

      "&:hover": {
        backgroundColor: "#F3F3F3",
      },
      "&.Mui-focused": {
        backgroundColor: "#EBF9FF", // Focused background color
        borderColor: "#5BC4FA", // Focused border color
      },
    },
  });

  // Currency textField
  const CurrencyOpt = ["INR", "USD"];
  const CurrencyName = {
    options: CurrencyOpt,
    getOptionLabel: (option) => option,
    // text area input field
  };
  const [focusedIndex, setFocusedIndex] = useState(null);

  // footer section
  const [isFooterVisible, setFooterVisible] = useState(true); // To control footer visibility
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
        {/* Add Bank or Credit Card Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            p: 1.8,
            borderBottom: "1.5px solid #EFEFEF",
          }}
        >
          <Typography variant="h6">Add Bank or Credit Card</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            padding: 2.1,
            mt: 2,
          }}
        >
          {/* Select Account Type Radio */}

          <Box sx={{ display: "flex", alignItems: "center", gap: 5.5 }}>
            <Typography>Select Account Type*</Typography>
            <FormControl>
              <RadioGroup row>
                <FormControlLabel
                  value="Bank"
                  control={<Radio />}
                  label="Bank"
                />
                <FormControlLabel
                  value="CreditCard"
                  control={<Radio />}
                  label="CreditCard"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          {/* Account Name Input field */}
          <Box
            sx={{
              display: "flex",
              mt: 1.5,
              gap: 10,
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              borderBottom={"1.5px dashed #dadada "}
            >
              Account Name*
            </Typography>
            <Box sx={{ width: { xs: "100%", md: 300 } }}>
              <StyledTextField
                fullWidth
                size="small"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingLeft: 0, // Remove padding on the left side
                    borderTopLeftRadius: "7px", // Rounded left side border
                    borderBottomLeftRadius: "7px", // Rounded left side border
                    borderTopRightRadius: "7px", // Rounded left side border
                    borderBottomRightRadius: "7px", // Rounded left side border
                  },
                }}
              />
            </Box>
          </Box>
          {/* Account Code field */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 10.5, mt: 1.5 }}
          >
            <Typography borderBottom={"1.5px dashed #dadada "}>
              Account Code*
            </Typography>

            <Box sx={{ width: { xs: "100%", md: 300 } }}>
              <StyledTextField
                fullWidth
                type="number"
                size="small"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingLeft: 0, // Remove padding on the left side
                    borderTopLeftRadius: "7px", // Rounded left side border
                    borderBottomLeftRadius: "7px", // Rounded left side border
                    borderTopRightRadius: "7px", // Rounded left side border
                    borderBottomRightRadius: "7px", // Rounded left side border
                  },
                }}
                onWheel={(e) => e.target.blur()}
              />
            </Box>
          </Box>
          {/* Currency Inputfield */}

          <Box
            sx={{
              display: "flex",
              mt: 1.5,
              gap: 15.2,
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Currency*</Typography>
            <Box sx={{ width: { xs: "100%", md: 300 } }}>
              <Autocomplete
                size="small"
                {...CurrencyName}
                disableClearable
                renderInput={(params) => (
                  <StyledTextField
                  placeholder="Select"
              
                    size="small"
                    {...params}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderTopLeftRadius: "7px", // Rounded left side border
                        borderBottomLeftRadius: "7px", // Rounded left side border
                        borderTopRightRadius: "7px", // Rounded left side border
                        borderBottomRightRadius: "7px", // Rounded left side border
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          {/* Account Code field */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 8, mt: 1.5 }}>
            <Typography>Account Number*</Typography>

            <Box sx={{ width: { xs: "100%", md: 300 } }}>
              <StyledTextField
                fullWidth
                type="number"
                size="small"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingLeft: 0, // Remove padding on the left side
                    borderTopLeftRadius: "7px", // Rounded left side border
                    borderBottomLeftRadius: "7px", // Rounded left side border
                    borderTopRightRadius: "7px", // Rounded left side border
                    borderBottomRightRadius: "7px", // Rounded left side border
                  },
                }}
                onWheel={(e) => e.target.blur()}
              />
            </Box>
          </Box>
          {/* Bank Name Input field */}
          <Box
            sx={{
              display: "flex",
              mt: 1.5,
              gap: 12.7,
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              borderBottom={"1.5px dashed #dadada "}
            >
              Bank Name*
            </Typography>
            <Box sx={{ width: { xs: "100%", md: 300 } }}>
              <StyledTextField
                fullWidth
                size="small"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingLeft: 0, // Remove padding on the left side
                    borderTopLeftRadius: "7px", // Rounded left side border
                    borderBottomLeftRadius: "7px", // Rounded left side border
                    borderTopRightRadius: "7px", // Rounded left side border
                    borderBottomRightRadius: "7px", // Rounded left side border
                  },
                }}
              />
            </Box>
          </Box>
          {/* IFSC Code Input field */}
          <Box
            sx={{
              display: "flex",
              mt: 1.5,
              gap: 19.7,
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              borderBottom={"1.5px dashed #dadada "}
            >
              IFSC
            </Typography>
            <Box sx={{ width: { xs: "100%", md: 300 } }}>
              <StyledTextField
                fullWidth
                size="small"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingLeft: 0, // Remove padding on the left side
                    borderTopLeftRadius: "7px", // Rounded left side border
                    borderBottomLeftRadius: "7px", // Rounded left side border
                    borderTopRightRadius: "7px", // Rounded left side border
                    borderBottomRightRadius: "7px", // Rounded left side border
                  },
                }}
              />
            </Box>
          </Box>
          {/* Description Text area input field */}
          <Box
            sx={{
              display: "flex",
              gap: 14,
              marginTop: 1.5,
              alignItems: "center",
            }}
          >
            <Typography variant="caption" sx={{ fontSize: "0.95rem" }}>
              Description
            </Typography>

            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Max. 500 Characters"
              required
              className="custom-textarea" // Apply class for placeholder styling
              style={{
                backgroundColor:"#F3F3F3",
                width: 281, // Set exact width
                padding: "8px",
                fontSize: "16px", // Normal text font size inside the textarea
                borderRadius: "7px",
                border: "1px solid #ccc", // Ensure border remains visible with default color
                outline:
                  focusedIndex === 1 ? "2px solid #1976d2" : "1px solid #ccc", // Outline for focus state
              }}
              onFocus={() => setFocusedIndex(1)}
              onBlur={() => setFocusedIndex(null)}
            />
          </Box>

          <FormControlLabel
            sx={{ paddingLeft: 25 }}
            control={<Checkbox />}
            label="Make This Primary"
          />
        </Box>
        <Box
          sx={{
            position: "sticky", // Fixed to the bottom of the viewport
            bottom: 1,
            left: 0,
            right: 0,
            display: "flex",
            height: 50,
            boxShadow: "-2.5px -2px 2.0px #EFEFEF",
            alignItems: "center",
            padding: 2,
            gap: 2,
            backgroundColor: "white",
            transition: "transform 0.3s ease", // Smooth transition
            transform: isFooterVisible ? "translateY(0)" : "translateY(100%)", // Toggle visibility
            zIndex: 1000, // Keep it above other elements
          }}
        >
          <Box display={"flex"}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6666FF",
                borderRight: "0.4px solid #dadada",
                textTransform: "none",
              }}
            >
              Save
            </Button>
          </Box>

          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#F3F3F3",
              color: "black",
              textTransform: "none",
              borderColor: "#A7A7A7",
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddManually;
