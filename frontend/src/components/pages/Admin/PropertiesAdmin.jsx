import React, { useContext, useState } from "react";
import {
  Search,
  Trash2,
  Eye,
  Building2,
  X,
  MapPin,
} from "lucide-react";
import { PropertyContext } from "../../context/PropertyContext";
import Loader from "../../common/Loader";



export default function PropertiesAdmin() {
  const [search, setSearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const {
    properties,
    loading,
    searchProperty,
    resetProperties,
    deleteProperty,
  } = useContext(PropertyContext);

  
  // Search
 

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      resetProperties();
    } else {
      searchProperty(value);
    }
  };

 
  // Delete Property
 

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProperty(id);

      alert("Property deleted successfully.");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete property."
      );
    }
  };

  
  // Safe Property List
 

  const propertyList = Array.isArray(properties)
    ? properties
    : [];

 
  // Loader


  if (loading && propertyList.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-6 lg:p-8">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">
          Properties
        </h1>

        <p className="text-stone-500 mt-1">
          Manage all listed properties.
        </p>
      </div>

      {/* Search */}

      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-4 mb-6 flex items-center gap-3">
        <Search
          size={20}
          className="text-stone-400 shrink-0"
        />

        <input
          type="text"
          placeholder="Search by property name, city..."
          value={search}
          onChange={handleSearch}
          className="w-full outline-none bg-transparent text-stone-800 placeholder:text-stone-400"
        />
      </div>

      {/* Table */}

      {propertyList.length > 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-x-auto">
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
                  className="border-b border-stone-100 hover:bg-stone-50 transition"
                >
                  {/* Property */}

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {item.images?.[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                          <Building2
                            size={22}
                            className="text-stone-400"
                          />
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-stone-900">
                          {item.title || "Untitled Property"}
                        </p>

                        <p className="text-xs text-stone-500 mt-1 capitalize">
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
                        <p className="text-xs text-stone-500 mt-1">
                          {item.owner.email}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* City */}

                  <td className="p-4 text-stone-600">
                    {item.city || "Not available"}
                  </td>

                  {/* Price */}

                  <td className="p-4 font-medium text-stone-800">
                    ₹
                    {Number(
                      item.price || 0
                    ).toLocaleString("en-IN")}
                  </td>

                  {/* Status */}

                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize
                      ${
                        item.status?.toLowerCase() ===
                        "approved"
                          ? "bg-green-100 text-green-700"
                          : item.status?.toLowerCase() ===
                              "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.status || "Pending"}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      {/* View */}

                      <button
                        onClick={() =>
                          setSelectedProperty(item)
                        }
                        className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 transition"
                        title="View Property"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Delete */}

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
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
        /* Empty State */

        <div className="bg-white border border-stone-200 rounded-2xl py-20 text-center">
          <Building2
            size={48}
            className="mx-auto text-stone-300"
          />

          <h2 className="text-xl font-semibold text-stone-800 mt-4">
            No Properties Found
          </h2>

          <p className="text-stone-500 mt-2">
            {search
              ? `No results found for "${search}".`
              : "There are currently no properties."}
          </p>
        </div>
      )}

      {/* =========================
          View Property Modal
      ========================= */}

      {selectedProperty && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-xl">
            {/* Property Image */}

            <div className="relative">
              {selectedProperty.images?.[0] ? (
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="w-full h-72 object-cover rounded-t-3xl"
                />
              ) : (
                <div className="w-full h-72 bg-stone-100 flex items-center justify-center rounded-t-3xl">
                  <Building2
                    size={60}
                    className="text-stone-300"
                  />
                </div>
              )}

              {/* Close Button */}

              <button
                onClick={() =>
                  setSelectedProperty(null)
                }
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-stone-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Property Details */}

            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-stone-900">
                    {selectedProperty.title}
                  </h2>

                  <div className="flex items-center gap-2 text-stone-500 mt-2">
                    <MapPin size={17} />

                    <span>
                      {selectedProperty.city}

                      {selectedProperty.state &&
                        `, ${selectedProperty.state}`}
                    </span>
                  </div>
                </div>

                {/* Status */}

                <span
                  className={`w-fit px-3 py-1.5 rounded-full text-sm font-medium capitalize
                  ${
                    selectedProperty.status?.toLowerCase() ===
                    "approved"
                      ? "bg-green-100 text-green-700"
                      : selectedProperty.status?.toLowerCase() ===
                          "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {selectedProperty.status ||
                    "Pending"}
                </span>
              </div>

              {/* Details Grid */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs text-stone-500">
                    Property Type
                  </p>

                  <p className="font-semibold mt-1 capitalize">
                    {selectedProperty.propertyType ||
                      "N/A"}
                  </p>
                </div>

                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs text-stone-500">
                    Purpose
                  </p>

                  <p className="font-semibold mt-1 capitalize">
                    {selectedProperty.purpose ||
                      "N/A"}
                  </p>
                </div>

                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs text-stone-500">
                    Furnished
                  </p>

                  <p className="font-semibold mt-1 capitalize">
                    {selectedProperty.furnished ||
                      "N/A"}
                  </p>
                </div>

                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs text-stone-500">
                    Price
                  </p>

                  <p className="font-semibold mt-1">
                    ₹
                    {Number(
                      selectedProperty.price || 0
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Owner */}

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-stone-900">
                  Owner Information
                </h3>

                <div className="bg-stone-50 rounded-xl p-4 mt-3">
                  <p className="font-medium">
                    {selectedProperty.owner?.name ||
                      "Unknown Owner"}
                  </p>

                  <p className="text-sm text-stone-500 mt-1">
                    {selectedProperty.owner?.email}
                  </p>

                  {selectedProperty.owner?.phone && (
                    <p className="text-sm text-stone-500 mt-1">
                      {
                        selectedProperty.owner
                          .phone
                      }
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-stone-900">
                  Description
                </h3>

                <p className="text-stone-600 leading-7 mt-3">
                  {selectedProperty.description ||
                    selectedProperty.desciption ||
                    "No description available."}
                </p>
              </div>

              {/* Multiple Images */}

              {selectedProperty.images?.length >
                1 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-stone-900 mb-4">
                    Property Images
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedProperty.images.map(
                      (image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${selectedProperty.title} ${index + 1}`}
                          className="w-full h-36 object-cover rounded-xl"
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Close */}

              <button
                onClick={() =>
                  setSelectedProperty(null)
                }
                className="w-full mt-8 bg-stone-900 text-white py-3 rounded-xl hover:bg-black transition"
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