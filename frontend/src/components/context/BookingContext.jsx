import { createContext, useEffect, useState } from "react";
import api from "../../services/api";

export const BookingContext = createContext();

export default function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Create Booking
  const createBooking = async (propertyId) => {
    try {
      const response = await api.post("/booking", {
        propertyId,
      });

      setBookings((prev) => [response.data.data, ...prev]);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Buyer - My Bookings
  const myBookings = async () => {
    try {
      setLoading(true);

      const response = await api.get("/booking/my");

      setBookings(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // Delete Booking
  const deleteBooking = async (id) => {
    try {
      const response = await api.delete(`/booking/${id}`);

      // Remove deleted booking from UI immediately
      setBookings((prev) => prev.filter((booking) => booking._id !== id));

      return response.data;
    } catch (error) {
      console.log("Delete Booking Error:", error);

      throw error;
    }
  };
  // Owner - Property Bookings
  const ownerBookings = async () => {
    try {
      setLoading(true);

      const response = await api.get("/booking/owner");

      setBookings(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Approve Booking
  const approveBooking = async (bookingId) => {
    try {
      const response = await api.put(`/booking/approve/${bookingId}/`);

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? response.data.data : booking,
        ),
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Reject Booking
  const rejectBooking = async (bookingId) => {
    try {
      const response = await api.put(`/booking/reject/${bookingId}`);

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? response.data.data : booking,
        ),
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        createBooking,
        myBookings,
        ownerBookings,
        approveBooking,
        rejectBooking,
        deleteBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
