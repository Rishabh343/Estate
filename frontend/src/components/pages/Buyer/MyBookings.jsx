import React, { useContext, useEffect } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { BookingContext } from "../../context/BookingContext";


export default function MyBookings() {
  const { bookings, myBookings, loading } = useContext(BookingContext);

  useEffect(() => {
    myBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-stone-900">My Bookings</h1>

        <p className="text-stone-500 mt-2">
          Track all your property booking requests.
        </p>
      </div>

      {/* Cards */}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            {/* Image */}

            <img
              src={booking.property?.images?.[0]}
              alt={booking.property?.title}
              className="h-60 w-full object-cover"
            />

            {/* Content */}

            <div className="p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                  {booking.property?.title}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    booking.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="mt-5 space-y-3 text-stone-600">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>
                    {booking.property?.city}, {booking.property?.state}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>Owner: {booking.owner?.name}</span>
                </div>
              </div>

              <button className="mt-6 w-full rounded-xl bg-stone-900 text-white py-3 hover:bg-black transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}

      {bookings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32">
          <Calendar size={70} className="text-stone-300" />

          <h2 className="text-2xl font-semibold mt-5">No Bookings Yet</h2>

          <p className="text-stone-500 mt-2">
            Browse properties and book your first visit.
          </p>
        </div>
      )}
    </div>
  );
}
