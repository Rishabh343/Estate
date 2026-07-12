import React from "react";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import MainLayout from "./components/layout/mainlayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Dashboard from "./components/pages/Buyer/Dashboard";
import DashboardOwner from "./components/pages/Owner/DashboardOwner";
import DashboardAdmin from "./components/pages/Admin/DashboardAdmin";
import UsersAdmin from "./components/pages/Admin/UsersAdmin";
import PropertyApprovalAdmin from "./components/pages/Admin/PropertyApprovalAdmin";
import PropertiesAdmin from "./components/pages/Admin/PropertiesAdmin";
import MyProfileAdmin from "./components/pages/Admin/MyProfileAdmin";
import BookingsOwner from "./components/pages/Owner/BookingsOwner";
import MyPropertiesOwner from "./components/pages/Owner/MyPropertiesOwner";
import MyProfileOwner from "./components/pages/Owner/MyProfileOwner";
import Favorites from "./components/pages/Buyer/Favorites";
import MyBookings from "./components/pages/Buyer/MyBookings";
import MyProfile from "./components/pages/Buyer/MyProfile";
import Properties from "./components/pages/Buyer/Properties";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<MainLayout />}>
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/profile" element={<MyProfileAdmin />} />
          <Route path="/admin/properties" element={<PropertiesAdmin />} />
          <Route path="/admin/approval" element={<PropertyApprovalAdmin />} />
          <Route path="/admin/users" element={<UsersAdmin />} />
          {/* Owner Routes */}
          <Route path="/owner/dashboard" element={<DashboardOwner />} />
          <Route path="/owner/bookings" element={<BookingsOwner />} />
          <Route path="/owner/properties" element={<MyPropertiesOwner />} />
          <Route path="/owner/profile" element={<MyProfileOwner />} />
          {/* Buyer routes */}
       
          <Route path="/buyer/favorites" element={<Favorites />} />
          <Route path="/buyer/bookings" element={<MyBookings />} />
          <Route path="/buyer/profile" element={<MyProfile />} />
           <Route path="/buyer/properties" element={<Properties />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
