import favoriteModel from "../models/favoriteModel.js";

// Add to Favorite
export const addFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Check if already added by THIS buyer
    const existingFavorite = await favoriteModel.findOne({
      buyer: req.user.id,
      property: propertyId,
    });

    if (existingFavorite) {
      return res.status(400).json({
        status: false,
        message: "Property already added to favorites",
      });
    }

    // Add favorite for logged-in buyer
    const favorite = await favoriteModel.create({
      buyer: req.user.id,
      property: propertyId,
    });

    // Populate property and property owner
    const populatedFavorite = await favoriteModel
      .findById(favorite._id)
      .populate({
        path: "property",
        populate: {
          path: "owner",
          select: "name email phone",
        },
      });

    return res.status(201).json({
      status: true,
      message: "Property added to favorites",
      data: populatedFavorite,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to add favorite",
      error: error.message,
    });
  }
};

// Get My Favorites
export const getMyFavorites = async (req, res) => {
  try {
    // Only favorites of currently logged-in buyer
    const favorites = await favoriteModel
      .find({
        buyer: req.user.id,
      })
      .populate({
        path: "property",
        populate: {
          path: "owner",
          select: "name email phone",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "Favorites fetched successfully",
      data: favorites,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch favorites",
      error: error.message,
    });
  }
};

// Remove from Favorite
export const removeFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Only remove favorite belonging to logged-in buyer
    const favorite = await favoriteModel.findOneAndDelete({
      buyer: req.user.id,
      property: propertyId,
    });

    if (!favorite) {
      return res.status(404).json({
        status: false,
        message: "Favorite not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Property removed from favorites",
      data: favorite,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to remove favorite",
      error: error.message,
    });
  }
};
