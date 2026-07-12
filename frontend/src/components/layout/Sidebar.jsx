import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  Users,
  Building2,
  BadgeCheck,
  CalendarCheck,
  Heart,
  User,
  LogOut,
} from "lucide-react";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  open,
  setOpen,
}) {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const adminMenu = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={22} />,
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: <Users size={22} />,
    },
    {
      title: "Properties",
      path: "/admin/properties",
      icon: <Building2 size={22} />,
    },
    {
      title: "Approval",
      path: "/admin/approval",
      icon: <BadgeCheck size={22} />,
    },
    {
      title: "Profile",
      path: "/admin/profile",
      icon: <User size={22} />,
    },
  ];

  const ownerMenu = [
    {
      title: "Dashboard",
      path: "/owner/dashboard",
      icon: <LayoutDashboard size={22} />,
    },
    {
      title: "Properties",
      path: "/owner/properties",
      icon: <Building2 size={22} />,
    },
    {
      title: "Bookings",
      path: "/owner/bookings",
      icon: <CalendarCheck size={22} />,
    },
    {
      title: "Profile",
      path: "/owner/profile",
      icon: <User size={22} />,
    },
  ];

  const buyerMenu = [
    {
      title: "Properties",
      path: "/buyer/properties",
      icon: <Building2 size={22} />,
    },
    {
      title: "Favorites",
      path: "/buyer/favorites",
      icon: <Heart size={22} />,
    },
    {
      title: "Bookings",
      path: "/buyer/bookings",
      icon: <CalendarCheck size={22} />,
    },
    {
      title: "Profile",
      path: "/buyer/profile",
      icon: <User size={22} />,
    },
  ];

  const menus = {
    admin: adminMenu,
    owner: ownerMenu,
    buyer: buyerMenu,
  };

  const menu = menus[role] || [];

  const logoutHandler = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <aside
      className={`
        fixed md:fixed top-0 left-0 z-50
        h-screen bg-white border-r border-gray-200 shadow-sm
        transition-all duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
        ${open ? "w-64" : "w-20"}
      `}
    >
      {/* Header */}

      <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200">
        {open && (
          <h1 className="text-3xl font-semibold text-stone-800">
            Estate
          </h1>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Menu */}

      <nav className="mt-6 px-3 flex flex-col gap-2">
        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 768) {
                setSidebarOpen(false);
              }
            }}
            className={({ isActive }) =>
              `flex items-center h-12 rounded-xl transition-all duration-300
              ${
                open
                  ? "justify-start px-5"
                  : "justify-center"
              }
              ${
                isActive
                  ? "bg-stone-200 text-stone-900 font-semibold"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`
            }
          >
            {open ? item.title : item.icon}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}

      <div className="absolute bottom-5 left-0 w-full px-3">
        <button
          onClick={logoutHandler}
          className="w-full h-12 rounded-xl bg-stone-900 text-white hover:bg-black transition flex items-center justify-center"
        >
          {open ? "Logout" : <LogOut size={20} />}
        </button>
      </div>
    </aside>
  );
}