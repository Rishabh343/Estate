import bookingModel from "../models/bookingModel.js";
import propertiesModel from "../models/propertiesModel.js";

export const createBooking = async (req, res) => {
  try {
    const {
      propertyId,
      visitDate,
      vistTime,
    } = req.body;

    // Check property ID
    if (!propertyId) {
      return res.status(400).json({
        success: false,
        message: "Property ID is required",
      });
    }

    // Find property
    const property =
      await propertiesModel.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check if buyer already booked this property
    const existingBooking =
      await bookingModel.findOne({
        property: propertyId,
        buyer: req.user.id,
      });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message:
          "You have already booked a visit for this property",
      });
    }

    // Create booking
    const booking = await bookingModel.create({
      property: propertyId,
      buyer: req.user.id,
      owner: property.owner,
      visitDate,
      vistTime,
    });

    return res.status(201).json({
      success: true,
      message:
        "Property visit booked successfully",
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};
export const myBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ buyer: req.user.id })
      .populate("property")
      .populate("owner", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};
// Delete  Booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await bookingModel.findOneAndDelete({
      _id: id,
      buyer: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({
        status: false,
        message: "Booking not found or you are not authorized",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Booking deleted successfully",
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to delete booking",
      error: error.message,
    });
  }
};
export const OwnersDashboardReviewBooking = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ owner: req.user.id })
      .populate("buyer", "name email phone ")
      .populate("property", "title");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const approvebooking = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Ensure the logged-in owner owns this booking
    if (booking.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    booking.status = "Approved";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking approved successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const Rejectsbooking = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Ensure the logged-in owner owns this booking
    if (booking.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    booking.status = "Rejected";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking Rejected",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const Pendingbooking = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "Pending";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking Pending",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




