import React from "react";
import { Link } from "react-router-dom";
import {

  Building2,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,

} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300">
      {/* Main Footer */}

      <div className="mx-auto max-w-[1500px] px-6 py-12 md:px-10 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}

          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/buyer/properties"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-stone-950">
                <Building2 size={20} />
              </div>

              <span className="text-2xl font-semibold tracking-tight text-white">
                Estate
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-stone-400">
              Discover exceptional properties, connect with trusted owners,
              and find a place that truly feels like home.
            </p>

            {/* Social Icons */}

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-800 transition hover:border-stone-600 hover:bg-white hover:text-stone-950"
              >
                 <FaInstagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-800 transition hover:border-stone-600 hover:bg-white hover:text-stone-950"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-800 transition hover:border-stone-600 hover:bg-white hover:text-stone-950"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Explore */}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm">
              <Link
                to="/buyer/properties"
                className="w-fit transition hover:text-white"
              >
                Browse Properties
              </Link>

              <Link
                to="/buyer/favorites"
                className="w-fit transition hover:text-white"
              >
                Favorites
              </Link>

              <Link
                to="/buyer/bookings"
                className="w-fit transition hover:text-white"
              >
                My Bookings
              </Link>

              <Link
                to="/buyer/profile"
                className="w-fit transition hover:text-white"
              >
                My Profile
              </Link>
            </div>
          </div>

          {/* Account */}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Account
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm">
              <Link
                to="/login"
                className="w-fit transition hover:text-white"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="w-fit transition hover:text-white"
              >
                Create Account
              </Link>

              <Link
                to="/signup"
                className="group flex w-fit items-center gap-1 transition hover:text-white"
              >
                List Your Property

                <ArrowUpRight
                  size={14}
                  className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Contact
            </h3>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-stone-500"
                />

                <span className="leading-6">
                  India
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={17}
                  className="shrink-0 text-stone-500"
                />

                <span>support@estate.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={17}
                  className="shrink-0 text-stone-500"
                />

                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-12 flex flex-col gap-4 border-t border-stone-800 pt-6 text-xs text-stone-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Estate. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <button className="transition hover:text-stone-300">
              Privacy Policy
            </button>

            <button className="transition hover:text-stone-300">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}