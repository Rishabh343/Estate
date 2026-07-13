import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Building2,
  BadgeCheck,
  CalendarCheck,
  Heart,
  User,
  LogOut,
  LogIn,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  // ================= ADMIN MENU =================

  const adminMenu = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: <Users size={18} />,
    },
    {
      title: "Properties",
      path: "/admin/properties",
      icon: <Building2 size={18} />,
    },
    {
      title: "Approval",
      path: "/admin/approval",
      icon: <BadgeCheck size={18} />,
    },
    {
      title: "Profile",
      path: "/admin/profile",
      icon: <User size={18} />,
    },
  ];

  // ================= OWNER MENU =================

  const ownerMenu = [
    {
      title: "Dashboard",
      path: "/owner/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      title: "Properties",
      path: "/owner/properties",
      icon: <Building2 size={18} />,
    },
    {
      title: "Bookings",
      path: "/owner/bookings",
      icon: <CalendarCheck size={18} />,
    },
    {
      title: "Profile",
      path: "/owner/profile",
      icon: <User size={18} />,
    },
  ];

  // ================= BUYER LOGGED-IN MENU =================

  const buyerMenu = [
    {
      title: "Properties",
      path: "/buyer/properties",
      icon: <Building2 size={18} />,
    },
    {
      title: "Favorites",
      path: "/buyer/favorites",
      icon: <Heart size={18} />,
    },
    {
      title: "Bookings",
      path: "/buyer/bookings",
      icon: <CalendarCheck size={18} />,
    },
    {
      title: "Profile",
      path: "/buyer/profile",
      icon: <User size={18} />,
    },
  ];

  // ================= GUEST MENU =================

  const guestMenu = [
    {
      title: "Properties",
      path: "/buyer/properties",
      icon: <Building2 size={18} />,
    },
  ];

  // ================= ROLE BASED MENU =================

  let menu = guestMenu;

  if (isLoggedIn) {
    if (role === "admin") {
      menu = adminMenu;
    } else if (role === "owner") {
      menu = ownerMenu;
    } else if (role === "buyer") {
      menu = buyerMenu;
    }
  }

  // ================= HOME PATH =================

  const getHomePath = () => {
    if (!isLoggedIn) {
      return "/buyer/properties";
    }

    if (role === "admin") {
      return "/admin/dashboard";
    }

    if (role === "owner") {
      return "/owner/dashboard";
    }

    return "/buyer/properties";
  };

  // ================= LOGOUT =================

  const logoutHandler = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");

    setMobileMenuOpen(false);

    // Stay on public property page after logout
    navigate("/buyer/properties");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md">
      {/* Main Navbar */}

      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}

        <NavLink
          to={getHomePath()}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-white">
            <Building2 size={19} />
          </div>

          <span className="text-xl font-semibold tracking-tight text-stone-900">
            Estate
          </span>
        </NavLink>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-1 md:flex">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-stone-900 text-white"
                      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                  }
                `
              }
            >
              {item.icon}

              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth Button */}

        <div className="hidden md:flex">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={logoutHandler}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-stone-200
                px-4
                py-2
                text-sm
                font-medium
                text-stone-700
                transition
                hover:border-red-200
                hover:bg-red-50
                hover:text-red-600
              "
            >
              <LogOut size={17} />
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-stone-900
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-stone-800
              "
            >
              <LogIn size={17} />
              Sign In
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger */}

        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen((prev) => !prev)
          }
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            text-stone-700
            transition
            hover:bg-stone-100
            md:hidden
          "
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}

      <div
        className={`
          overflow-hidden
          border-stone-200
          bg-white
          transition-all
          duration-300
          md:hidden
          ${
            mobileMenuOpen
              ? "max-h-[500px] border-t opacity-100"
              : "max-h-0 border-t-0 opacity-0"
          }
        `}
      >
        <nav className="flex flex-col gap-1 p-4">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className={({ isActive }) =>
                `
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition
                  ${
                    isActive
                      ? "bg-stone-900 text-white"
                      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                  }
                `
              }
            >
              {item.icon}

              <span>{item.title}</span>
            </NavLink>
          ))}

          <div className="my-2 h-px bg-stone-200" />

          {/* Mobile Login / Logout */}

          {isLoggedIn ? (
            <button
              type="button"
              onClick={logoutHandler}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-left
                text-sm
                font-medium
                text-red-600
                transition
                hover:bg-red-50
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                bg-stone-900
                px-4
                py-3
                text-sm
                font-medium
                text-white
              "
            >
              <LogIn size={18} />
              Sign In
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}