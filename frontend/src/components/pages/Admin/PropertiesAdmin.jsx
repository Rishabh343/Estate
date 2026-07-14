import React, {
  useContext,
  useState,
} from "react";

import {
  Search,
  Trash2,
  Eye,
  Building2,
  MapPin,
} from "lucide-react";

import { PropertyContext } from "../../context/PropertyContext";
import Loader from "../../common/Loader";
import Modal from "../../common/Modal";

export default function PropertiesAdmin() {
  const [search, setSearch] = useState("");

  const [selectedProperty, setSelectedProperty] =
    useState(null);

  const [isViewModalOpen, setIsViewModalOpen] =
    useState(false);

  const [activeImage, setActiveImage] =
    useState(0);

  const {
    properties,
    loading,
    searchProperty,
    resetProperties,
    deleteProperty,
  } = useContext(PropertyContext);

  // ================= SEARCH =================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      resetProperties();
    } else {
      searchProperty(value);
    }
  };

  // ================= VIEW PROPERTY =================

  const handleViewDetails = (property) => {
    setSelectedProperty(property);

    // Always start from first image
    setActiveImage(0);

    setIsViewModalOpen(true);
  };

  // ================= CLOSE MODAL =================

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setSelectedProperty(null);
    setActiveImage(0);
  };

  // ================= DELETE PROPERTY =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProperty(id);

      alert("Property deleted successfully.");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete property.",
      );
    }
  };

  // ================= SAFE PROPERTY LIST =================

  const propertyList = Array.isArray(properties)
    ? properties
    : [];

  // ================= LOADER =================

  if (loading && propertyList.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-6 lg:p-8">
      {/* ================= HEADER ================= */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">
          Properties
        </h1>

        <p className="mt-1 text-stone-500">
          Manage all listed properties.
        </p>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <Search
          size={20}
          className="shrink-0 text-stone-400"
        />

        <input
          type="text"
          placeholder="Search by property name, city..."
          value={search}
          onChange={handleSearch}
          className="w-full bg-transparent text-stone-800 outline-none placeholder:text-stone-400"
        />
      </div>

      {/* ================= TABLE ================= */}

      {propertyList.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full min-w-[900px]">
            {/* Table Header */}

            <thead className="bg-stone-900 text-white">
              <tr>
                <th className="p-4 text-left font-medium">
                  Property
                </th>

                <th className="p-4 text-left font-medium">
                  Owner
                </th>

                <th className="p-4 text-left font-medium">
                  City
                </th>

                <th className="p-4 text-left font-medium">
                  Price
                </th>

                <th className="p-4 text-left font-medium">
                  Status
                </th>

                <th className="p-4 text-center font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}

            <tbody>
              {propertyList.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-stone-100 transition hover:bg-stone-50"
                >
                  {/* Property */}

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {item.images?.[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="h-14 w-14 shrink-0 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-stone-100">
                          <Building2
                            size={22}
                            className="text-stone-400"
                          />
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-stone-900">
                          {item.title ||
                            "Untitled Property"}
                        </p>

                        <p className="mt-1 text-xs capitalize text-stone-500">
                          {item.propertyType ||
                            "Property"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Owner */}

                  <td className="p-4">
                    <div>
                      <p className="font-medium text-stone-800">
                        {item.owner?.name ||
                          "Unknown Owner"}
                      </p>

                      {item.owner?.email && (
                        <p className="mt-1 text-xs text-stone-500">
                          {item.owner.email}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* City */}

                  <td className="p-4 text-stone-600">
                    {item.city ||
                      "Not available"}
                  </td>

                  {/* Price */}

                  <td className="p-4 font-medium text-stone-800">
                    ₹
                    {Number(
                      item.price || 0,
                    ).toLocaleString("en-IN")}
                  </td>

                  {/* Status */}

                  <td className="p-4">
                    <span
                      className={`
                        inline-block
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        capitalize
                        ${
                          item.status?.toLowerCase() ===
                          "approved"
                            ? "bg-green-100 text-green-700"
                            : item.status?.toLowerCase() ===
                                "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }
                      `}
                    >
                      {item.status || "Pending"}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      {/* View */}

                      <button
                        type="button"
                        onClick={() =>
                          handleViewDetails(item)
                        }
                        className="rounded-lg bg-stone-100 p-2 text-stone-700 transition hover:bg-stone-200"
                        title="View Property"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Delete */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="rounded-lg bg-red-100 p-2 text-red-700 transition hover:bg-red-200"
                        title="Delete Property"
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
        /* ================= EMPTY STATE ================= */

        <div className="rounded-2xl border border-stone-200 bg-white py-20 text-center">
          <Building2
            size={48}
            className="mx-auto text-stone-300"
          />

          <h2 className="mt-4 text-xl font-semibold text-stone-800">
            No Properties Found
          </h2>

          <p className="mt-2 text-stone-500">
            {search
              ? `No results found for "${search}".`
              : "There are currently no properties."}
          </p>
        </div>
      )}

      {/* ================= VIEW PROPERTY MODAL ================= */}

      <Modal
              isOpen={isViewModalOpen}
              onClose={handleCloseModal}
              title="Property Details"
            >
              {selectedProperty && (
                <div className="space-y-5">
                  {/* Image */}
      
                  <img
                    src={selectedProperty.images?.[0]}
                    alt={selectedProperty.title}
                    className="h-56 w-full rounded-xl object-cover"
                  />
      
                  {/* Title + Price */}
      
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-stone-900">
                        {selectedProperty.title}
                      </h2>
      
                      <p className="mt-1 text-sm text-stone-500">
                        {selectedProperty.propertyType}
                      </p>
                    </div>
      
                    <p className="font-semibold text-stone-900">
                      ₹{Number(selectedProperty.price).toLocaleString("en-IN")}
                    </p>
                  </div>
      
                  {/* Location */}
      
                  <div className="flex items-center gap-2 text-sm text-stone-600">
                    <MapPin size={17} />
      
                    <span>
                      {selectedProperty.city}
                      {selectedProperty.state && `, ${selectedProperty.state}`}
                    </span>
                  </div>
      
                  {/* Description */}
      
                  <div>
                    <h3 className="mb-1 text-sm font-semibold text-stone-800">
                      Description
                    </h3>
      
                    <p className="text-sm leading-6 text-stone-600">
                      {selectedProperty.description ||
                        selectedProperty.desciption ||
                        "No description available."}
                    </p>
                  </div>
      
                  {/* Owner */}
      
                  {selectedProperty.owner && (
                    <div className="rounded-xl bg-stone-50 p-4">
                      <p className="text-xs uppercase tracking-wider text-stone-400">
                        Property Owner
                      </p>
      
                      <p className="mt-1 font-medium text-stone-800">
                        {selectedProperty.owner?.name || "Owner"}
                      </p>
      
                      {selectedProperty.owner?.email && (
                        <p className="mt-1 text-sm text-stone-500">
                          {selectedProperty.owner.email}
                        </p>
                      )}
                    </div>
                  )}
      
                  {/* Book From Modal */}
      
                  <button
                    type="button"
                    onClick={() => {
                      handleBooking(selectedProperty._id);
                      handleCloseModal();
                    }}
                    className="w-full rounded-xl bg-stone-900 py-3 text-sm font-medium text-white transition hover:bg-black"
                  >
                    Book a Visit
                  </button>
                </div>
              )}
            </Modal>
    </div>
  );
}