import React, { useContext, useEffect, useState } from "react";

import { Calendar, MapPin, User, Mail, Phone, Trash2 } from "lucide-react";
import { BookingContext } from "../../context/BookingContext";
import Loader from "../../common/Loader";
import Modal from "../../common/Modal";

export default function MyBookings() {
  const { bookings, myBookings, deleteBooking, loading } =
    useContext(BookingContext);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    myBookings();
  }, []);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleCancelBooking = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmCancel) return;

    try {
      const response = await deleteBooking(id);

      alert(response?.message || "Booking cancelled successfully");

      // Close modal if cancellation happens from modal
      handleCloseModal();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef] p-4 md:p-6 lg:p-8">
      <div className="mb-7">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
          Your Visits
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">
          My Bookings
        </h1>

        <p className="mt-2 text-sm text-stone-500">
          Track and manage your property visit requests.
        </p>
      </div>

      {bookings.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {bookings.map((booking) => {
            const property = booking.property;

            // Works with either backend structure:
            // booking.owner OR booking.property.owner
            const owner = booking.owner || property?.owner;

            return (
              <div
                key={booking._id}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  border
                  border-stone-200
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <div className="relative overflow-hidden">
                  <img
                    src={property?.images?.[0]}
                    alt={property?.title || "Property"}
                    className="
                      h-48
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* Status */}

                  <span
                    className={`
                      absolute
                      right-3
                      top-3
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium
                      shadow-sm
                      ${
                        booking.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {booking.status}
                  </span>

                  {/* Property Type */}

                  {property?.propertyType && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {property.propertyType}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  {/* Title */}

                  <div className="flex items-start justify-between gap-3">
                    <h2 className="line-clamp-1 text-lg font-semibold text-stone-900">
                      {property?.title || "Property"}
                    </h2>

                    {property?.price && (
                      <span className="shrink-0 text-sm font-semibold text-stone-900">
                        ₹{Number(property.price).toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* Information */}

                  <div className="mt-4 space-y-2.5">
                    {/* Location */}

                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <MapPin size={15} className="shrink-0" />

                      <span className="line-clamp-1">
                        {property?.city || "Location unavailable"}

                        {property?.state && `, ${property.state}`}
                      </span>
                    </div>

                    {/* Date */}

                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Calendar size={15} className="shrink-0" />

                      <span>{formatDate(booking.createdAt)}</span>
                    </div>

                    {/* Owner */}

                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <User size={15} className="shrink-0" />

                      <span className="line-clamp-1">
                        Owner: {owner?.name || "Not available"}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}

                  <div className="my-4 h-px bg-stone-100" />

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleViewDetails(booking)}
                      className="
                        flex-1
                        rounded-xl
                        bg-stone-900
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-black
                      "
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCancelBooking(booking._id)}
                      className="
                        flex
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-red-200
                        px-3
                        text-red-500
                        transition
                        hover:bg-red-50
                        hover:text-red-600
                      "
                      title="Cancel Booking"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {bookings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24">
          <Calendar size={64} className="text-stone-300" />

          <h2 className="mt-5 text-xl font-semibold text-stone-800">
            No Bookings Yet
          </h2>

          <p className="mt-2 text-sm text-stone-500">
            Browse properties and book your first visit.
          </p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Booking Details"
      >
        {selectedBooking && (
          <div className="space-y-4">
            {/* Property Image */}
            <img
              src={selectedBooking.property?.images?.[0]}
              alt={selectedBooking.property?.title}
              className="h-36 w-full rounded-xl object-cover"
            />

            {/* Title + Status */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-stone-900">
                  {selectedBooking.property?.title}
                </h2>

                <p className="mt-1 text-xs text-stone-500">
                  {selectedBooking.property?.propertyType}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  selectedBooking.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : selectedBooking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {selectedBooking.status}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between border-y border-stone-100 py-3">
              <span className="text-sm text-stone-500">Property Price</span>

              <span className="font-semibold text-stone-900">
                ₹
                {Number(selectedBooking.property?.price || 0).toLocaleString(
                  "en-IN",
                )}
              </span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 gap-3">
              {/* Location */}
              <div className="flex items-center gap-3">
                <MapPin size={17} className="shrink-0 text-stone-400" />

                <div>
                  <p className="text-xs text-stone-400">Location</p>

                  <p className="text-sm font-medium text-stone-700">
                    {selectedBooking.property?.city || "Not available"}
                    {selectedBooking.property?.state &&
                      `, ${selectedBooking.property.state}`}
                  </p>
                </div>
              </div>

              {/* Booking Date */}
              <div className="flex items-center gap-3">
                <Calendar size={17} className="shrink-0 text-stone-400" />

                <div>
                  <p className="text-xs text-stone-400">Booking Requested</p>

                  <p className="text-sm font-medium text-stone-700">
                    {formatDate(selectedBooking.createdAt)}
                  </p>
                </div>
              </div>

              {/* Owner */}
              <div className="flex items-center gap-3">
                <User size={17} className="shrink-0 text-stone-400" />

                <div>
                  <p className="text-xs text-stone-400">Property Owner</p>

                  <p className="text-sm font-medium text-stone-700">
                    {selectedBooking.owner?.name ||
                      selectedBooking.property?.owner?.name ||
                      "Not available"}
                  </p>
                </div>
              </div>

              {/* Owner Email */}
              {(selectedBooking.owner?.email ||
                selectedBooking.property?.owner?.email) && (
                <div className="flex items-center gap-3">
                  <Mail size={17} className="shrink-0 text-stone-400" />

                  <div>
                    <p className="text-xs text-stone-400">Owner Email</p>

                    <p className="text-sm font-medium text-stone-700">
                      {selectedBooking.owner?.email ||
                        selectedBooking.property?.owner?.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Owner Phone */}
              {(selectedBooking.owner?.phone ||
                selectedBooking.property?.owner?.phone) && (
                <div className="flex items-center gap-3">
                  <Phone size={17} className="shrink-0 text-stone-400" />

                  <div>
                    <p className="text-xs text-stone-400">Owner Phone</p>

                    <p className="text-sm font-medium text-stone-700">
                      {selectedBooking.owner?.phone ||
                        selectedBooking.property?.owner?.phone}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Cancel Booking */}
            <button
              type="button"
              onClick={() => handleCancelBooking(selectedBooking._id)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={16} />
              Cancel Booking
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
