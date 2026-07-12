import React, { useContext, useEffect } from "react";
import { Building2, CheckCircle, Clock3, CalendarCheck } from "lucide-react";
import { PropertyContext } from "../../context/PropertyContext";
import { BookingContext } from "../../context/BookingContext";
import Loader from "../../common/Loader";


export default function DashboardOwner() {
  // Property Context
  const {
    properties,
    loading: propertyLoading,
    getProperties,
  } = useContext(PropertyContext);

  // Booking Context
  const {
    bookings,
    loading: bookingLoading,
    ownerBookings,
  } = useContext(BookingContext);

  // Fetch data when dashboard loads
  useEffect(() => {
    getProperties();
    ownerBookings();
  }, []);

  // Loader
  if (propertyLoading || bookingLoading) {
    return <Loader />;
  }

  // Make sure data is always an array
  const propertyList = Array.isArray(properties) ? properties : [];

  const bookingList = Array.isArray(bookings) ? bookings : [];

  // Property Statistics
  const totalProperties = propertyList.length;

  const activeListings = propertyList.filter(
    (property) => property.status?.toLowerCase() === "approved",
  ).length;

  const pendingProperties = propertyList.filter(
    (property) => property.status?.toLowerCase() === "pending",
  ).length;

  const totalBookings = bookingList.length;

  // Statistics Cards
  const stats = [
    {
      title: "My Properties",
      value: totalProperties,
      icon: <Building2 size={26} />,
      style: "bg-stone-100 text-stone-700",
    },
    {
      title: "Active Listings",
      value: activeListings,
      icon: <CheckCircle size={26} />,
      style: "bg-green-50 text-green-700",
    },
    {
      title: "Pending Approval",
      value: pendingProperties,
      icon: <Clock3 size={26} />,
      style: "bg-amber-50 text-amber-700",
    },
    {
      title: "Bookings",
      value: totalBookings,
      icon: <CalendarCheck size={26} />,
      style: "bg-stone-100 text-stone-700",
    },
  ];

  // Latest 5 bookings
  const recentBookings = [...bookingList]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-6 lg:p-8">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Owner Dashboard</h1>

        <p className="text-stone-500 mt-1">
          Manage your properties and track booking requests.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl border border-stone-200 p-6 flex items-center justify-between hover:shadow-md transition"
          >
            <div>
              <p className="text-sm text-stone-500">{item.title}</p>

              <h2 className="text-3xl font-bold text-stone-900 mt-2">
                {item.value}
              </h2>
            </div>

            <div className={`${item.style} p-4 rounded-2xl`}>{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm mt-8 overflow-hidden">
        {/* Section Header */}

        <div className="px-6 py-5 border-b border-stone-200">
          <h2 className="text-xl font-semibold text-stone-900">
            Recent Bookings
          </h2>

          <p className="text-sm text-stone-500 mt-1">
            Latest booking requests for your properties.
          </p>
        </div>

        {/* Booking List */}

        {recentBookings.length > 0 ? (
          <div className="divide-y divide-stone-100">
            {recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between hover:bg-stone-50 transition"
              >
                {/* Booking Information */}

                <div>
                  <h3 className="font-semibold text-stone-900">
                    {booking.property?.title || "Property"}
                  </h3>

                  <p className="text-sm text-stone-500 mt-1">
                    Buyer: {booking.buyer?.name || "Unknown Buyer"}
                  </p>

                  {/* Visit Date */}

                  {booking.visitDate && (
                    <p className="text-xs text-stone-400 mt-1">
                      Visit:{" "}
                      {new Date(booking.visitDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}

                  {/* Booking Created Date */}

                  {booking.createdAt && (
                    <p className="text-xs text-stone-400 mt-1">
                      Requested:{" "}
                      {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>

                {/* Status */}

                <span
                  className={`w-fit px-3 py-1.5 rounded-full text-xs font-medium capitalize
                  ${
                    booking.status?.toLowerCase() === "approved"
                      ? "bg-green-100 text-green-700"
                      : booking.status?.toLowerCase() === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {booking.status || "Pending"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */

          <div className="py-16 text-center">
            <CalendarCheck size={42} className="mx-auto text-stone-300" />

            <h3 className="text-lg font-semibold text-stone-800 mt-4">
              No bookings yet
            </h3>

            <p className="text-sm text-stone-500 mt-1">
              Booking requests for your properties will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
