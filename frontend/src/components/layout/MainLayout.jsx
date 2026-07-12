import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="flex relative">
        {/* Mobile Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* Main Content */}
        <main
          className={`flex-1 min-h-screen overflow-y-auto transition-all duration-300
          ${open ? "md:ml-64 ml-0" : "md:ml-20 ml-0"}`}
        >
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
