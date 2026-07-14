import React, { useContext, useEffect } from "react";
import { Users, Building2, BadgeCheck, CalendarCheck } from "lucide-react";
import { UserContext } from "../../context/userContext";
import { PropertyContext } from "../../context/PropertyContext";
import Loader from "../../common/Loader";
import { BookingContext } from "../../context/BookingContext";

export default function DashboardAdmin() {
  // User Context

  const { users, loading: userLoading, getAllProfile } = useContext(UserContext);

  // Property Context

  const {
    properties,
    loading: propertyLoading,
    getProperties,
  } = useContext(PropertyContext);

  // Booking Context

  const { bookings, loading: bookingLoading } = useContext(BookingContext);

  // Fetch Admin Dashboard Data

  useEffect(() => {
    getAllProfile();
    getProperties();
  }, []);

  // Loader

  if (userLoading || propertyLoading || bookingLoading) {
    return <Loader />;
  }

  // Safe Arrays

  const userList = Array.isArray(users) ? users : [];

  const propertyList = Array.isArray(properties) ? properties : [];

  const bookingList = Array.isArray(bookings) ? bookings : [];

  // Statistics

  const totalUsers = userList.length;

  const totalProperties = propertyList.length;

  const pendingApprovals = propertyList.filter(
    (property) => property.status?.toLowerCase() === "pending",
  ).length;

  const totalBookings = bookingList.length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <Users size={26} />,
      style: "bg-stone-100 text-stone-700",
    },
    {
      title: "Total Properties",
      value: totalProperties,
      icon: <Building2 size={26} />,
      style: "bg-green-50 text-green-700",
    },
    {
      title: "Pending Approvals",
      value: pendingApprovals,
      icon: <BadgeCheck size={26} />,
      style: "bg-amber-50 text-amber-700",
    },
    {
      title: "Bookings",
      value: totalBookings,
      icon: <CalendarCheck size={26} />,
      style: "bg-stone-100 text-stone-700",
    },
  ];

  // Recent Users

  const recentUsers = [...userList]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  //
  // Recent Properties
  //

  const recentProperties = [...propertyList]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-6 lg:p-8">
      {/* 
          Header
      */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Admin Dashboard</h1>

        <p className="text-stone-500 mt-1">
          Overview of users, properties and bookings.
        </p>
      </div>

      {/* 
          Statistics
     */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className="
              bg-white
              rounded-2xl
              border
              border-stone-200
              p-6
              flex
              items-center
              justify-between
              hover:shadow-md
              transition
            "
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

      {/*
          Bottom Section
     */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        {/*
            Recent Users
     */}

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          {/* Header */}

          <div className="px-6 py-5 border-b border-stone-200">
            <h2 className="text-xl font-semibold text-stone-900">
              Recent Users
            </h2>

            <p className="text-sm text-stone-500 mt-1">
              Recently registered users.
            </p>
          </div>

          {/* Users */}

          {recentUsers.length > 0 ? (
            <div className="divide-y divide-stone-100">
              {recentUsers.map((item) => (
                <div
                  key={item._id}
                  className="p-5 flex items-center justify-between hover:bg-stone-50 transition"
                >
                  <div className="flex items-center gap-4">
                    {/* Profile Image */}

                    {item.profileImage ? (
                      <img
                        src={item.profileImage}
                        alt={item.name}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-stone-200 flex items-center justify-center font-semibold text-stone-600">
                        {item.name?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* User Info */}

                    <div>
                      <h3 className="font-medium text-stone-900">
                        {item.name || "Unknown User"}
                      </h3>

                      <p className="text-sm text-stone-500">{item.email}</p>
                    </div>
                  </div>

                  {/* Role */}

                  <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-medium capitalize">
                    {item.role || "User"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-14 text-center">
              <Users size={40} className="mx-auto text-stone-300" />

              <p className="text-stone-500 mt-3">No users found.</p>
            </div>
          )}
        </div>

        {/* Recent Properties */}

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          {/* Header */}

          <div className="px-6 py-5 border-b border-stone-200">
            <h2 className="text-xl font-semibold text-stone-900">
              Recent Properties
            </h2>

            <p className="text-sm text-stone-500 mt-1">
              Recently added property listings.
            </p>
          </div>

          {/* Properties */}

          {recentProperties.length > 0 ? (
            <div className="divide-y divide-stone-100">
              {recentProperties.map((property) => (
                <div
                  key={property._id}
                  className="p-5 flex items-center justify-between gap-4 hover:bg-stone-50 transition"
                >
                  {/* Property Information */}

                  <div className="flex items-center gap-4 min-w-0">
                    {/* Property Image */}

                    {property.images?.[0] ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                        <Building2 size={22} className="text-stone-400" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="font-medium text-stone-900 truncate">
                        {property.title}
                      </h3>

                      <p className="text-sm text-stone-500 mt-1">
                        {property.city}
                        {property.state && `, ${property.state}`}
                      </p>
                    </div>
                  </div>

                  {/* Status */}

                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium capitalize
                    ${
                      property.status?.toLowerCase() === "approved"
                        ? "bg-green-100 text-green-700"
                        : property.status?.toLowerCase() === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {property.status || "Pending"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-14 text-center">
              <Building2 size={40} className="mx-auto text-stone-300" />

              <p className="text-stone-500 mt-3">No properties found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
