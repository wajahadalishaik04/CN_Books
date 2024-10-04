import { BorderColor, CloudUpload } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  styled,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";

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
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  

  // menu Tabs section
  const [tabsValue, setTabsValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box padding={3}>
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
        </Box>
        {/* Tab Section */}
        <Tabs
          sx={{ borderBottom: "3px solid #EFEFEF" }}
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
                gap: 6.5,
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
                mt: 1,
                alignItems: "center",
                gap: 6.5,
                fontWeight: 400,
              }}
            >
              <Typography variant="subtitle1">Documents </Typography>
              <Box width={558}>
                <Button
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
              </Box>
            </Box>
          </Box>
        )}
        {tabsValue === 1 && (
          <Box sx={{ padding: 2 }}>
            {/* GST Treatment */}

            {/* Add other fields in the same manner */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NewCustomer;
