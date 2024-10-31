import styled from "@emotion/styled";
import {
  Close,
  Edit,
  EditOutlined,
  HelpOutlineOutlined,
  Search,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const NewItems = () => {

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

  
  // custom textfield helper class
  const styledTextField = {
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
  };

  // unit textField
  const unitOpt = ["1unit", "2unit"];
  const unitName = {
    options: unitOpt,
    getOptionLabel: (option) => option,
  };
  // Tax Preference textField
  const TaxOpt = ["taxable", "unTaxable"];
  const TaxName = {
    options: TaxOpt,
    getOptionLabel: (option) => option,
  };
  // Account textField
  const AccountOpt = ["Current", "Saving Account"];
  const AccountName = {
    options: AccountOpt,
    getOptionLabel: (option) => option,
  };
  // text area input field
  const [focusedIndex, setFocusedIndex] = useState(null);
  // Purchase information
  // Account textField
  const PurchaseAccountOpt = ["Cost of Good Sold", "Cost of revenue"];
  const PurchaseAccountName = {
    options: PurchaseAccountOpt,
    getOptionLabel: (option) => option,
  };
  // Preferred Vendor textField
  const PreferredVendorOpt = ["Partner", "Solo"];
  const PreferredVendorName = {
    options: PreferredVendorOpt,
    getOptionLabel: (option) => option,
  };
  // Footer Sections
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
          maxHeight: 540,
          position: "relative",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Item Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            borderBottom: "1.5px solid #EFEFEF",
          }}
        >
          <Typography variant="h6" fontSize={"1.5rem"}>
            New Item
          </Typography>
          <IconButton>
            <Close />
          </IconButton>
        </Box>
        {/* Items Field */}

        {/* Type Radio */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#F9FAFB",
            padding: 2.1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Typography>
              Type
              <HelpOutlineOutlined
                sx={{
                  position: "relative",
                  top: 4,
                  left: 1,
                  width: 18,
                  height: 18,
                  color: "gray",
                }}
              />
            </Typography>
            <FormControl>
              <RadioGroup row>
                <FormControlLabel
                  value="Goods"
                  control={<Radio />}
                  label="Goods"
                />
                <FormControlLabel
                  value="Service"
                  control={<Radio />}
                  label="Service"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          {/* Name Input field */}
          <Box
            sx={{
              display: "flex",
              mt: 0.5,
              gap: 9,
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Name*</Typography>
            <Box sx={{ width: { xs: "100%", md: 350 } }}>
              <StyledTextField fullWidth size="small" />
            </Box>
          </Box>
          {/* Unit field */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 9.5, mt: 1.5 }}
          >
            <Typography>
              Unit
              <HelpOutlineOutlined
                sx={{
                  position: "relative",
                  top: 4,
                  left: 1,
                  width: 18,
                  height: 18,
                  color: "gray",
                }}
              />
            </Typography>

            <Box sx={{ width: { xs: "100%", md: 350 } }}>
              <Autocomplete
              
                size="small"
                {...unitName}
                disableClearable
                renderInput={(params) => (
                  <StyledTextField placeholder="Select" fullWidth size="small" {...params} />
                )}
              />
            </Box>
          </Box>
          {/* Hsn Code Inputfield */}

          <Box
            sx={{
              display: "flex",
              mt: 1.5,
              gap: 5.9,
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">HSN Code</Typography>
            <Box
              sx={{
                width: { xs: "100%", md: 350 },
                display: "flex",
                alignItems: "center",
                gap: 0.6,
              }}
            >
              <StyledTextField size="small" sx={{ minWidth: 350 }} />
              <IconButton>
                <Search sx={{ color: "#6666FF" }} />
              </IconButton>
            </Box>
          </Box>
          {/* tax Preference */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.9, mt: 1.5 }}
          >
            <Typography>Tax Prefernce*</Typography>

            <Box sx={{ width: { xs: "100%", md: 350 } }}>
              <Autocomplete
                size="small"
                {...TaxName}
                disableClearable
                renderInput={(params) => (
                  <StyledTextField placeholder="Select" fullWidth size="small" {...params} />
                )}
              />
            </Box>
          </Box>
        </Box>
        {/* sales & Purchase Information */}
        <Box
          sx={{ display: "flex", justifyContent: "space-around", padding: 2 }}
        >
          {/* Sales Information Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "45%", // Ensure both boxes take up equal width
            }}
          >
            <Typography variant="subtitle1" fontWeight={500}>
              <Checkbox defaultChecked />
              Sales Information
            </Typography>
            <Box padding={1.2}>
              {/* Selling Price Input */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                <Typography>Selling Price*</Typography>
                <StyledTextField
                type="number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          mr: 1,
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          style={{
                            fontWeight: 500,
                            color: "#424242",
                            backgroundColor: "#F9FAFB",
                            padding: "8px",
                          }}
                        >
                          INR
                        </Typography>
                        <Box
                          sx={{
                            height: 37,
                            borderRight: "1.5px solid #EFEFEF",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  sx={{
                    minWidth: 300,
                    backgroundColor: "#FFFFFF",
                    "& .MuiOutlinedInput-root": {
                      paddingLeft: 0,
                      borderRadius: "7px",
                    },
                    "& fieldset": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#BDBDBD",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#BDBDBD",
                    },
                  }}
                  onWheel={(e)=>e.target.blur()}
                />
              </Box>

              {/* Account Input */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1.5,
                  gap: 4.872,
                }}
              >
                <Typography>Account*</Typography>
                <Box sx={{ width: { xs: "100%", md: 300 } }}>
                  <Autocomplete
                    size="small"
                    {...AccountName}
                    disableClearable
                    renderInput={(params) => (
                      <StyledTextField
                      placeholder="Select"
                        size="small"
                        {...params}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "7px",
                          },
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>

              {/* Description Input */}
              <Box
                sx={{
                  display: "flex",
                  gap: 3.1,
                  marginTop: 1.5,
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" sx={{ fontSize: "0.95rem" }}>
                  Description
                </Typography>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={2}
                  required
                  style={{
                    backgroundColor: "#F3F3F3",
                    minWidth: 281, // Set a consistent width for both focus and blur states
                    maxWidth: 281, // Ensure the width does not shrink on focus
                    padding: "8px",
                    fontSize: "16px",
                    borderRadius: "7px",
                    border: "1px solid #ccc",
                    resize: "none", // Prevent the user from resizing
                    outline: focusedIndex === 1 ? "2px solid #1976d2" : "1px solid #ccc",
                  }}
                  onFocus={() => setFocusedIndex(1)}
                  onBlur={() => setFocusedIndex(null)}
                />
              </Box>
            </Box>
            <Box borderBottom={"1.5px solid #EFEFEF"} mt={3.5}></Box>
          </Box>

          {/* Purchase Information Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "45%", // Ensure both boxes take up equal width
            }}
          >
            <Typography variant="subtitle1" fontWeight={500}>
              <Checkbox defaultChecked />
              Purchase Information
            </Typography>
            <Box padding={1.2}>
              {/* Cost Price Input */}
              <Box sx={{ display: "flex", gap: 8.1, alignItems: "center" }}>
                <Typography>Cost Price</Typography>
                <StyledTextField
                type="number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          mr: 1,
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          style={{
                            fontWeight: 500,
                            color: "#424242",
                            backgroundColor: "#F9FAFB",
                            padding: "8px",
                          }}
                        >
                          INR
                        </Typography>
                        <Box
                          sx={{
                            height: 37,
                            borderRight: "1.5px solid #EFEFEF",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  sx={{
                    minWidth: 300,
                    backgroundColor: "#FFFFFF",
                    "& .MuiOutlinedInput-root": {
                      paddingLeft: 0,
                      borderRadius: "7px",
                    },
                    "& fieldset": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#BDBDBD",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#BDBDBD",
                    },
                  }}
                  onWheel={(e)=>e.target.blur()}
                />
              </Box>

              {/* Account Input */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9.2,
                  mt: 1.5,
                }}
              >
                <Typography>Account*</Typography>
                <Box sx={{ width: { xs: "100%", md: 300 } }}>
                  <Autocomplete
                    size="small"
                    {...PurchaseAccountName}
                    disableClearable
                    renderInput={(params) => (
                      <StyledTextField
                      placeholder="Select"
                        size="small"
                        {...params}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "7px",
                          },
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>

              {/* Description Input */}
              <Box
                sx={{
                  display: "flex",
                  gap: 7.4,
                  marginTop: 1.5,
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" sx={{ fontSize: "0.95rem" }}>
                  Description
                </Typography>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={2}
                  required
                  style={{
                    backgroundColor: "#F3F3F3",
                    minWidth: 281, // Set a consistent width for both focus and blur states
                    maxWidth: 281, // Ensure the width does not shrink on focus
                    padding: "8px",
                    fontSize: "16px",
                    borderRadius: "7px",
                    border: "1px solid #ccc",
                    outline: focusedIndex === 2 ? "2px solid #1976d2" : "1px solid #ccc",
                  }}
                  onFocus={() => setFocusedIndex(2)}
                  onBlur={() => setFocusedIndex(null)}
                />
              </Box>
              {/*Prefered Vendor Textfield  */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3.1,
                  mt: 1.5,
                  className: "PreferredVendor",
                }}
              >
                <Typography>Prefered Vendor</Typography>

                <Box sx={{ width: { xs: "100%", md: 300 } }}>
                  <Autocomplete
                    size="small"
                    {...PreferredVendorName}
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
            </Box>
          </Box>
        </Box>

        {/* Default Tax rates */}
        <Box
          sx={{
            padding: 1.5,
            display: "flex",
            flexDirection: "column",
            borderBottom: "1.5px solid #EFEFEF",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1" fontWeight={500}>
              Default Tax Rates
              <EditOutlined
                sx={{
                  width: 18,
                  height: 18,
                  position: "relative",
                  top: 2.5,
                  left: 2,
                }}
              />
            </Typography>
          </Box>
          <Box display={"flex"} alignItems="center" gap={1} mt={0.5}>
            <Typography
              variant="subtitle2"
              fontWeight={400}
              borderBottom={"1.5px dashed #EFEFEF"}
            >
              Intra State Tax Rate
            </Typography>
            <Typography variant="subtitle2" fontWeight={400}>
              GST18 (18%)
            </Typography>
          </Box>
          <Box display={"flex"} alignItems="center" gap={1} mt={0.5}>
            <Typography
              variant="subtitle2"
              fontWeight={400}
              borderBottom={"1.5px dashed #EFEFEF"}
            >
              Inter State Tax Rate
            </Typography>
            <Typography variant="subtitle2" fontWeight={400}>
              IGST18 (18%)
            </Typography>
          </Box>
        </Box>
        {/*Enable inventory Additional fields  */}
        <Box sx={{ mt: 2, p: 2, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Do you want to keep track of this item?{" "}
            <Typography
              variant="body2"
              component={"span"}
              style={{ fontWeight: 500 }}
            >
              Enable Inventory{" "}
            </Typography>
            to view its stock based on the sales and purchase transactions you
            record for it. Go to{" "}
            <Typography
              variant="body2"
              component={"span"}
              sx={{ fontWeight: 500 }}
            >
              Settings &gt; Preferences &gt; Items{" "}
            </Typography>
            and enable inventory.
          </Typography>
        </Box>
        {/* Footer */}
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

export default NewItems;
