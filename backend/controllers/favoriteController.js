import favoriteModel from "../models/favoriteModel.js";

// Add to Favorite
export const addFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;

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

    const favorite = await favoriteModel.create({
      buyer: req.user.id,
      property: propertyId,
    });

    const populatedFavorite = await favorite.populate("property");

    res.status(201).json({
      status: true,
      message: "Property added to favorites",
      data: populatedFavorite,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to add favorite",
      error: error.message,
    });
  }
};

// Get My Favorites
export const getFavorites = async (req, res) => {
  try {
    const favorites = await favoriteModel
      .find({
        buyer: req.user.id,
      })
      .populate("property")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Favorites fetched successfully",
      data: favorites,
    });
  } catch (error) {
    res.status(500).json({
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

    res.status(200).json({
      status: true,
      message: "Property removed from favorites",
      data: favorite,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to remove favorite",
      error: error.message,
    });
  }
};