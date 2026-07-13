import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";

import DashboardAdmin from "./components/pages/Admin/DashboardAdmin";
import UsersAdmin from "./components/pages/Admin/UsersAdmin";
import PropertyApprovalAdmin from "./components/pages/Admin/PropertyApprovalAdmin";
import PropertiesAdmin from "./components/pages/Admin/PropertiesAdmin";
import MyProfileAdmin from "./components/pages/Admin/MyProfileAdmin";

import DashboardOwner from "./components/pages/Owner/DashboardOwner";
import BookingsOwner from "./components/pages/Owner/BookingsOwner";
import MyPropertiesOwner from "./components/pages/Owner/MyPropertiesOwner";
import MyProfileOwner from "./components/pages/Owner/MyProfileOwner";

import Favorites from "./components/pages/Buyer/Favorites";
import MyBookings from "./components/pages/Buyer/MyBookings";
import MyProfile from "./components/pages/Buyer/MyProfile";
import Properties from "./components/pages/Buyer/Properties";
import ProtectedRoute from "./components/common/ProtectedRoutes";
import MainLayout from "./components/layout/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/buyer/properties" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route element={<MainLayout />}>
          <Route path="/buyer/properties" element={<Properties />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRole="admin">
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute allowedRole="admin">
                <MyProfileAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/properties"
            element={
              <ProtectedRoute allowedRole="admin">
                <PropertiesAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/approval"
            element={
              <ProtectedRoute allowedRole="admin">
                <PropertyApprovalAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRole="admin">
                <UsersAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/dashboard"
            element={
              <ProtectedRoute allowedRole="owner">
                <DashboardOwner />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/bookings"
            element={
              <ProtectedRoute allowedRole="owner">
                <BookingsOwner />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/properties"
            element={
              <ProtectedRoute allowedRole="owner">
                <MyPropertiesOwner />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/profile"
            element={
              <ProtectedRoute allowedRole="owner">
                <MyProfileOwner />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/favorites"
            element={
              <ProtectedRoute allowedRole="buyer">
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/bookings"
            element={
              <ProtectedRoute allowedRole="buyer">
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/profile"
            element={
              <ProtectedRoute allowedRole="buyer">
                <MyProfile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/buyer/properties" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
