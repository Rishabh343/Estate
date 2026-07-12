import React, { useContext, useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Eye,
  X,
  Building2,
  MapPin,
} from "lucide-react";
import { PropertyContext } from "../../context/PropertyContext";
import Loader from "../../common/Loader";


export default function PropertyApprovalAdmin() {
  const {
    properties,
    loading,
    getProperties,
    approveProperty,
    rejectProperty,
  } = useContext(PropertyContext);

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  
  // Fetch Properties
 

  useEffect(() => {
    getProperties();
  }, []);

 
  // Safe Array
 

  const propertyList = Array.isArray(properties)
    ? properties
    : [];


  // Only Pending Properties


  const pendingProperties = propertyList.filter(
    (property) =>
      property.status?.toLowerCase() === "pending"
  );

  //
  // Approve Property
  // 

  const handleApprove = async (id) => {
    const confirmApprove = window.confirm(
      "Are you sure you want to approve this property?"
    );

    if (!confirmApprove) return;

    try {
      setActionLoading(id);

      await approveProperty(id);

      alert("Property approved successfully.");

      // Close modal if opened
      if (selectedProperty?._id === id) {
        setSelectedProperty(null);
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to approve property."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // 
  // Reject Property
  // 

  const handleReject = async (id) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this property?"
    );

    if (!confirmReject) return;

    try {
      setActionLoading(id);

      await rejectProperty(id);

      alert("Property rejected successfully.");

      // Close modal if opened
      if (selectedProperty?._id === id) {
        setSelectedProperty(null);
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to reject property."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // 
  // Initial Loader
  // 

  if (loading && propertyList.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-6 lg:p-8">
      {/*
          Heading
    */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">
          Property Approval
        </h1>

        <p className="text-stone-500 mt-1">
          Review pending property listings submitted by owners.
        </p>
      </div>

      {/* 
          Pending Count
    */}

      <div className="mb-6">
        <div className="inline-flex items-center gap-3 bg-white border border-stone-200 rounded-xl px-5 py-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Building2 size={20} />
          </div>

          <div>
            <p className="text-xs text-stone-500">
              Pending Approval
            </p>

            <p className="text-xl font-bold text-stone-900">
              {pendingProperties.length}
            </p>
          </div>
        </div>
      </div>

      {/* 
          Table
      */}

      {pendingProperties.length > 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-x-auto">
          <table className="w-full min-w-[900px]">
            {/* Table Header */}

            <thead className="bg-stone-900 text-white">
              <tr>
                <th className="text-left p-4 font-medium">
                  Property
                </th>

                <th className="text-left p-4 font-medium">
                  Owner
                </th>

                <th className="text-left p-4 font-medium">
                  City
                </th>

                <th className="text-left p-4 font-medium">
                  Price
                </th>

                <th className="text-left p-4 font-medium">
                  Submitted
                </th>

                <th className="text-center p-4 font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}

            <tbody>
              {pendingProperties.map((property) => (
                <tr
                  key={property._id}
                  className="border-b border-stone-100 hover:bg-stone-50 transition"
                >
                  {/* Property */}

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {property.images?.[0] ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
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
                          {property.title ||
                            "Untitled Property"}
                        </p>

                        <p className="text-xs text-stone-500 mt-1 capitalize">
                          {property.propertyType ||
                            "Property"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Owner */}

                  <td className="p-4">
                    <p className="font-medium text-stone-800">
                      {property.owner?.name ||
                        "Unknown Owner"}
                    </p>

                    {property.owner?.email && (
                      <p className="text-xs text-stone-500 mt-1">
                        {property.owner.email}
                      </p>
                    )}
                  </td>

                  {/* City */}

                  <td className="p-4 text-stone-600">
                    {property.city || "Not available"}
                  </td>

                  {/* Price */}

                  <td className="p-4 font-medium text-stone-800">
                    ₹
                    {Number(
                      property.price || 0
                    ).toLocaleString("en-IN")}
                  </td>

                  {/* Submitted Date */}

                  <td className="p-4 text-stone-600">
                    {property.createdAt
                      ? new Date(
                          property.createdAt
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "Not available"}
                  </td>

                  {/* Actions */}

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      {/* View */}

                      <button
                        onClick={() =>
                          setSelectedProperty(property)
                        }
                        className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 transition"
                        title="View Property"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Approve */}

                      <button
                        onClick={() =>
                          handleApprove(property._id)
                        }
                        disabled={
                          actionLoading === property._id
                        }
                        className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Approve Property"
                      >
                        <CheckCircle size={18} />
                      </button>

                      {/* Reject */}

                      <button
                        onClick={() =>
                          handleReject(property._id)
                        }
                        disabled={
                          actionLoading === property._id
                        }
                        className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Reject Property"
                      >
                        <XCircle size={18} />
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
          <CheckCircle
            size={48}
            className="mx-auto text-green-400"
          />

          <h2 className="text-xl font-semibold text-stone-800 mt-4">
            All Caught Up
          </h2>

          <p className="text-stone-500 mt-2">
            There are no properties waiting for approval.
          </p>
        </div>
      )}

      {/* 
          Property Details Modal
     */}

      {selectedProperty && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedProperty(null)}
        >
          <div
            className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}

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

              {/* Close */}

              <button
                onClick={() =>
                  setSelectedProperty(null)
                }
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-stone-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}

            <div className="p-6 md:p-8">
              {/* Title */}

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
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

                <span className="w-fit px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                  Pending
                </span>
              </div>

              {/* Price */}

              <div className="mt-6">
                <p className="text-sm text-stone-500">
                  Price
                </p>

                <h3 className="text-3xl font-bold text-stone-900 mt-1">
                  ₹
                  {Number(
                    selectedProperty.price || 0
                  ).toLocaleString("en-IN")}
                </h3>
              </div>

              {/* Property Information */}

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
                    Bedrooms
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedProperty.bedrooms ??
                      "N/A"}
                  </p>
                </div>

                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs text-stone-500">
                    Bathrooms
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedProperty.bathrooms ??
                      "N/A"}
                  </p>
                </div>
              </div>

              {/* Owner Information */}

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-stone-900">
                  Owner Information
                </h3>

                <div className="bg-stone-50 rounded-xl p-5 mt-3">
                  <p className="font-semibold text-stone-900">
                    {selectedProperty.owner?.name ||
                      "Unknown Owner"}
                  </p>

                  {selectedProperty.owner?.email && (
                    <p className="text-sm text-stone-500 mt-1">
                      {selectedProperty.owner.email}
                    </p>
                  )}

                  {selectedProperty.owner?.phone && (
                    <p className="text-sm text-stone-500 mt-1">
                      {selectedProperty.owner.phone}
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

              {/* All Images */}

              {selectedProperty.images?.length > 1 && (
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

              {/* Action Buttons */}

              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                <button
                  onClick={() =>
                    handleApprove(
                      selectedProperty._id
                    )
                  }
                  disabled={
                    actionLoading ===
                    selectedProperty._id
                  }
                  className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50"
                >
                  <CheckCircle size={19} />

                  {actionLoading ===
                  selectedProperty._id
                    ? "Processing..."
                    : "Approve Property"}
                </button>

                <button
                  onClick={() =>
                    handleReject(
                      selectedProperty._id
                    )
                  }
                  disabled={
                    actionLoading ===
                    selectedProperty._id
                  }
                  className="flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition disabled:opacity-50"
                >
                  <XCircle size={19} />

                  {actionLoading ===
                  selectedProperty._id
                    ? "Processing..."
                    : "Reject Property"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}