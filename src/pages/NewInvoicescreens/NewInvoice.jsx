import {
  ArrowDropDown,
  HelpOutline,
  KeyboardArrowDown,
} from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Autocomplete,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography,
  Select,
  Menu,
  TextareaAutosize,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid2,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import { IoIosAddCircle, IoMdClose } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";
import { FaCircleInfo } from "react-icons/fa6";
import InvoicePaymentTable from "../../components/Tables/InvoicePaymentTable";
import styled from "@emotion/styled";
import { MdOutlineFileUpload } from "react-icons/md";
import { RiMastercardFill, RiVisaLine } from "react-icons/ri";
import { images } from "../../utils/ImgUtils";
import { Link } from "react-router-dom";

const NewInvoice = () => {
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

  const options = [
    { label: "Customer 1" },
    { label: "Customer 2" },
    { label: "Customer 3" },
  ];
  const [inputValue, setInputValue] = useState(""); // State for the input value
  const [selectedOption, setSelectedOption] = useState(null); // State for selected option
  // button with dropdown
  const StyledButton = styled(Button)({
    textTransform: "none",
    borderRadius: "4px 0 0 4px",
    backgroundColor: "#6666FF",
    borderRight: "0.4px solid #dadada",
    fontSize: "0.9rem",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      // You can now search using the `inputValue` or `selectedOption`
      console.log("Searching for:", inputValue);
    } else {
      console.log("Please enter a search term or select a customer.");
    }
  };

  // text area input field
  const [focusedIndex, setFocusedIndex] = useState(null);
  // documents upload
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const maxFiles = 10;
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes

  const handleFileChange = (event) => {
    setError(""); // Clear previous error message
    const selectedFiles = Array.from(event.target.files);

    // Check file limit
    if (selectedFiles.length + files.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }

    // Check file size limit
    const validFiles = selectedFiles.filter((file) => file.size <= maxSize);
    if (validFiles.length < selectedFiles.length) {
      setError(`Some files exceeded the size limit of 10MB.`);
    }

    setFiles([...files, ...validFiles]);
  };
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
        setFooterVisible(false);
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

          display: "flex",
          flexDirection: "column",
          maxHeight: 620,
          position: "relative",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Invoice Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: 2,
            alignItems: "center",
          }}
        >
          <Box display={"flex"} mt={1.5} padding={"0 1rem"}>
            <Box marginRight={0.5}>
              <TbFileInvoice size={28} />
            </Box>
            <Typography variant="h5">New Invoice</Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Button startIcon={<IoSettingsOutline size={23}color="#6666FF" />} />
            <Box borderRight={"1px solid #dadada"} height={"24px"} mx={1}></Box>
            <Button startIcon={<IoMdClose color="#999999" size={28} />} />
          </Box>
        </Box>
        {/* customer name inputfield with search button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: " 1rem",
            backgroundColor: "#F9FAFB",
            borderTop: "1.5px solid #EFEFEF",
          }}
        >
          <Typography variant="caption" sx={{ fontSize: "0.95rem", mr: 1.5 }}>
            Customer Name*
          </Typography>
          <Box display={"flex"}>
            <Autocomplete
              size="small"
              freeSolo
              options={options.map((option) => option.label)}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) =>
                setInputValue(newInputValue)
              }
              onChange={(event, newValue) => {
                setInputValue(newValue || ""); // Updates input value based on dropdown selection
              }}
              sx={{ maxWidth: 500 }}
              renderInput={(params) => (
                <StyledTextField
                  {...params} 
                  required
                  variant="outlined"
                  placeholder="Select or add a customer"
                  sx={{
                    width: 500,
                    flexGrow: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "5px 0 0 5px",
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {params.InputProps.endAdornment}
                        <InputAdornment position="end">
                          <KeyboardArrowDown />
                        </InputAdornment>
                      </>
                    ),
                  }}
                />
              )}
            />

            <IconButton
              color="primary"
              onClick={handleSearch}
              aria-label="search"
              style={{
                backgroundColor: "#6666FF",
                color: "#fff",
                borderRadius: "0 5px 5px 0",

                padding: 8,
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
        {/* Invoice field */}
        <Box
          sx={{
            padding: "1.2rem 1rem",
            display: "flex",

            flexDirection: "column",
            justifyContent: "space-between",
            borderBottom: "1.5px solid #EFEFEF",
          }}
        >
          <Box
            sx={{
              flex: "1 1 30%",
              display: "flex",
              minWidth: "250px",
              alignItems: "center",
              gap: 8.6,
            }}
          >
            <Typography variant="caption" sx={{ fontSize: "0.95rem" }}>
              Invoice#*
            </Typography>
            <StyledTextField
              variant="outlined"
              required
              size="small"
              sx={{ borderColor: "#EBF9FF", minWidth: 300 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton padding={4}>
                      <IoSettingsOutline size={18} color="#6666FF" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {/* Order Number Field */}
          <Box
            sx={{
              flex: "1 1 30%",
              display: "flex",
              minWidth: "250px",
              alignItems: "center",
              gap: 4.5,
              mt: 1.4,
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontSize: "0.95rem", fontWeight: 400 }}
            >
              Order Number
            </Typography>
            <StyledTextField
              variant="outlined"
              required
              type="number"
              size="small"
              sx={{ borderColor: "#EBF9FF", minWidth: 300 }}
            />
          </Box>
          {/* Invoice Date */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                flex: "1 1 30%",
                display: "flex",
                minWidth: "450px",
                alignItems: "center",
                gap: 5.1,
                mt: 1.4,
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "0.95rem" }}>
                Invoice Date*
              </Typography>
              <TextField
                variant="outlined"
                type="date"
                required
                size="small"
                sx={{ borderColor: "#EBF9FF", minWidth: 300 }}
              />
            </Box>
            {/* Terms Dropdown */}
            <Box
              sx={{
                flex: "1 1 30%",
                minWidth: "200px",
                display: "flex",
                alignItems: "center",
                gap: 4.1,
                mt: 1.4,
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "0.95rem" }}>
                Terms
              </Typography>
              <Select
                defaultValue="Due On Receipt"
                variant="outlined"
                minWidth={250}
                size="small"
                sx={{ color: "#999998",
                  '& .MuiSelect-outlined':{
                    backgroundColor: "#F3F3F3",
                  }
                 }}
              >
                <MenuItem sx={{ fontSize: "0.7rem" }} value="Due On Receipt">
                  Due On Receipt
                </MenuItem>
                <MenuItem value="Net 15">Net 15</MenuItem>
                <MenuItem value="Net 30">Net 30</MenuItem>
              </Select>
            </Box>
            {/* Due Date*/}
            <Box
              sx={{
                flex: "1 1 30%",
                minWidth: "200px",
                display: "flex",
                alignItems: "center",
                gap: 4.1,
                mt: 1.4,
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "0.95rem" }}>
                Due Date
              </Typography>
              <TextField
                variant="outlined"
                type="date"
                required
                size="small"
                sx={{ borderColor: "#EBF9FF", minWidth: 150 }}
              />
            </Box>
          </Box>
        </Box>
        {/* Sales Person */}
        <Box
          sx={{
            padding: "1.1rem 1rem",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: "space-between",
            borderBottom: "1.5px solid #EFEFEF",
          }}
        >
          {/* Salesperson Field */}
          <Box sx={{ display: "flex", gap: 5.3, alignItems: "center" }}>
            <Typography variant="caption" sx={{ fontSize: "0.95rem" }}>
              SalesPerson
            </Typography>
            <Select
              displayEmpty
              defaultValue=""
              size="small"
              variant="outlined"
              sx={{ backgroundColor: "#f9f9f9", minWidth: 300 }}
            >
              <MenuItem value="" disabled>
                Select or Add Salesperson
              </MenuItem>
              <MenuItem value="Salesperson 1">Salesperson 1</MenuItem>
              <MenuItem value="Salesperson 2">Salesperson 2</MenuItem>
              <MenuItem value="Salesperson 3">Salesperson 3</MenuItem>
            </Select>
          </Box>
        </Box>
        {/* Subject */}
        <Box
          sx={{
            display: "flex",
            gap: 3.3,
            paddingTop: "0.95rem",
            alignItems: "center",
          }}
        >
          <Box padding={"1rem"}>
            <Typography variant="caption" sx={{ fontSize: "0.95rem" }}>
              Subject
            </Typography>
            <IconButton>
              <FaCircleInfo size={18} sx={{ color: "#9e9e9e" }} />
            </IconButton>
          </Box>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={2}
            required
            placeholder="Let your customer know what this invoice is for"
            style={{
              minWidth: 426,
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              outline: focusedIndex === 1 ? "1px solid #000" : "none",
            }}
            onFocus={() => setFocusedIndex(1)}
            onBlur={() => setFocusedIndex(null)}
          />
        </Box>
        {/* Item Table */}
        <Box padding={2}>
          <Box>
            <InvoicePaymentTable />
          </Box>
          {/* customer notes section */}
          {/* Left side */}
          <Box sx={{ mt: 3, display: "flex", gap: 12 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",

                gap: 24,
              }}
            >
              <Box display={"flex"}>
                <StyledButton
                  variant="contained"
                  startIcon={<IoIosAddCircle />}
                >
                  New
                </StyledButton>

                {/*  Dropdown Button */}
                <IconButton
                  onClick={handleClick}
                  sx={{
                    backgroundColor: "#6666FF",
                    borderRadius: "0 4px 4px 0",
                    mr: 1,

                    boxShadow:
                      "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
                    "&:hover": {
                      backgroundColor: "#6666FF",
                    },
                  }}
                >
                  <ArrowDropDown sx={{ color: "white" }} />
                </IconButton>

                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Option 1</MenuItem>
                  <MenuItem onClick={handleClose}>Option 2</MenuItem>
                  <MenuItem onClick={handleClose}>Option 3</MenuItem>
                </Menu>
                <Box display={"flex"}>
                  <StyledButton
                    variant="contained"
                    startIcon={<IoIosAddCircle />}
                  >
                    Add Item In Bulk
                  </StyledButton>
                </Box>
              </Box>
              <Box>
                <Typography variant="body2" fontSize={"0.95rem"}>
                  Customer Notes
                </Typography>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={2}
                  required
                  placeholder="Enter the Customer Notes"
                  style={{
                    minWidth: 426,

                    padding: "8px",
                    fontSize: "15px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    outline: focusedIndex === 2 ? "1px solid #000" : "none",
                  }}
                  onFocus={() => setFocusedIndex(2)}
                  onBlur={() => setFocusedIndex(null)}
                />
                <Typography
                  variant="caption"
                  display={"block"}
                  color="textSecondary"
                >
                  Will be displayed on the invoice
                </Typography>
              </Box>
            </Box>
            {/* right side */}
            <Box
              sx={{
                padding: 2.5,
                width: "100%",
                maxWidth: 500, // Adjust this to match the width from your screenshot
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#F9FAFB",
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h6">Sub Total</Typography>
                <Typography variant="h6" fontSize={"1rem"}>
                  0.00
                </Typography>
              </Box>

              {/* Discount */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography variant="body1">Discount</Typography>

                <TextField
                
                  variant="outlined"
                  size="small"
                  type="number"
                  defaultValue={0}
                  sx={{
                    maxWidth: 120,
                    "& .MuiOutlinedInput-root": {
                      display: "flex",
                      justifyContent: "flex-end",
                      marginLeft: "27px",
                      width: 106,

                      paddingRight: "10px",
                    },
                    fontSize: "0.8rem",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box
                          sx={{
                            borderLeft: "1px solid #dadada",
                            height: 32,
                            marginRight: 1,
                          }}
                        ></Box>
                        <Typography>%</Typography>
                      </InputAdornment>
                    ),
                  }}
                  onWheel={(e)=>e.target.blur()} // mouse scroll has prevent from changing number value
                />
                <Typography variant="body1">0.00</Typography>
              </Box>

              {/* TDS / TCS Selection */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <RadioGroup row defaultValue="TDS">
                  <FormControlLabel
                    value="TDS"
                    control={
                      <Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 19.1,
                          },
                        }}
                      />
                    }
                    label="TDS"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="TCS"
                    control={
                      <Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 19.1,
                          },
                        }}
                      />
                    }
                    label="TCS"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                </RadioGroup>

                <FormControl sx={{ width: 135 }}>
                  <Select size="small" defaultValue="" displayEmpty>
                    <MenuItem value="" disabled>
                      Select a Tax
                    </MenuItem>
                    <MenuItem value={10}>10%</MenuItem>
                    <MenuItem value={20}>20%</MenuItem>
                  </Select>
                </FormControl>
                <Typography color="#999999">-0.00</Typography>
              </Box>

              {/* Old Due */}
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextField
                  size="small"
                  value="Old due"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    width: 120,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F1F3F5",
                      borderRadius: 1,
                      "& fieldset": { borderStyle: "dashed" },
                    },
                  }}
                />
                <Box marginLeft={"41px"}>
                  <TextField
                    size="small"
                    placeholder="Enter amount"
                    sx={{ width: 125 }}
                  />
                  <IconButton
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 22,
                      },
                    }}
                  >
                    <HelpOutline />
                  </IconButton>
                </Box>
                <Typography variant="body1">0.00</Typography>
              </Box>

              {/* Divider */}
              <Box mt={2} width={"100%"} borderBottom={"2px solid #eee"}></Box>

              {/* Total */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <Typography
                  sx={{ fontWeight: 500, fontSize: "1.2rem" }}
                  variant="body1"
                >
                  Total (₹)
                </Typography>
                <Typography variant="h5">0.00</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Terms and conditions */}

        <Box
          sx={{
            borderTop: "1.5px solid #EFEFEF",
            backgroundColor: "#F9FAFB",
            padding: "1.2rem 0.9rem",
            mt: 2.5,

            display: "flex",
          }}
        >
          <Box>
            <Typography variant="body2" fontSize={"0.95rem"}>
              Terms and Conditions
            </Typography>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              required
              placeholder="Enter the terms and Conditions of your business to be displayed in your transaction"
              style={{
                minWidth: 600,
                border: "1px solid #ccc",

                padding: "8px",
                fontSize: "15px",
                borderRadius: "4px",
                outline: "none",
                outline: focusedIndex === 3 ? "1px solid #000" : "none",
              }}
              onFocus={() => setFocusedIndex(3)}
              onBlur={() => setFocusedIndex(null)}
            />
          </Box>
          <Box borderRight={"2px solid #EFEFEF"} margin={"0 1rem"}></Box>
          {/* Upload Documents  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              maxWidth: 600,
            }}
          >
            <Typography variant="subtitle2" fontWeight={400}>
              Attach File(s) to Invoice
            </Typography>

            <Button
              variant="outlined"
              component="label"
              startIcon={<MdOutlineFileUpload />}
              sx={{
                padding: "5px 10px",
                textTransform: "none",
                fontSize: "14px",
                display: "flex",
                justifyContent: "space-between",
                width: "fit-content",
                borderStyle: "dashed", // Dotted border style
                borderColor: "#ccc", // Same color as in the image
                color: "rgba(0, 0, 0, 0.6)",
                fontWeight: 400,
              }}
            >
              Upload File
              <input type="file" hidden multiple onChange={handleFileChange} />
            </Button>

            {/* Show Error Message if there is an error */}
            {error ? (
              <Typography fontSize={"0.75rem"} color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            ) : (
              // Show Default Message only if there's no error
              <Typography fontSize={"0.75rem"} mt={0.7} color="textSecondary">
                You can upload a maximum of 10 files, 10MB each
              </Typography>
            )}

            {/* Display uploaded files in a row without showing file size */}
            {files.length > 0 && (
              <Grid2 container>
                {files.map((file, index) => (
                  <Grid2 item key={index}>
                    <Typography fontSize={"0.65rem"} color="textPrimary">
                      {file.name}
                    </Typography>
                  </Grid2>
                ))}
              </Grid2>
            )}
          </Box>
          {/* border bottom */}
        </Box>
        <Box
          borderBottom={"1.5px solid #EFEFEF"}
          sx={{ display: "flex", flexDirection: "column" }}
        ></Box>
        {/* Payment gateway */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderBottom: "1.5px solid #EFEFEF",
            backgroundColor: "#F9FAFB",
            padding: "1.2rem 0.9rem",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
            }}
          >
            Want to get paid faster?
            <img src={images.mastercardImg} width={35} height={25} />
            <RiVisaLine color="blue" size={24} />
          </Typography>
          <Typography variant="body2" color="textSecondary" mt={0.5}>
            Configure payment gateways and receive payments online.
            <Link
              to={"/paymentgateway"}
              style={{
                ml: 1,
                textDecoration: "none",
                color: "#6666FF",
              }}
            >
              Set up Payment Gateway
            </Link>
          </Typography>
        </Box>
        {/*  Additional Fields*/}
        <Box sx={{ mt: 4, mb: 3, padding: 1, paddingLeft: 1.6 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
            Additional Fields:
            <Typography
              component="span"
              variant="body2"
              sx={{ fontWeight: "normal", ml: 1 }}
            >
              Start adding custom fields for your invoices by going to
              <Typography component="span" sx={{ fontStyle: "italic", ml: 1 }}>
                Settings ➡ Sales ➡ Invoices.
              </Typography>
            </Typography>
          </Typography>
        </Box>

        {/* Footer Buttons */}
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
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#F3F3F3",
              color: "black",
              textTransform: "none",
              borderColor: "#A7A7A7",
            }}
          >
            Save as Draft
          </Button>

          <Box display={"flex"}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6666FF",
                borderRight: "0.4px solid #dadada",
                textTransform:"none",
                
              }}
            >
              Save and Send
            </Button>

            <IconButton
              onClick={handleClick}
              sx={{
                backgroundColor: "#6666FF",
                borderRadius: "0 4px 4px 0",
                boxShadow:
                  "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
                "&:hover": {
                  backgroundColor: "#6666FF",
                },
              }}
            >
              <ArrowDropDown sx={{ color: "white" }} />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Option 1</MenuItem>
              <MenuItem onClick={handleClose}>Option 2</MenuItem>
              <MenuItem onClick={handleClose}>Option 3</MenuItem>
            </Menu>
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

export default NewInvoice;
