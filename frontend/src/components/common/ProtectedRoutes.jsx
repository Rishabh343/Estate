import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRole,
}) {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const role = localStorage.getItem("role");

  // Not logged in public Properties page
  if (!isLoggedIn) {
    return (
      <Navigate
        to="/buyer/properties"
        replace
      />
    );
  }

  // Logged in but wrong role
  if (allowedRole && role !== allowedRole) {
    if (role === "admin") {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }

    if (role === "owner") {
      return (
        <Navigate
          to="/owner/dashboard"
          replace
        />
      );
    }

    if (role === "buyer") {
      return (
        <Navigate
          to="/buyer/properties"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/buyer/properties"
        replace
      />
    );
  }

  return children;
}