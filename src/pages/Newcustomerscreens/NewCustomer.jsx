import { CloudUpload } from "@mui/icons-material";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  FormControl,
  Select,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  styled,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  List,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../utils/ImgUtils";

const NewCustomer = () => {
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

  // customer Type Radio
  const [value, setValue] = React.useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  // primary contact:salutaion Inputfield
  const salutationOpt = ["Salutation1", "Salutation2"];
  const salutationName = {
    options: salutationOpt,
    getOptionLabel: (option) => option,
  };
  // customer Display Name Inputfield
  const customerDisplayNameOpt = ["Usman", "Ameeruddin"];
  const customerDisplayName = {
    options: customerDisplayNameOpt,
    getOptionLabel: (option) => option,
  };
  // currency Name Inputfield
  const currencyNameOpt = ["INR-Indian Rupees", "USD-United State Dollar"];
  const currencyName = {
    options: currencyNameOpt,
    getOptionLabel: (option) => option,
  };
  // customer email input field functionality
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(value));
  };
  // customer work phone details input field functionality:
  const [workPhone, setWorkPhone] = useState("");
  const [workPhoneError, setWorkPhoneError] = useState(false);

  const handleWorkPhoneChange = (e) => {
    const value = e.target.value;

    // Allow input only if the value has 10 digits or less
    if (value.length <= 10) {
      setWorkPhone(value);

      // Validate work phone for exactly 10 digits
      const workPhoneRegex = /^[0-9]{10}$/;
      setWorkPhoneError(!workPhoneRegex.test(value));
    }
  };

  // customer mobile details input field functionality:
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState(false);

  const handleMobileChange = (e) => {
    const value = e.target.value;

    // Allow input only if the value has 10 digits or less
    if (value.length <= 10) {
      setMobile(value);

      // Validate mobile number for exactly 10 digits
      const mobileRegex = /^[0-9]{10}$/;
      setMobileError(!mobileRegex.test(value));
    }
  };

  // Gst Treatment Name Inputfield
  const GstTreatmentNameOpt = ["OFFLINE", "ONLINE"];
  const GstTreatmentName = {
    options: GstTreatmentNameOpt,
    getOptionLabel: (option) => option,
  };
  // place Of Supply Name Inputfield
  const placeofSupplyNameOpt = ["ANDHRAPRADESH", "GUJARAT", "TAMILNADU"];
  const placeofSupplyName = {
    options: placeofSupplyNameOpt,
    getOptionLabel: (option) => option,
  };
  //pan card input field
  const [pan, setPan] = useState("");
  const [error, setError] = useState(false);

  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase();
    setPan(value);

    // PAN validation: 5 letters, 4 digits, and 1 letter (total 10 characters)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(value)) {
      setError(true);
    } else {
      setError(false);
    }
  };
  // Tax Exempt Type Radio
  const [taxvalue, setTaxValue] = React.useState("");
  const taxhandleChange = (event) => {
    setTaxValue(event.target.value);
  };
  // payment Terms Inputfield
  const paymentTermsOpt = ["30days", "60days"];
  const paymentTerms = {
    options: paymentTermsOpt,
    getOptionLabel: (option) => option,
  };
  // portal Language Inputfield
  const portalLanguageOpt = ["English", "Hindi", "Tamil", "Urdu"];
  const portalLanguage = {
    options: portalLanguageOpt,
    getOptionLabel: (option) => option,
  };
  // documents upload
  const [files, setFiles] = useState([]); // To store all selected files
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const handleFileUpload = async (event) => {
    const newFiles = Array.from(event.target.files); // Convert FileList to array
    const combinedFiles = [...files, ...newFiles]; // Combine previously uploaded files with the new ones

    let totalSize = 0;
    let error = "";

    // Calculate the total file size and validate
    combinedFiles.forEach((file) => {
      totalSize += file.size;
    });

    // Validation: Max 3 files and each file should be < 10MB
    if (combinedFiles.length > 3) {
      error = "You can upload a maximum of 3 files.";
      setFiles([]); // Reset files if validation fails
    } else if (totalSize > 10 * 1024 * 1024) {
      error = "Total size of files must be smaller than 10MB.";
      setFiles([]); // Reset files if validation fails
    } else {
      setFiles(combinedFiles); // Update files if validation passes
      setErrorMessage("");

      // Upload logic (only if validation passes)
      const formData = new FormData();
      combinedFiles.forEach((file) => formData.append("files", file));

      try {
        const response = await axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Handle success response
        if (response.status === 200) {
          setUploadSuccess("Files uploaded successfully!");
        } else {
          setErrorMessage("Failed to upload files. Please try again.");
        }
      } catch (err) {
        setErrorMessage("Error uploading files: " + err.message);
      }
    }

    setErrorMessage(error);
  };
  //Billing and shipping address:

  // State for form fields for Billing and Shipping addresses
  const [billingAddress, setBillingAddress] = useState({
    attention: "",
    countryRegion: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    faxNumber: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    attention: "",
    countryRegion: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    faxNumber: "",
  });

  // Handle input changes for billing address & shipping address
  const handleAddressChange = (addressType, field, value) => {
    if (addressType === "billing") {
      setBillingAddress((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    } else if (addressType === "shipping") {
      setShippingAddress((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };

  // Ensure you have these handlers in place
  const handleBillingAddressChange = (field, value) => {
    handleAddressChange("billing", field, value);
  };

  const handleShippingAddressChange = (field, value) => {
    handleAddressChange("shipping", field, value);
  };

  // Copy billing address to shipping address
  const copyBillingToShipping = () => {
    setShippingAddress({ ...billingAddress });
  };
  // Function for phone validation (must be exactly 10 digits)
  const validatePhoneNumber = (value) => {
    const regex = /^[0-9]{10}$/; // Regular expression for exactly 10 digits
    return regex.test(value);
  };

  // Function for pin code validation (must be exactly 6 digits)
  const validatePinCode = (value) => {
    const regex = /^[0-9]{6}$/; // Regular expression for 6 digits
    return regex.test(value);
  };

  // Function for fax number validation (custom rule for length, example 6-12 digits)
  const validateFaxNumber = (value) => {
    const regex = /^[0-9]{6,12}$/; // Regular expression for 6-12 digits
    return regex.test(value);
  };

  // Country/Region Inputfield
  const countryRegionOpt = ["INDIA", "USA", "SINGAPORE", "DUBAI"];
  const countryRegionName = {
    options: countryRegionOpt,
    getOptionLabel: (option) => option,
  };
  // State Inputfield
  const stateOpt = ["ANDHRAPRADESH", "TAMILNADU", "TELANGANA", "KARNATAKA"];
  const stateName = {
    options: stateOpt,
    getOptionLabel: (option) => option,
  };
    // menu Tabs section
  const [tabsValue, setTabsValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabsValue(newValue);
  };
  // contact person table
  const tableData = (
    salutation,
    firstName,
    lastName,
    emailAddress,
    workPhone,
    mobilePhone,
    designation,
    department
  ) => {
    return {
      salutation,
      firstName,
      lastName,
      emailAddress,
      workPhone,
      mobilePhone,
      designation,
      department,
    };
  };
  const rows = [
    tableData(
      "Mr",
      "Rahul",
      "K.",
      "rahul@gmail.com",
      477437647,
      876487878,
      "business",
      "sales"
    ),
    tableData(
      "Mr",
      "K.",
      "Rahul",
      "rahul@gmail.com",
      477437647,
      876487878,
      "business",
      "sales"
    ),
    tableData(
      "Mr",
      "K.",
      "Rahul",
      "rahul@gmail.com",
      477437647,
      876487878,
      "business",
      "sales"
    ),
    tableData(
      "Mr",
      "K.",
      "Rahul",
      "rahul@gmail.com",
      477437647,
      876487878,
      "business",
      "sales"
    ),
    tableData(
      "Mr",
      "K.",
      "Rahul",
      "rahul@gmail.com",
      477437647,
      876487878,
      "business",
      "sales"
    ),
    tableData(
      "Mr",
      "K.",
      "Rahul",
      "rahul@gmail.com",
      477437647,
      876487878,
      "business",
      "sales"
    ),
    tableData(
      "Mr",
      "K.",
      "Rahul",
      "rahul@gmail.com",
      477437647,
      876487878,
      "business",
      "sales"
    ),
  ];
  // Footer Section
const [isFooterVisible,setFooterVisible] = useState(true) // To control footer visibility
const [lastScrollY,setLastScrollY] = useState(0);
const containerRef = useRef(null); // Reference for the scrollable container

// Function to disable page Scrolling 
const disablePageScroll = () =>{
  document.body.style.overflow = 'hidden';
}
// Function to Enable page Scrolling 

const enablePageScroll = () =>{
  document.body.style.overflow = '';
}
useEffect(()=>{
  const container = containerRef.current;
   const handleScroll = ()=>
   {
    const currentScrollY = container.scrollTop; 
    if(currentScrollY > lastScrollY)
      {
         // Scrolling down: Hide the footer
         setFooterVisible(false)
      } 
      else {
        // Scrolling up: Show the footer
        setFooterVisible(true);
      }
      // Update the last scroll position
      setLastScrollY(currentScrollY);
   }
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


  // next Button 
  const handleNextClick = () => {
    if (tabsValue < 3) {
      setTabsValue((prevValue) => prevValue + 1);
    }
  };
  const isLastTab = tabsValue === 3;

  return (
    <>
      <Box component={Paper} ref={containerRef} sx={{ 
        maxHeight:620,
        height: "calc(100vh - 57px)",
        overflowY:"auto",
        overflowX:"hidden",
        position:'relative'
       }}>
        <Box
          sx={{
            paddingLeft: { xs: 1, sm: 1.2, md: 1.8 },
            height: "calc(100vh - 57px)", // Set height to fit the viewport
          }}
        >
          
          <Typography
            variant="subtitle1"
            fontWeight={500}
            marginTop={2}
            sx={{ fontSize: "1.5rem" }}
          >
            New Customer
          </Typography>

          {/* Customer Type */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, md: 8 },
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              mt: 2,
            }}
          >
            <Typography>Customer Type</Typography>
            
          </Box>

          {/* Primary Contact */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              mt: 2,
              gap: { xs: 2, md: 7 },
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Primary Contact</Typography>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 2, md: 3 },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Autocomplete
                size="small"
                {...salutationName}
                disableClearable
                renderInput={(params) => (
                  <StyledTextField
                    sx={{ width: { xs: "100%", sm: 170 } }}
                    size="small"
                    required
                    placeholder="Salutation"
                    {...params}
                  />
                )}
              />
              <StyledTextField
                size="small"
                sx={{ width: { xs: "100%", sm: 170 } }}
                placeholder="First Name"
              />
              <StyledTextField
                size="small"
                sx={{ width: { xs: "100%", sm: 170 } }}
                placeholder="Last Name"
              />
            </Box>
          </Box>

          {/* Company Name */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              mt: 2,
              gap: { xs: 2, md: 7 },
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" fontSize={"1rem"}>
              Company Name
            </Typography>
            <Box sx={{ width: { xs: "100%", md: 558 } }}>
              <StyledTextField fullWidth size="small" />
            </Box>
          </Box>

          {/* Customer Display Name */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              mt: 2,
              gap: { xs: 2, md: 5.3 },
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">
              Customer Display
              <br /> Name*
            </Typography>
            <Box sx={{ width: { xs: "100%", md: 558 } }}>
              <Autocomplete
                size="small"
                {...customerDisplayName}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    size="small"
                    {...params}
                    sx={styledTextField}
                  />
                )}
              />
            </Box>
          </Box>

          {/* Currency Name */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              mt: 2,
              gap: { xs: 2, md: 7.1 },
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Currency Name</Typography>
            <Box sx={{ width: { xs: "100%", md: 558 } }}>
              <Autocomplete
                size="small"
                {...currencyName}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    placeholder="INR - Indian Rupees"
                    fullWidth
                    size="small"
                    {...params}
                    sx={styledTextField}
                  />
                )}
              />
            </Box>
          </Box>

          {/* Customer E-mail */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              mt: 2,
              gap: { xs: 2, md: 6 },
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Customer E-Mail</Typography>
            <Box sx={{ width: { xs: "100%", md: 558 } }}>
              <TextField
                fullWidth
                size="small"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={
                  emailError ? "Please enter a valid email address" : ""
                }
                sx={styledTextField}
              />
            </Box>
          </Box>

          {/* Customer Contact Details */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              mt: 2,
              gap: { xs: 2, md: 4.5 },
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">
              Customer Contact
              <br /> Details
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 2, md: 1 },
                width: { xs: "100%", md: 558 },
              }}
            >
              <TextField
                size="small"
                type="number"
                value={workPhone}
                onChange={handleWorkPhoneChange}
                placeholder="Work Phone"
                error={workPhoneError}
                helperText={
                  workPhoneError
                    ? "Please enter a valid 10-digit mobile number"
                    : ""
                }
                sx={{
                  width: { xs: "100%", md: 279 },
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
                }}
              />

              <TextField
                size="small"
                type="number"
                placeholder="Mobile"
                value={mobile}
                onChange={handleMobileChange}
                error={mobileError}
                helperText={
                  mobileError
                    ? "Please enter a valid 10-digit mobile number"
                    : ""
                }
                sx={{
                  width: { xs: "100%", md: 279 },
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
                }}
              />
            </Box>
          </Box>
        </Box>
       
        {/* Tab Section */}
  
            <Tabs
              sx={{ borderBottom: "3px solid #EFEFEF",mt:1.2 }}
              value={tabsValue}
              onChange={handleTabChange}
            >
              <Tab label="Other Details" />
              <Tab label="Address" />
              <Tab label="Contact Persons" />
              <Tab label="Remarks" />
            </Tabs>
            {tabsValue === 0 && (
              <Box sx={{ padding: 2 }}>
                {/* GST Treatment */}
                <Box
                  sx={{
                    display: "flex",
                    mt: 1,
                    alignItems: "center",
                    gap: { xs: 2, sm: 4, md: 7.1 }, // Responsive gaps
                    fontWeight: 400,
                    flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens
                  }}
                >
                  <Typography variant="subtitle1">Gst Treatment*</Typography>
                  <Box sx={{ width: { xs: "100%", sm: "70%", md: 558 } }}>
                    <Autocomplete
                      size="small"
                      {...GstTreatmentName}
                      id="GstTreatmentName"
                      disableClearable
                      renderInput={(params) => (
                        <TextField
                          placeholder="Select a GST treatment"
                          fullWidth
                          size="small"
                          {...params}
                          variant="outlined"
                          sx={styledTextField}
                        />
                      )}
                    />
                  </Box>
                </Box>

                {/* Place of Supply */}
                <Box
                  sx={{
                    display: "flex",
                    mt: 1,
                    alignItems: "center",
                    gap: { xs: 2, sm: 4, md: 6 }, // Responsive gaps
                    flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens
                  }}
                >
                  <Typography variant="subtitle1">Place of Supply*</Typography>
                  <Box sx={{ width: { xs: "100%", sm: "70%", md: 558 } }}>
                    <Autocomplete
                      size="small"
                      {...placeofSupplyName}
                      id="placeofSupplyName"
                      disableClearable
                      renderInput={(params) => (
                        <TextField
                          required
                          fullWidth
                          size="small"
                          {...params}
                          variant="outlined"
                          sx={styledTextField}
                        />
                      )}
                    />
                  </Box>
                </Box>

                {/* PAN */}
                <Box
                  sx={{
                    display: "flex",
                    mt: 1,
                    alignItems: "center",
                    gap: { xs: 2, sm: 4, md: 17.3 }, // Responsive gaps
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Typography variant="subtitle1">Pan</Typography>
                  <Box sx={{ width: { xs: "100%", sm: "70%", md: 558 } }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={pan}
                      onChange={handlePanChange}
                      error={error}
                      helperText={
                        error ? "Please enter a valid PAN number" : ""
                      }
                      sx={styledTextField}
                    />
                  </Box>
                </Box>

                {/* Tax Preference */}
                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 2, sm: 4, md: 7 },
                    mt: 1,
                    alignItems: "center",
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Typography>Tax Preference*</Typography>
                  <FormControl>
                    <RadioGroup row value={taxvalue} onChange={taxhandleChange}>
                      <FormControlLabel
                        value="Business"
                        control={<Radio />}
                        label="Taxable"
                      />
                      <FormControlLabel
                        value="Individual"
                        control={<Radio />}
                        label="Tax Exempt"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                {/* Payment Terms */}
                <Box
                  sx={{
                    display: "flex",
                    mt: 1,
                    alignItems: "center",
                    gap: { xs: 2, sm: 4, md: 6.5 },
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Typography variant="subtitle1">Payment Terms</Typography>
                  <Box sx={{ width: { xs: "100%", sm: "70%", md: 558 } }}>
                    <Autocomplete
                      size="small"
                      {...paymentTerms}
                      id="paymentTerms"
                      disableClearable
                      renderInput={(params) => (
                        <TextField
                          placeholder="Due on Receipt"
                          fullWidth
                          size="small"
                          {...params}
                          variant="outlined"
                          sx={styledTextField}
                        />
                      )}
                    />
                  </Box>
                </Box>

                {/* Enable Portal */}
                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 2, sm: 4, md: 8 },
                    mt: 1,
                    alignItems: "center",
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Typography>Enable Portal?</Typography>
                  <FormControlLabel
                    sx={{ color: "#939393" }}
                    control={<Checkbox />}
                    label="Allow Portal access for this customer"
                  />
                </Box>

                {/* Upload Documents */}
                <Box
                  sx={{
                    display: "flex",
                    mt: 2,
                    mb: 1.5,
                    alignItems: "center",
                    gap: { xs: 2, sm: 4, md: 11 },
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Typography variant="subtitle1">Documents</Typography>
                  <Box display={"flex"} flexDirection={"column"}>
                    <Button
                      sx={{
                        width: 180,
                        backgroundColor: "#F3F3F3",
                        color: "#939393",
                        textTransform: "none",
                      }}
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUpload />}
                    >
                      Upload file
                      <input
                        type="file"
                        hidden
                        onChange={handleFileUpload}
                        multiple
                      />
                    </Button>
                    {files.length > 0 && (
                      <Typography variant="caption">
                        Uploaded Files:{" "}
                        {files.map((file) => file.name).join(", ")}
                      </Typography>
                    )}
                    {errorMessage && (
                      <Typography variant="caption" color="#D32F2F">
                        {errorMessage}
                      </Typography>
                    )}
                    {uploadSuccess && (
                      <Typography variant="caption" color="green">
                        {uploadSuccess}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Website URL Document */}
                <Box
                  sx={{
                    display: "flex",
                    mt: 1,
                    alignItems: "center",
                    gap: { xs: 2, sm: 4, md: 9.4 }, // Responsive gap
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Typography variant="subtitle1">Website URL</Typography>
                  <Box sx={{ width: { xs: "100%", sm: "70%", md: 558 } }}>
                    <TextField
                      placeholder="Website URL"
                      type="url"
                      fullWidth
                      size="small"
                      sx={styledTextField}
                    />
                  </Box>
                </Box>

                {/* Department InputField */}
                <Box
                  sx={{
                    display: "flex",
                    mt: 1.5,
                    alignItems: "center",
                    gap: { xs: 2, sm: 4, md: 10 }, // Responsive gap
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Typography variant="subtitle1">Department</Typography>
                  <Box sx={{ width: { xs: "100%", sm: "70%", md: 558 } }}>
                    <TextField fullWidth size="small" sx={styledTextField} />
                  </Box>
                </Box>

                {/* Customer Owner */}
                <Box
                  sx={{
                    display: "flex",
                    mt: 4,
                    mb: 3,
                    alignItems: "center",
                    gap: { xs: 2, sm: 4, md: 5 }, // Responsive gap
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Typography variant="subtitle1">Customer Owner:</Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography color="#939393" variant="caption">
                      Assign a user as the customer owner to provide access only
                      to the data of this customer.{" "}
                      <Box
                        component={Link}
                        sx={{ color: "#5BC4FA", textDecoration: "none" }}
                      >
                        Learn more
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            {tabsValue === 1 && (
              <Box sx={{ padding: 3 }}>
                {/* Billing & Shipping Address */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // Stacks on small screens
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle1" fontSize={"1.2rem"}>
                    Billing Address
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      paddingRight: { xs: 0, sm: 12.3 },
                      gap: 1.5,
                      alignItems: "center",
                      marginTop: { xs: 2, sm: 0 }, // Adds space when stacked on mobile
                    }}
                  >
                    <Typography variant="subtitle1" fontSize={"1.2rem"}>
                      Shipping Address
                    </Typography>
                    <Button
                      variant="text"
                      sx={{ textTransform: "none" }}
                      onClick={copyBillingToShipping}
                    >
                      (<img src={images.dollararrowicon} alt="" /> Copy Billing
                      Address)
                    </Button>
                  </Box>
                </Box>

                {/* Attention input Field */}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  mt={2}
                  flexDirection={{ xs: "column", sm: "row" }} // Stacks fields on small screens
                >
                  <Box
                    display={"flex"}
                    gap={11}
                    alignItems={"center"}
                    flexDirection={{ xs: "column", sm: "row" }}
                  >
                    <Typography variant="subtitle1">Attention</Typography>
                    <TextField
                      key="billing-attention"
                      type="text"
                      size="small"
                      fullWidth
                      value={billingAddress.attention || ""}
                      onChange={(e) =>
                        handleBillingAddressChange("attention", e.target.value)
                      }
                      sx={{
                        width: { xs: "100%", sm: 210 }, // Full width on mobile
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#F3F3F3",
                          "&:hover": {
                            backgroundColor: "#F3F3F3",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#EBF9FF",
                            borderColor: "#5BC4FA",
                          },
                        },
                      }}
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    gap={12.6}
                    paddingRight={8}
                    alignItems={"center"}
                    mt={{ xs: 2, sm: 0 }} // Adds space when stacked
                    flexDirection={{ xs: "column", sm: "row" }}
                  >
                    <Typography variant="subtitle1">Attention</Typography>
                    <TextField
                      type="text"
                      size="small"
                      key="billing-attention"
                      fullWidth
                      value={shippingAddress.attention || ""}
                      onChange={(e) =>
                        handleShippingAddressChange("attention", e.target.value)
                      }
                      sx={{
                        width: { xs: "100%", sm: 210 },
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#F3F3F3",
                          "&:hover": {
                            backgroundColor: "#F3F3F3",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#EBF9FF",
                            borderColor: "#5BC4FA",
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Country/Region Input Field */}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  mt={1.5}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <Box
                    display={"flex"}
                    gap={5}
                    alignItems={"center"}
                    flexDirection={{ xs: "column", sm: "row" }}
                  >
                    <Typography variant="subtitle1">Country/Region</Typography>
                    <Autocomplete
                      size="small"
                      {...countryRegionName}
                      disableClearable
                      value={billingAddress.countryRegion}
                      onChange={(e, newValue) =>
                        handleBillingAddressChange("countryRegion", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Select"
                          sx={{
                            width: { xs: "100%", sm: 210 },
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "#F3F3F3",
                              "&:hover": {
                                backgroundColor: "#F3F3F3",
                              },
                              "&.Mui-focused": {
                                backgroundColor: "#EBF9FF",
                                borderColor: "#5BC4FA",
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    gap={7}
                    paddingRight={8}
                    alignItems={"center"}
                    mt={{ xs: 2, sm: 0 }}
                    flexDirection={{ xs: "column", sm: "row" }}
                  >
                    <Typography variant="subtitle1">Country/Region</Typography>
                    <Autocomplete
                      size="small"
                      {...countryRegionName}
                      disableClearable
                      value={shippingAddress.countryRegion}
                      onChange={(e, newValue) =>
                        handleShippingAddressChange("countryRegion", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Select"
                          sx={{
                            width: { xs: "100%", sm: 210 },
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "#F3F3F3",
                              "&:hover": {
                                backgroundColor: "#F3F3F3",
                              },
                              "&.Mui-focused": {
                                backgroundColor: "#EBF9FF",
                                borderColor: "#5BC4FA",
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>

                {/* Address Input Field */}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  mt={1.5}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <Box
                    display={"flex"}
                    gap={11.5}
                    alignItems={"center"}
                    flexDirection={{ xs: "column", sm: "row" }}
                  >
                    <Typography variant="subtitle1">Address</Typography>
                    <TextField
                      multiline
                      placeholder="Street1"
                      rows={2}
                      size="small"
                      fullWidth
                      value={billingAddress.address || ""}
                      onChange={(e) =>
                        handleBillingAddressChange("address", e.target.value)
                      }
                      sx={{
                        width: { xs: "100%", sm: 210 },
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#F3F3F3",
                          "&:hover": {
                            backgroundColor: "#F3F3F3",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#EBF9FF",
                            borderColor: "#5BC4FA",
                          },
                        },
                      }}
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    gap={13.7}
                    paddingRight={8}
                    alignItems={"center"}
                    mt={{ xs: 2, sm: 0 }}
                    flexDirection={{ xs: "column", sm: "row" }}
                  >
                    <Typography variant="subtitle1">Address</Typography>
                    <TextField
                      multiline
                      placeholder="Street1"
                      rows={2}
                      size="small"
                      fullWidth
                      value={shippingAddress.address || ""}
                      onChange={(e) =>
                        handleShippingAddressChange("address", e.target.value)
                      }
                      sx={{
                        width: { xs: "100%", sm: 210 },
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#F3F3F3",
                          "&:hover": {
                            backgroundColor: "#F3F3F3",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#EBF9FF",
                            borderColor: "#5BC4FA",
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* City Input Field */}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  flexDirection={{ xs: "column", sm: "row" }}
                  mt={2}
                >
                  <Box
                    display={"flex"}
                    gap={15.5}
                    alignItems={"center"}
                    flexDirection={{ xs: "column", sm: "row" }}
                  >
                    <Typography variant="subtitle1">City</Typography>
                    <TextField
                      type="text"
                      size="small"
                      value={billingAddress.city || ""}
                      onChange={(e) =>
                        handleBillingAddressChange("city", e.target.value)
                      }
                      sx={{
                        width: { xs: "100%", sm: 210 },
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
                      }}
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    gap={18}
                    paddingRight={8}
                    alignItems={"center"}
                    mt={{ xs: 2, sm: 0 }}
                    flexDirection={{ xs: "column", sm: "row" }}
                  >
                    <Typography variant="subtitle1">City</Typography>
                    <TextField
                      type="text"
                      size="small"
                      value={shippingAddress.city || ""}
                      onChange={(e) =>
                        handleShippingAddressChange("city", e.target.value)
                      }
                      sx={{
                        width: { xs: "100%", sm: 210 },
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
                      }}
                    />
                  </Box>
                </Box>

                {/* State Input Field */}
                <Box display={"flex"} justifyContent={"space-between"} mt={1.5}>
                  <Box display={"flex"} gap={14} alignItems={"center"}>
                    <Typography variant="subtitle1">State</Typography>
                    <Autocomplete
                      size="small"
                      {...stateName}
                      disableClearable
                      value={billingAddress.state}
                      onChange={(e, newValue) =>
                        handleBillingAddressChange("state", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Select State"
                          sx={{
                            width: 210,

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
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    gap={17}
                    paddingRight={8}
                    alignItems={"center"}
                  >
                    <Typography variant="subtitle1">State</Typography>
                    <Autocomplete
                      size="small"
                      {...stateName}
                      disableClearable
                      value={shippingAddress.state}
                      onChange={(e, newValue) =>
                        handleShippingAddressChange("state", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Select State"
                          sx={{
                            width: 210,

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
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>

                {/* Pin Code Input Field */}
                <Box display={"flex"} justifyContent={"space-between"} mt={2}>
                  {/* Pin Code Input Field */}
                  <Box display={"flex"} gap={10.5} alignItems={"center"}>
                    <Typography variant="subtitle1">Pin Code</Typography>
                    <TextField
                      size="small"
                      value={billingAddress.pinCode || ""}
                      onChange={(e) => {
                        const pinCode = e.target.value;
                        // Allow only numeric input
                        if (pinCode === "" || /^[0-9]{0,6}$/.test(pinCode)) {
                          handleBillingAddressChange("pinCode", pinCode);
                        }
                      }}
                      error={
                        billingAddress.pinCode &&
                        !validatePinCode(billingAddress.pinCode)
                      }
                      helperText={
                        billingAddress.pinCode &&
                        !validatePinCode(billingAddress.pinCode)
                          ? "Pin Code must be exactly 6 digits"
                          : ""
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#F3F3F3",
                          "&:hover": {
                            backgroundColor: "#F3F3F3",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#EBF9FF",
                            borderColor: "#5BC4FA",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Shipping Address Pin Code Input */}
                  <Box
                    display={"flex"}
                    gap={13.6}
                    paddingRight={8}
                    alignItems={"center"}
                  >
                    <Typography variant="subtitle1">Pin Code</Typography>
                    <TextField
                      size="small"
                      value={shippingAddress.pinCode || ""}
                      onChange={(e) => {
                        const pinCode = e.target.value;
                        // Allow only numeric input
                        if (pinCode === "" || /^[0-9]{0,6}$/.test(pinCode)) {
                          handleShippingAddressChange("pinCode", pinCode);
                        }
                      }}
                      error={
                        shippingAddress.pinCode &&
                        !validatePinCode(shippingAddress.pinCode)
                      }
                      helperText={
                        shippingAddress.pinCode &&
                        !validatePinCode(shippingAddress.pinCode)
                          ? "Pin Code must be exactly 6 digits"
                          : ""
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#F3F3F3",
                          "&:hover": {
                            backgroundColor: "#F3F3F3",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#EBF9FF",
                            borderColor: "#5BC4FA",
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Phone Number Input Field */}
                <Box display={"flex"} justifyContent={"space-between"} mt={2}>
                  <Box display={"flex"} gap={13} alignItems={"center"}>
                    <Typography variant="subtitle1">Phone</Typography>
                    <TextField
                      size="small"
                      value={billingAddress.phone || ""}
                      onChange={(e) => {
                        const phone = e.target.value;
                        // Allow only numeric input
                        if (phone === "" || /^[0-9]{0,10}$/.test(phone)) {
                          handleBillingAddressChange("phone", phone);
                        }
                      }}
                      error={
                        billingAddress.phone &&
                        !validatePhoneNumber(billingAddress.phone)
                      }
                      helperText={
                        billingAddress.phone &&
                        !validatePhoneNumber(billingAddress.phone)
                          ? "Phone number must be exactly 10 digits"
                          : ""
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#F3F3F3",
                          "&:hover": {
                            backgroundColor: "#F3F3F3",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#EBF9FF",
                            borderColor: "#5BC4FA",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Shipping Address Phone Number Input */}
                  <Box
                    display={"flex"}
                    gap={16.3}
                    paddingRight={8}
                    alignItems={"center"}
                  >
                    <Typography variant="subtitle1">Phone</Typography>
                    <TextField
                      size="small"
                      value={shippingAddress.phone || ""}
                      onChange={(e) => {
                        const phone = e.target.value;
                        // Allow only numeric input
                        if (phone === "" || /^[0-9]{0,10}$/.test(phone)) {
                          handleShippingAddressChange("phone", phone);
                        }
                      }}
                      error={
                        shippingAddress.phone &&
                        !validatePhoneNumber(shippingAddress.phone)
                      }
                      helperText={
                        shippingAddress.phone &&
                        !validatePhoneNumber(shippingAddress.phone)
                          ? "Phone number must be exactly 10 digits"
                          : ""
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#F3F3F3",
                          "&:hover": {
                            backgroundColor: "#F3F3F3",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#EBF9FF",
                            borderColor: "#5BC4FA",
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Fax Number Input Field */}
                <Box display={"flex"} justifyContent={"space-between"} mt={2}>
                  <Box display={"flex"} gap={7.7} alignItems={"center"}>
                    <Typography variant="subtitle1">Fax Number</Typography>
                    <TextField
                      size="small"
                      value={billingAddress.faxNumber || ""}
                      onChange={(e) => {
                        const fax = e.target.value;
                        // Allow only numeric input
                        if (fax === "" || /^[0-9]{0,12}$/.test(fax)) {
                          handleBillingAddressChange("faxNumber", fax);
                        }
                      }}
                      error={
                        billingAddress.faxNumber &&
                        !validateFaxNumber(billingAddress.faxNumber)
                      }
                      helperText={
                        billingAddress.faxNumber &&
                        !validateFaxNumber(billingAddress.faxNumber)
                          ? "Fax number must be between 6 and 12 digits"
                          : ""
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#F3F3F3",
                          "&:hover": {
                            backgroundColor: "#F3F3F3",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#EBF9FF",
                            borderColor: "#5BC4FA",
                          },
                        },
                      }}
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    gap={11.4}
                    paddingRight={8}
                    alignItems={"center"}
                  >
                    <Typography variant="subtitle1">Fax Number</Typography>
                    <TextField
                      size="small"
                      value={shippingAddress.faxNumber || ""}
                      onChange={(e) => {
                        const fax = e.target.value;
                        // Allow only numeric input
                        if (fax === "" || /^[0-9]{0,12}$/.test(fax)) {
                          handleShippingAddressChange("faxNumber", fax);
                        }
                      }}
                      error={
                        shippingAddress.faxNumber &&
                        !validateFaxNumber(shippingAddress.faxNumber)
                      }
                      helperText={
                        shippingAddress.faxNumber &&
                        !validateFaxNumber(shippingAddress.faxNumber)
                          ? "Fax number must be between 6 and 12 digits"
                          : ""
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#F3F3F3",
                          "&:hover": {
                            backgroundColor: "#F3F3F3",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#EBF9FF",
                            borderColor: "#5BC4FA",
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Note Section */}
                <Box
                  sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "0.8px",
                    marginBottom: 3,
                  }}
                >
                  <Box display={"flex"}>
                    <Typography
                      borderLeft={"3px solid #5BC4FA"}
                      marginRight={0.5}
                      fontWeight={500}
                    />
                    <Typography
                      variant="subtitle1"
                      component={"span"}
                      fontSize={"1.1rem"}
                      fontWeight={500}
                    >
                      Note:
                    </Typography>
                  </Box>
                  <Box display={"flex"} alignItems="center" paddingLeft={1}>
                    <Box
                      sx={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "black",
                        borderRadius: "50%",
                        marginRight: 1,
                      }}
                    ></Box>
                    <Typography variant="body2">
                      View and edit the address format of your transactions
                      under Settings &gt; Preferences &gt; Customers.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            {tabsValue === 2 && (
              // contact Person table
              <Box
                display="flex"
                flexDirection={"column"}
                padding={3}
                paddingTop={5}
              >
                <TableContainer
                  component={Paper}
                  sx={{
                    maxHeight: { xs: "400px", md: "auto" },
                    overflowY: "auto",
                    overflowX: { xs: "scroll", md: "hidden" }, // Enable horizontal scrolling on mobile
                    width: "100%",
                  }}
                >
                  <Table sx={{ minWidth: { xs: "600px", md: "100%" } }}>
                    {" "}
                    {/* Set a min-width for smaller screens */}
                    <TableHead sx={{ backgroundColor: "#F3F3F3" }}>
                      <TableRow>
                        <TableCell align="center">Salutation</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Email Address</TableCell>
                        <TableCell align="center">Work Phone</TableCell>
                        <TableCell align="center">Mobile Phone</TableCell>
                        <TableCell align="center">Designation</TableCell>
                        <TableCell align="center">Department</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.salutation}
                          sx={{ "&:tbody, &:last-child th": { border: 1 } }}
                        >
                          <TableCell align="center" component="th" scope="row">
                            {row.salutation}
                          </TableCell>
                          <TableCell align="center">{row.firstName}</TableCell>
                          <TableCell align="center">{row.lastName}</TableCell>
                          <TableCell align="center">
                            {row.emailAddress}
                          </TableCell>
                          <TableCell align="center">{row.workPhone}</TableCell>
                          <TableCell align="center">
                            {row.mobilePhone}
                          </TableCell>
                          <TableCell align="center">
                            {row.designation}
                          </TableCell>
                          <TableCell align="center">{row.department}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Add Contact Person Button */}
                <Box marginBottom={2} marginTop={3}>
                  <Typography
                    variant="subtitle1"
                    component={Button}
                    sx={{
                      color: "#6666FF",
                      fontSize: "0.95rem",
                      textTransform: "none",
                    }}
                  >
                    + Add Contact Person
                  </Typography>
                </Box>
              </Box>
            )}

            {tabsValue === 3 && (
              <Box padding={{ xs: 2, sm: 3, md: 6 }}>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  gap={{ xs: 0.5, sm: 1 }}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  marginBottom={2}
                >
                  <Typography variant="subtitle1">Remarks</Typography>
                  <Typography
                    variant="body2"
                    component="span"
                    color="#939393"
                    sx={{ marginLeft: { sm: 1 } }}
                  >
                    (For Internal Use)
                  </Typography>
                </Box>

                <Box>
                  <StyledTextField
                  
                    multiline
                    rows={2.5}
                    size="small"
                    fullWidth
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "100%",
                      } /* Full width for all screen sizes */,
                    }}
                  />
                </Box>
              </Box>
            )}
          
        

        {/* Footer Buttons */}
        <Box
          sx={{
            display: "flex",
            position: "sticky", // Fixed to the bottom of the viewport
            bottom: 1,
            left: 0,
            right: 0,
            padding: "16px 14px 27px 10px",
            
           
            boxShadow: "-2.5px -2px 2.0px #EFEFEF",
            marginRight: 1.8,
            backgroundColor: "white",
            transition: "transform 0.3s ease", // Smooth transition
            transform: isFooterVisible ? "translateY(0)" : "translateY(100%)", // Toggle visibility
            zIndex: 1000, // Keep it above other elements
          }}
        >
          {/* Conditionally render buttons */}
          {!isLastTab ? (
            <Button
              variant="contained"
              sx={{
                marginRight: 2,
                backgroundColor: "#6666FF",
                textTransform: "none",
                width: 80,
              }}
              onClick={handleNextClick}
            >
              Next
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{
                  marginRight: 2,
                  backgroundColor: "#6666FF",
                  textTransform: "none",
                }}
              >
                Save
              </Button>
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
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default NewCustomer;
