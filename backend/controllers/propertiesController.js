import propertiesModel from "../models/propertiesModel.js";

export const addProperties = async (req, res) => {
  try {
    const {
      owner,
      title,
      propertyType,
      furnished,
      desciption,
      purpose,
      price,
      city,
      state,
    } = req.body;
    const response = await propertiesModel.create({
      owner,
      propertyType,
      title,
      desciption,
      furnished,
      purpose,
      price,
      city,
      state,
    });
    res.status(201).json({
      status: true,
      message: "Property added Successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to add property",
      error: error.message,
    });
  }
};
export const getAllProperties = async (req, res) => {
  try {
    const response = await propertiesModel.find();
    res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to load properties",
      error: error.message,
    });
  }
};
export const getPropertyById = async (req, res) => {
  try {
    const response = await propertiesModel.findById(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to load properties",
      error: error.message,
    });
  }
};
export const deleteProperty = async (req, res) => {
  try {
    const response = await propertiesModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: true,
      message: "Property deleted",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to load properties",
      error: error.message,
    });
  }
};
export const updateProperty = async (req, res) => {
  try {
    const {
      title,
      propertyType,
      furnished,
      desciption,
      purpose,
      price,
      city,
      state,
    } = req.body;
    const response = await propertiesModel.findByIdAndUpdate(
      req.params.id,
      {
        propertyType,
        title,
        desciption,
        furnished,
        purpose,
        price,
        city,
        state,
      },

      { new: true },
    );
    res.status(200).json({
      status: true,
      message: "Property updated Successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to update property",
      error: error.message,
    });
  }
};
