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
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../utils/ImgUtils";

const Untitled = () => {
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
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
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
  // addMore button
  const [addmore, setAddMore] = useState(false);
  const callAddMoreToggle = () => {
    setAddMore((prev) => !prev);
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
  // footer next button
  const handleNextClick = () => {
    if (tabsValue < 3) {
      setTabsValue((prevValue) => prevValue + 1);
    }
  };
  const isLastTab = tabsValue === 3;

  return (
    <>
      <Box>
        <Box
          sx={{ padding: 3, display: "flex", justifyContent: "space-between" }}
        >
          {/* billing  address container */}
          <Box
            sx={{
              maxWidth: 400,
              display: "flex",
              flexDirection: "column", // Stacks on small screens
            }}
          >
            <Typography variant="subtitle1" fontSize={"1.2rem"}>
              Billing Address
            </Typography>
            {/* attention input field */}
            <Box
              display={"flex"}
              mt={2}
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
            {/* country/region */}
            <Box
              display={"flex"}
              gap={5}
              marginTop={2}
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
            {/* Address Input Field */}
            <Box
              display={"flex"}
              gap={11.5}
              alignItems={"center"}
              flexDirection={{ xs: "column", sm: "row" }}
              marginTop={2}
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
            {/* address 2 */}
            <Box
              display={"flex"}
              gap={11.5}
              alignItems={"center"}
              flexDirection={{ xs: "column", sm: "row" }}
              marginTop={2}
            >
              <Typography variant="subtitle1">Address</Typography>
              <TextField
                multiline
                placeholder="Street2"
                rows={2}
                size="small"
                fullWidth
                value={billingAddress.address2 || ""}
                onChange={(e) =>
                  handleBillingAddressChange("address2", e.target.value)
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
            {/* City Input Field */}
            <Box
              display={"flex"}
              gap={15.5}
              marginTop={2}
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
            {/* State Input Field */}
            <Box display={"flex"} gap={14} alignItems={"center"} marginTop={2}>
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
            {/* Pin Code Input Field */}
            <Box
              display={"flex"}
              gap={10.5}
              alignItems={"center"}
              marginTop={2}
            >
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
            {/* Phone Number Input Field */}
            <Box display={"flex"} gap={13} alignItems={"center"} marginTop={2}>
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
            {/* Fax Number Input Field */}
            <Box display={"flex"} gap={7.7} alignItems={"center"} marginTop={2}>
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
          </Box>
          {/* shipping addresss container */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
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
            {/* attention input field */}
            <Box
              display={"flex"}
              gap={12.6}
              marginTop={2}
              paddingRight={8}
              alignItems={"center"}
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
            {/* country/region input field */}
            <Box
              display={"flex"}
              gap={7}
              paddingRight={8}
              alignItems={"center"}
              marginTop={2}
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
            {/* Address street 1 input field */}
            <Box
              display={"flex"}
              gap={13.7}
              paddingRight={8}
              alignItems={"center"}
              mt={2}
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
            {/* Address street 2 input field */}
            <Box
              display={"flex"}
              gap={13.7}
              paddingRight={8}
              alignItems={"center"}
              mt={2}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Typography variant="subtitle1">Address</Typography>
              <TextField
                multiline
                placeholder="Street2"
                rows={2}
                size="small"
                fullWidth
                value={shippingAddress.address2 || ""}
                onChange={(e) =>
                  handleShippingAddressChange("address2", e.target.value)
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
            {/* city input field */}
            <Box
              display={"flex"}
              gap={18}
              paddingRight={8}
              alignItems={"center"}
              mt={2}
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
            {/* state input field */}
            <Box
              display={"flex"}
              gap={17}
              paddingRight={8}
              marginTop={2}
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
            {/* Pin Code Input Field */}
            <Box
              display={"flex"}
              gap={13.6}
              paddingRight={8}
              marginTop={2}
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
            {/* Phone Number Input Field */}
            <Box
              display={"flex"}
              gap={16.3}
              paddingRight={8}
              marginTop={2}
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
            {/* Fax Number Input Field */}
            <Box
              display={"flex"}
              gap={11.4}
              paddingRight={8}
              marginTop={2}
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
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "c",
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
                View and edit the address format of your transactions under
                Settings &gt; Preferences &gt; Customers.
              </Typography>
            </Box>
          </Box>
        
      </Box>
    </>
  );
};

export default Untitled;
