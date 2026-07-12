import React, { useContext, useEffect, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  Users,
  X,
  Mail,
  Phone,
  UserRound,
  MapPin,
} from "lucide-react";
import { UserContext } from "../../context/userContext";
import Loader from "../../common/Loader";

export default function UsersAdmin() {
  const { users, loading, getAllProfile, deleteUser, searchUser, filterUser } =
    useContext(UserContext);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  // Get All Users

  useEffect(() => {
    getAllProfile();
  }, []);

  // Search User

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      getAllProfile();
    } else {
      searchUser(value);
    }
  };

  // Filter User

  const handleFilter = (e) => {
    const role = e.target.value;

    setRoleFilter(role);

    if (role === "All") {
      getAllProfile();
    } else {
      // Use lowercase if backend stores:
      // admin, owner, buyer
      filterUser(role.toLowerCase());
    }
  };

  // Delete User

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      alert("User deleted successfully.");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete user.");
    }
  };

  // Safe User Array

  const userList = Array.isArray(users) ? users : [];

  // Loader

  if (loading && userList.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-6 lg:p-8">
      {/* 
          Heading
      */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">User Management</h1>

        <p className="text-stone-500 mt-1">
          Manage buyers, property owners and administrators.
        </p>
      </div>

      {/* 
          Search & Filter
      */}

      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}

        <div className="flex items-center gap-3 border border-stone-200 rounded-xl px-4 flex-1 focus-within:border-stone-500 transition">
          <Search size={19} className="text-stone-400 shrink-0" />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={handleSearch}
            className="w-full py-3 outline-none bg-transparent"
          />
        </div>

        {/* Role Filter */}

        <select
          value={roleFilter}
          onChange={handleFilter}
          className="border border-stone-200 rounded-xl px-4 py-3 bg-white outline-none cursor-pointer"
        >
          <option value="All">All Roles</option>

          <option value="Admin">Admin</option>

          <option value="Owner">Owner</option>

          <option value="Buyer">Buyer</option>
        </select>
      </div>

      {/*
          User Table
     */}

      {userList.length > 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-x-auto">
          <table className="w-full min-w-[850px]">
            {/* Table Header */}

            <thead className="bg-stone-900 text-white">
              <tr>
                <th className="text-left p-4 font-medium">User</th>

                <th className="text-left p-4 font-medium">Email</th>

                <th className="text-left p-4 font-medium">Phone</th>

                <th className="text-left p-4 font-medium">Role</th>

                <th className="text-center p-4 font-medium">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}

            <tbody>
              {userList.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-stone-100 hover:bg-stone-50 transition"
                >
                  {/* User */}

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {item.profileImage ? (
                        <img
                          src={item.profileImage}
                          alt={item.name}
                          className="w-11 h-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-stone-200 flex items-center justify-center font-semibold text-stone-600">
                          {item.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}

                      <div>
                        <p className="font-medium text-stone-900">
                          {item.name || "Unknown User"}
                        </p>

                        <p className="text-xs text-stone-500 mt-1">
                          ID: {item._id?.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}

                  <td className="p-4 text-stone-600">
                    {item.email || "Not available"}
                  </td>

                  {/* Phone */}

                  <td className="p-4 text-stone-600">
                    {item.phone || "Not available"}
                  </td>

                  {/* Role */}

                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize
                      ${
                        item.role?.toLowerCase() === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : item.role?.toLowerCase() === "owner"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.role || "User"}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      {/* View */}

                      <button
                        onClick={() => setSelectedUser(item)}
                        className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 transition"
                        title="View User"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Delete */}

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* 
            Empty State
       */

        <div className="bg-white border border-stone-200 rounded-2xl py-20 text-center">
          <Users size={48} className="mx-auto text-stone-300" />

          <h2 className="text-xl font-semibold text-stone-800 mt-4">
            No Users Found
          </h2>

          <p className="text-stone-500 mt-2">
            {search || roleFilter !== "All"
              ? "No users match your current search or filter."
              : "There are currently no registered users."}
          </p>
        </div>
      )}

      {/* 
          View User Modal
     */}

      {selectedUser && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}

            <div className="h-32 bg-stone-200 relative">
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm hover:bg-stone-100 transition"
              >
                <X size={19} />
              </button>
            </div>

            {/* Profile */}

            <div className="px-6 md:px-8 pb-8">
              <div className="-mt-14">
                {selectedUser.profileImage ? (
                  <img
                    src={selectedUser.profileImage}
                    alt={selectedUser.name}
                    className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full border-4 border-white bg-stone-900 text-white flex items-center justify-center text-4xl font-semibold shadow-md">
                    {selectedUser.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>

              {/* Name */}

              <div className="mt-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900">
                      {selectedUser.name || "Unknown User"}
                    </h2>

                    <p className="text-stone-500 capitalize mt-1">
                      {selectedUser.role || "User"}
                    </p>
                  </div>

                  <span className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm capitalize">
                    {selectedUser.role || "User"}
                  </span>
                </div>
              </div>

              {/* User Details */}

              <div className="space-y-3 mt-7">
                {/* Email */}

                <div className="flex items-center gap-4 bg-stone-50 rounded-xl p-4">
                  <Mail size={20} className="text-stone-500" />

                  <div>
                    <p className="text-xs text-stone-500">Email</p>

                    <p className="font-medium text-stone-800">
                      {selectedUser.email || "Not available"}
                    </p>
                  </div>
                </div>

                {/* Phone */}

                <div className="flex items-center gap-4 bg-stone-50 rounded-xl p-4">
                  <Phone size={20} className="text-stone-500" />

                  <div>
                    <p className="text-xs text-stone-500">Phone</p>

                    <p className="font-medium text-stone-800">
                      {selectedUser.phone || "Not available"}
                    </p>
                  </div>
                </div>

                {/* Role */}

                <div className="flex items-center gap-4 bg-stone-50 rounded-xl p-4">
                  <UserRound size={20} className="text-stone-500" />

                  <div>
                    <p className="text-xs text-stone-500">Role</p>

                    <p className="font-medium text-stone-800 capitalize">
                      {selectedUser.role || "User"}
                    </p>
                  </div>
                </div>

                {/* Address */}

                {selectedUser.address && (
                  <div className="flex items-start gap-4 bg-stone-50 rounded-xl p-4">
                    <MapPin size={20} className="text-stone-500 mt-1" />

                    <div>
                      <p className="text-xs text-stone-500">Address</p>

                      <p className="font-medium text-stone-800">
                        {selectedUser.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Close */}

              <button
                onClick={() => setSelectedUser(null)}
                className="w-full mt-7 bg-stone-900 text-white py-3 rounded-xl hover:bg-black transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
