import React from "react";
import LoginScreen from "./pages/LoginScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import { useSelector } from "react-redux";
import OtpScreen from "./pages/OtpScreen";
import SignUp from "./pages/SignUp";
import VerifyScreen from "./pages/VerifyScreen";
import DashboardScreen from "./pages/DashboardScreen";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Customer from "./pages/Customer";
import WrapComponent from "./pages/WrapComponent";
import Category from "./pages/Category";
import NewCustomer from "./pages/customerscreens/NewCustomer";

const App = () => {
  const { user } = useSelector((e) => e.userReducer);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<WrapComponent />}>
            <Route path="/dashboardscreen" element={<DashboardScreen />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/category" element={<Category />} />
            <Route path="/newcustomer" element={<NewCustomer />} />
            
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
