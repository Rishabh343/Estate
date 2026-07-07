import bookingModel from "../models/bookingModel.js";
import propertiesModel from "../models/propertiesModel.js";

export const createBooking = async (req, res) => {
  try {
    const { propertyId, buyerId, visitDate, vistTime } = req.body;
    const property = await propertiesModel.findById(propertyId);
    const booking = await bookingModel.create({
      property: propertyId,
      buyer: buyerId,
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
