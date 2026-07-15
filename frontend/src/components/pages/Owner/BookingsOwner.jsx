import React, { useContext, useEffect } from "react";
import { CheckCircle, XCircle, CalendarCheck } from "lucide-react";
import { BookingContext } from "../../context/BookingContext";
import Loader from "../../common/Loader";


export default function BookingsOwner() {
  const { bookings, loading, ownerBookings, approveBooking, rejectBooking } =
    useContext(BookingContext);

  // Get owner's booking requests
  useEffect(() => {
    ownerBookings();
  }, []);

  // Approve booking
  const handleApprove = async (id) => {
    try {
      await approveBooking(id);
    } catch (error) {
      console.log(error);
    }
  };

  // Reject booking
  const handleReject = async (id) => {
    try {
      await rejectBooking(id);
    } catch (error) {
      console.log(error);
    }
  };

  // Loader
  if (loading) {
    return <Loader />;
  }

  const bookingList = Array.isArray(bookings) ? bookings : [];

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-6 lg:p-8">
      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Booking Requests</h1>

        <p className="text-stone-500 mt-1">
          Review and manage booking requests for your properties.
        </p>
      </div>

      {/* Table */}

      {bookingList.length > 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-x-auto">
          <table className="w-full min-w-[850px]">
            {/* Table Header */}

            <thead className="bg-stone-900 text-white">
              <tr>
                <th className="p-4 text-left font-medium">Buyer</th>

                <th className="p-4 text-left font-medium">Phone</th>

                <th className="p-4 text-left font-medium">Property</th>

                {/* <th className="p-4 text-left font-medium">Visit Date</th> */}

                <th className="p-4 text-left font-medium">Status</th>

                <th className="p-4 text-center font-medium">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}

            <tbody>
              {bookingList.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-stone-100 hover:bg-stone-50 transition"
                >
                  {/* Buyer */}

                  <td className="p-4">
                    <div>
                      <p className="font-medium text-stone-900">
                        {booking.buyer?.name || "Unknown Buyer"}
                      </p>

                      <p className="text-xs text-stone-500 mt-1">
                        {booking.buyer?.email}
                      </p>
                    </div>
                  </td>

                  {/* Phone */}

                  <td className="p-4 text-stone-600">
                    {booking.buyer?.phone || "Not available"}
                  </td>

                  {/* Property */}

                  <td className="p-4">
                    <p className="font-medium text-stone-800">
                      {booking.property?.title || "Property unavailable"}
                    </p>

                    {booking.property?.city && (
                      <p className="text-xs text-stone-500 mt-1">
                        {booking.property.city}
                      </p>
                    )}
                  </td>

                  {/* Visit Date */}

                  {/* <td className="p-4 text-stone-600">
                    {booking.visitDate
                      ? new Date(booking.visitDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "Not available"}
                  </td> */}

                  {/* Status */}

                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize
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
                  </td>

                  {/* Actions */}

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      {booking.status?.toLowerCase() === "pending" && (
                        <>
                          {/* Approve */}

                          <button
                            onClick={() => handleApprove(booking._id)}
                            className="flex items-center gap-2 bg-green-100 text-green-700 hover:bg-green-200 px-3 py-2 rounded-lg transition"
                            title="Approve Booking"
                          >
                            <CheckCircle size={17} />

                            <span className="hidden xl:inline">Approve</span>
                          </button>

                          {/* Reject */}

                          <button
                            onClick={() => handleReject(booking._id)}
                            className="flex items-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 px-3 py-2 rounded-lg transition"
                            title="Reject Booking"
                          >
                            <XCircle size={17} />

                            <span className="hidden xl:inline">Reject</span>
                          </button>
                        </>
                      )}

                      {/* No action for completed request */}

                      {booking.status?.toLowerCase() !== "pending" && (
                        <span className="text-sm text-stone-400">
                          No actions
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */

        <div className="bg-white rounded-2xl border border-stone-200 py-20 text-center">
          <CalendarCheck size={48} className="mx-auto text-stone-300" />

          <h2 className="text-xl font-semibold text-stone-800 mt-4">
            No Booking Requests
          </h2>

          <p className="text-stone-500 mt-2">
            Booking requests for your properties will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
