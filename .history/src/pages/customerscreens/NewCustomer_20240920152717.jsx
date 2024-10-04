import { CloudUpload } from "@mui/icons-material";
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

const NewCustomer = () => {
  const StyledTextField = styled(TextField)({
    backgroundColor: "#F3F3F3",
    color: "#939393",

    "&:hover": {
      backgroundColor: "#F3F3F3",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused": {
        backgroundColor: "#EBF9FF", // Focused background color
        borderColor: "#5BC4FA", // Focused border color
      },
    },
  });
  const StyledButton = styled(Button)({
    color: "#5BC4FA",
    paddingLeft: 2,
    paddingTop: 8,
  });

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
  const callHandleTab = () => {
    setAddMore(true);
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

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box padding={3}>
          <Typography
            variant="h6"
            component={"span"}
            sx={{ fontSize: "1.5rem" }}
          >
            New Customer
          </Typography>
          {/* Customer Type */}
          <Box sx={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Typography>Customer Type</Typography>
            <FormControl>
              <RadioGroup row value={value} onChange={handleChange}>
                <FormControlLabel
                  value="Business"
                  control={<Radio />}
                  label="Business"
                />
                <FormControlLabel
                  value="Individual"
                  control={<Radio />}
                  label="Individual"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          {/* primary Contact Input Field */}
          <Box
            sx={{
              display: "flex",
              mt: 1,
              alignItems: "center",
              gap: 7,
              fontWeight: 400,
            }}
          >
            <Typography variant="subtitle1">Primary Contact</Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}
            >
              <Autocomplete
                size="small"
                {...salutationName}
                id="salutationName"
                disableClearable
                renderInput={(params) => (
                  <StyledTextField
                    sx={{ width: 170 }}
                    size="small"
                    placeholder="salutation"
                    {...params}
                    variant="outlined"
                  />
                )}
              />
              <StyledTextField
                size="small"
                sx={{ width: 170 }}
                placeholder="FirstName"
              />
              <StyledTextField
                size="small"
                sx={{ width: 170 }}
                placeholder="LastName"
              />
            </Box>
          </Box>
          {/* company Name Input Field */}
          <Box
            sx={{
              display: "flex",
              mt: 1,
              alignItems: "center",
              gap: 7,
              fontWeight: 400,
            }}
          >
            <Typography variant="subtitle1">Company Name</Typography>
            <Box width={558}>
              <StyledTextField fullWidth size="small" />
            </Box>
          </Box>
          {/* customer Display Name Input Field  */}
          <Box
            sx={{
              display: "flex",
              mt: 1,
              alignItems: "center",
              gap: 5.3,
              fontWeight: 400,
            }}
          >
            <Typography variant="subtitle1">
              Customer Display<br></br> Name*
            </Typography>
            <Box width={558}>
              <Autocomplete
                size="small"
                {...customerDisplayName}
                id="customerDisplayName"
                disableClearable
                renderInput={(params) => (
                  <StyledTextField
                    fullWidth
                    size="small"
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Box>
          </Box>
          {/* Currency Input Field */}
          <Box
            sx={{
              display: "flex",
              mt: 1,
              alignItems: "center",
              gap: 7.1,
              fontWeight: 400,
            }}
          >
            <Typography variant="subtitle1">Currency Name</Typography>
            <Box width={558}>
              <Autocomplete
                size="small"
                {...currencyName}
                id="currencyName"
                disableClearable
                renderInput={(params) => (
                  <StyledTextField
                    placeholder="INR-Indian Rupees"
                    fullWidth
                    size="small"
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Box>
          </Box>
          {/* Customer E-mail Input Field */}
          <Box
            sx={{
              display: "flex",
              mt: 1,
              alignItems: "center",
              gap: 6,
              fontWeight: 400,
            }}
          >
            <Typography variant="subtitle1">Customer E-Mail</Typography>
            <Box width={558}>
              <StyledTextField fullWidth size="small" />
            </Box>
          </Box>
          {/* Customer Contact Details Input Field */}
          <Box
            sx={{
              display: "flex",
              mt: 1,
              alignItems: "center",
              gap: 4.5,
              fontWeight: 400,
            }}
          >
            <Typography variant="subtitle1">
              Customer Contact<br></br> Details
            </Typography>
            <Box width={558} display={"flex"} gap={1}>
              <StyledTextField
                size="small"
                sx={{ width: 279 }}
                placeholder="WorkPhone"
              />
              <StyledTextField
                size="small"
                sx={{ width: 279 }}
                placeholder="Mobile"
              />
            </Box>
          </Box>
          <StyledButton onClick={callHandleTab} variant="text">
            + AddMore
          </StyledButton>
        </Box>
        {/* Tab Section */}
       {addmore &&(<>
        <Tabs sx={{ borderBottom: "3px solid #EFEFEF" }} value={tabsValue}
        onChange={handleTabChange}>
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
                gap: 7.1,
                fontWeight: 400,
              }}
            >
              <Typography variant="subtitle1">Gst Treatment*</Typography>
              <Box width={558}>
                <Autocomplete
                  size="small"
                  {...GstTreatmentName}
                  id="GstTreatmentName"
                  disableClearable
                  renderInput={(params) => (
                    <StyledTextField
                      placeholder="Select a GST treatment"
                      fullWidth
                      size="small"
                      {...params}
                      variant="outlined"
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
                gap: 6,
                fontWeight: 400,
              }}
            >
              <Typography variant="subtitle1">Place of Supply*</Typography>
              <Box width={558}>
                <Autocomplete
                  size="small"
                  {...placeofSupplyName}
                  id="placeofSupplyName"
                  disableClearable
                  renderInput={(params) => (
                    <StyledTextField
                      required
                      fullWidth
                      size="small"
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </Box>
            {/* pan Input field */}

            <Box
              sx={{
                display: "flex",
                mt: 1,
                alignItems: "center",
                gap: 17.3,
                fontWeight: 400,
              }}
            >
              <Typography variant="subtitle1">Pan</Typography>
              <Box width={558}>
                <StyledTextField fullWidth size="small" />
              </Box>
            </Box>
            {/* Tax Preference Input Field */}
            <Box sx={{ display: "flex", gap: 7, mt: 1, alignItems: "center" }}>
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
            {/* payment Terms input field */}
            <Box
              sx={{
                display: "flex",
                mt: 1,
                alignItems: "center",
                gap: 6.5,
                fontWeight: 400,
              }}
            >
              <Typography variant="subtitle1">Payment Terms</Typography>
              <Box width={558}>
                <Autocomplete
                  size="small"
                  {...paymentTerms}
                  id="paymentTerms"
                  disableClearable
                  renderInput={(params) => (
                    <StyledTextField
                      placeholder="Due on Receipt"
                      fullWidth
                      size="small"
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </Box>
            {/* Enable portal Access */}
            <Box sx={{ display: "flex", gap: 8, mt: 1, alignItems: "center" }}>
              <Typography>Enable Portal?</Typography>
              <FormControlLabel
                sx={{ color: "#939393" }}
                control={<Checkbox />}
                label="Allow Portal access for this customer"
              />
            </Box>
            {/* Portal Language */}
            <Box
              sx={{
                display: "flex",
                mt: 1,
                alignItems: "center",
                gap: 6,
                fontWeight: 400,
              }}
            >
              <Typography variant="subtitle1">portal Language </Typography>
              <Box width={558}>
                <Autocomplete
                  size="small"
                  {...portalLanguage}
                  id="portalLanguage"
                  disableClearable
                  renderInput={(params) => (
                    <StyledTextField
                      placeholder="Select Portal Language"
                      fullWidth
                      size="small"
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </Box>
            {/* Upload Documents */}
            <Box
              sx={{
                display: "flex",
                mt: 2,
                alignItems: "center",
                gap: 11,
                fontWeight: 400,
              }}
            >
              <Typography variant="subtitle1">Documents </Typography>
              <Box display={"flex"} flexDirection={"column"}>
                <Button
                  sx={{
                    width: 180,
                    backgroundColor: "#F3F3F3",
                    color: "#939393",
                  }}
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUpload />}
                >
                  Upload files
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                  />
                </Button>
                <Typography variant="caption" color="#939393">
                  You can upload the maximum of 3 files, 10MB each
                </Typography>
              </Box>
            </Box>
            {/* website url Document */}

            <Box
              sx={{
                display: "flex",
                mt: 1,
                alignItems: "center",
                gap: 10.5,
                fontWeight: 400,
              }}
            >
              <Typography variant="subtitle1">Documents</Typography>
              <Box width={558}>
                <StyledTextField
                  placeholder="Website Url"
                  type="url"
                  fullWidth
                  size="small"
                />
              </Box>
            </Box>
            {/* Department InputField */}
            <Box
              sx={{
                display: "flex",
                mt: 1.5,
                alignItems: "center",
                gap: 10,
                fontWeight: 400,
              }}
            >
              <Typography variant="subtitle1">Department</Typography>
              <Box width={558}>
                <StyledTextField fullWidth size="small" />
              </Box>
            </Box>
            {/* customer Owner */}
            <Box
              sx={{
                display: "flex",
                mt: 4,
                marginBottom: 3,

                alignItems: "center",
                gap: 5,
                fontWeight: 400,
              }}
            >
              <Typography variant="subtitle1">Customer Owner:</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography color="#939393" variant="caption">
                  Assign a user as the customer owner to provide access only to
                  the data of this customer.
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
            {/* Billing & shipping Address */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle1" fontSize={"1.2rem"}>
                Billing Address
              </Typography>
              <Box sx={{ display: "flex", paddingRight: 9, gap: 1.5 }}>
                <Typography variant="subtitle1" fontSize={"1.2rem"}>
                  Shipping Address
                </Typography>
                <Box component={Button} variant="text">
                  {" "}
                  (<img src={images.dollararrowicon} alt="" /> Copy billing
                  address){" "}
                </Box>
              </Box>
            </Box>
            {/* Attention input Field */}
            <Box display={"flex"} justifyContent={"space-between"} mt={2}>
              <Box display={"flex"} gap={11} alignItems={"center"}>
                <Typography variant="subtitle1">Attention</Typography>
                <StyledTextField size="small"></StyledTextField>
              </Box>
              <Box
                display={"flex"}
                gap={12.6}
                paddingRight={8}
                alignItems={"center"}
              >
                <Typography variant="subtitle1">Attention</Typography>
                <StyledTextField size="small"></StyledTextField>
              </Box>
            </Box>
            {/* Country/Region Input Field */}
            <Box display={"flex"} justifyContent={"space-between"} mt={1.5}>
              <Box display={"flex"} gap={5} alignItems={"center"}>
                <Typography variant="subtitle1">Country/Region</Typography>
                <Autocomplete
                  size="small"
                  {...countryRegionName}
                  id="countryRegionName"
                  disableClearable
                  renderInput={(params) => (
                    <StyledTextField
                      sx={{ width: 210 }}
                      size="small"
                      placeholder="Select"
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Box>
              <Box
                display={"flex"}
                gap={7}
                paddingRight={8}
                alignItems={"center"}
              >
                <Typography variant="subtitle1">Country/Region</Typography>
                <Autocomplete
                  size="small"
                  {...countryRegionName}
                  id="countryRegionName"
                  disableClearable
                  renderInput={(params) => (
                    <StyledTextField
                      sx={{ width: 210 }}
                      size="small"
                      placeholder="Select"
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </Box>
            {/* Address InputField */}
            <Box display={"flex"} justifyContent={"space-between"} mt={1.5}>
              <Box display={"flex"} gap={11.5} alignItems={"center"}>
                <Typography variant="subtitle1">Address</Typography>
                <StyledTextField
                  multiline
                  rows={2}
                  size="small"
                  sx={{ width: 210, padding: 0 }}
                />
              </Box>
              <Box
                display={"flex"}
                gap={13.7}
                paddingRight={8}
                alignItems={"center"}
              >
                <Typography variant="subtitle1">Address</Typography>
                <StyledTextField
                  multiline
                  rows={2}
                  size="small"
                  sx={{ width: 210, padding: 0 }}
                />
              </Box>
            </Box>
            {/*City Input Field  */}
            <Box display={"flex"} justifyContent={"space-between"} mt={2}>
              <Box display={"flex"} gap={15.5} alignItems={"center"}>
                <Typography variant="subtitle1">City</Typography>
                <StyledTextField type="text" size="small"></StyledTextField>
              </Box>
              <Box
                display={"flex"}
                gap={18}
                paddingRight={8}
                alignItems={"center"}
              >
                <Typography variant="subtitle1">City</Typography>
                <StyledTextField type="text" size="small"></StyledTextField>
              </Box>
            </Box>
            {/* State Input Field */}
            <Box display={"flex"} justifyContent={"space-between"} mt={1.5}>
              <Box display={"flex"} gap={14} alignItems={"center"}>
                <Typography variant="subtitle1">State</Typography>
                <Autocomplete
                  size="small"
                  {...stateName}
                  id="stateName"
                  disableClearable
                  renderInput={(params) => (
                    <StyledTextField
                      sx={{ width: 210 }}
                      size="small"
                      placeholder="Select State"
                      {...params}
                      variant="outlined"
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
                  id="stateName"
                  disableClearable
                  renderInput={(params) => (
                    <StyledTextField
                      sx={{ width: 210 }}
                      size="small"
                      placeholder="Select State"
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </Box>
            {/* pinCode input Field */}
            <Box display={"flex"} justifyContent={"space-between"} mt={2}>
              <Box display={"flex"} gap={10.5} alignItems={"center"}>
                <Typography variant="subtitle1">Pin Code</Typography>
                <StyledTextField type="number" size="small"></StyledTextField>
              </Box>
              <Box
                display={"flex"}
                gap={13.6}
                paddingRight={8}
                alignItems={"center"}
              >
                <Typography variant="subtitle1">Pin Code</Typography>
                <StyledTextField type="number" size="small"></StyledTextField>
              </Box>
            </Box>
            {/* phone Input Field */}
            <Box display={"flex"} justifyContent={"space-between"} mt={2}>
              <Box display={"flex"} gap={13} alignItems={"center"}>
                <Typography variant="subtitle1">Phone</Typography>
                <StyledTextField type="number" size="small"></StyledTextField>
              </Box>
              <Box
                display={"flex"}
                gap={16.3}
                paddingRight={8}
                alignItems={"center"}
              >
                <Typography variant="subtitle1">Phone</Typography>
                <StyledTextField type="number" size="small"></StyledTextField>
              </Box>
            </Box>
            {/* Fax Number Input Field */}
            <Box display={"flex"} justifyContent={"space-between"} mt={2}>
              <Box display={"flex"} gap={7.7} alignItems={"center"}>
                <Typography variant="subtitle1">Fax Number</Typography>
                <StyledTextField type="number" size="small"></StyledTextField>
              </Box>
              <Box
                display={"flex"}
                gap={11.4}
                paddingRight={8}
                alignItems={"center"}
              >
                <Typography variant="subtitle1">Fax Number</Typography>
                <StyledTextField type="number" size="small"></StyledTextField>
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
                {/* dot icon on css */}
                <Typography variant="body2">
                  View and edit the address format of your transactions under
                  Settings &gt; Preferences &gt; Customers.
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
                overflowX: "hidden",
              }}
            >
              <Table>
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
                      <TableCell align="center">{row.emailAddress}</TableCell>
                      <TableCell align="center">{row.workPhone}</TableCell>
                      <TableCell align="center">{row.mobilePhone}</TableCell>
                      <TableCell align="center">{row.designation}</TableCell>
                      <TableCell align="center">{row.department}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box marginBottom={2} marginTop={3}>
              <Typography
                variant="subtitle1"
                component={Button}
                sx={{ color: "#5BC4FA", fontSize: "0.95rem" }}
              >
                + Add Contact Person
              </Typography>
            </Box>
          </Box>
        )} 

        {tabsValue === 3 && (
          <Box padding={6}>
            <Box
              display={"flex"}
              gap={1}
              alignItems={"center"}
              marginBottom={2}
            >
              <Typography variant="subtitle1">Remarks</Typography>
              <Typography variant="body2" component={"span"} color={"#939393"}>
                (For Internal Use)
              </Typography>
            </Box>
            <Box>
              <StyledTextField multiline rows={2.5} size="small" fullWidth />
            </Box>
          </Box>
        )}
        </>)}

        {/* footerButtons */}
        <Box sx={{ display: "flex", p: 2, boxShadow: "2px -1px 2px #00000040" }}>
          <Button
            variant="contained"
            sx={{ marginRight: 2, backgroundColor: "#5BC4FA" }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#F3F3F3",
              color: "black",
              borderColor: "#A7A7A7",
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewCustomer;
