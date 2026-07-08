import bookingModel from "../models/bookingModel.js";
import propertiesModel from "../models/propertiesModel.js";

export const createBooking = async (req, res) => {
  try {
    const { propertyId, buyerId, visitDate, vistTime } = req.body;
    const property = await propertiesModel.findById(propertyId);
    const booking = await bookingModel.create({
      property: propertyId,
      buyer: req.user.id,
      owner: property.owner,
      visitDate,
      vistTime,
    });
    res.status(201).json({
      success: true,
      message: "Property visit booked successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const OwnersDashboardReviewBooking = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ owner: req.user.id })
      .populate("buyer", "name email")
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

    // Ensure the logged-in owner owns this booking
    if (booking.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
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
