import React from "react";
import LoginScreen from "./pages/LoginScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import { useSelector } from "react-redux";
import OtpScreen from "./pages/OtpScreen";
import SignUp from "./pages/SignUp";
import VerifyScreen from "./pages/VerifyScreen";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Customer from "./pages/Customer";
import WrapComponent from "./pages/WrapComponent";
import Category from "./pages/Category";
import NewCustomer from "./pages/Newcustomerscreens/NewCustomer";
import Invoice from "./pages/Invoice";
import NewInvoice from "./pages/NewInvoicescreens/NewInvoice";
import InvoicePaymentTable from "./components/Tables/InvoicePaymentTable";
import Items from "./pages/Items";
import Banking from "./pages/Banking";
import NewItems from "./pages/NewItemsScreen/NewItems";
import AddManually from "./pages/AddManually";
import TimeSheet from "./pages/TimeSheet";
import Employee from "./pages/Employee";

const App = () => {
  const { user } = useSelector((e) => e.userReducer);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<WrapComponent />}>
            <Route path="/home" element={<Home />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/category" element={<Category />} />
            <Route path="/newcustomer" element={<NewCustomer />} />        
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/newinvoice" element={<NewInvoice />} />
            <Route path="/items" element={<Items />} />
            <Route path="/banking" element={<Banking />} />
            <Route path="/newitems" element={<NewItems />} />
            <Route path="/addmanually" element={<AddManually />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/timesheet" element={<TimeSheet />} />

            
          </Route>
          <Route
            path="/"
            element={<Navigate to={user ? "/signin" : "/LoginScreen"} />}
          />
          <Route
            path="/signin"
            element={user ? <Navigate to={"/dashboardscreen"} /> : <Signin />}
          />
          <Route path="/loginscreen" element={<LoginScreen />} />
          <Route path="/otpscreen" element={<OtpScreen />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyscreen" element={<VerifyScreen />} />
          <Route path="/invoicepaymenttable" element={<InvoicePaymentTable />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
