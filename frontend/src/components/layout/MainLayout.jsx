import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />

      <main className="min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}
