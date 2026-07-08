import propertiesModel from "../models/propertiesModel.js";

// Create Property
export const addProperties = async (req, res) => {
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
    const imageUrls = req.files
      ? req.files.map(
          (file) => `http://localhost:8000/uploads/${file.filename}`,
        )
      : [];
    const response = await propertiesModel.create({
      owner: req.user.id,
      title,
      propertyType,
      furnished,
      desciption,
      purpose,
      price,
      city,
      state,
      images: imageUrls,
    });

    res.status(201).json({
      status: true,
      message: "Property added successfully",
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

// Get All Properties
export const getAllProperties = async (req, res) => {
  try {
    const response = await propertiesModel
      .find()
      .populate("owner", "name email phone");

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

// Get Property By Id
export const getPropertyById = async (req, res) => {
  try {
    const response = await propertiesModel
      .findById(req.params.id)
      .populate("owner", "name email phone");

    if (!response) {
      return res.status(404).json({
        status: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to load property",
      error: error.message,
    });
  }
};

// Update Property
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
    const imageUrls = req.files
      ? req.files.map(
          (file) => `http://localhost:8000/uploads/${file.filename}`,
        )
      : [];
    const response = await propertiesModel.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      {
        title,
        propertyType,
        furnished,
        desciption,
        purpose,
        price,
        city,
        state,
        images: imageUrls,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!response) {
      return res.status(404).json({
        status: false,
        message: "Property not found or you're not the owner",
      });
    }

    res.status(200).json({
      status: true,
      message: "Property updated successfully",
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

// Delete Property
export const deleteProperty = async (req, res) => {
  try {
    // console.log("Property ID:", req.params.id);
    // console.log("Logged-in Owner:", req.user.id);

    const property = await propertiesModel.findById(req.params.id);

    console.log(property);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // console.log("Property Owner:", property.owner.toString());

    const response = await propertiesModel.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    console.log(response);

    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
export const searchProperties = async (req, res) => {
  try {
    const { keyword } = req.query;

    const properties = await propertiesModel.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { city: { $regex: keyword, $options: "i" } },
        { state: { $regex: keyword, $options: "i" } },
        { propertyType: { $regex: keyword, $options: "i" } },
        { purpose: { $regex: keyword, $options: "i" } },
      ],
      // status: "Approved",
    });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const filterProperties = async (req, res) => {
  try {
    const {
      city,
      state,
      propertyType,
      purpose,
      furnished,
      minPrice,
      maxPrice,
    } = req.query;

    const filter = {};

    if (city) {
      filter.city = city;
    }

    if (state) {
      filter.state = state;
    }

    if (propertyType) {
      filter.propertyType = propertyType;
    }

    if (purpose) {
      filter.purpose = purpose;
    }

    if (furnished) {
      filter.furnished = furnished;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const properties = await propertiesModel.find(filter);

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const approveProperty = async (req, res) => {
  try {
    const property = await propertiesModel.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Ensure the logged-in owner owns this booking
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    property.status = "Approved";

    await property.save();

    res.status(200).json({
      success: true,
      message: "Property approved successfully",
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const RejectProperty = async (req, res) => {
  try {
    const property = await propertiesModel.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Ensure the logged-in owner owns this booking
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    property.status = "Rejected";

    await property.save();

    res.status(200).json({
      success: true,
      message: "Property Rejected ",
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
