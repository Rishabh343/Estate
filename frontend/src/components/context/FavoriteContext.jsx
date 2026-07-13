import { createContext, useEffect, useState } from "react";
import api from "../../services/api";

export const FavoriteContext = createContext();

export default function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);



  const getFavorites = async () => {
    try {
      setLoading(true);

      const response = await api.get("/favorite");

      setFavorites(response.data.data);

      return response.data;
    } catch (error) {
      console.log(
        "Get Favorites Error:",
        error.response?.data || error.message,
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };



  const addFavorite = async (propertyId) => {
    try {
      const response = await api.post(
        `/favorite/${propertyId}`,
      );

      // Add new favorite to UI immediately
      setFavorites((prev) => [
        response.data.data,
        ...prev,
      ]);

      return response.data;
    } catch (error) {
      console.log(
        "Add Favorite Error:",
        error.response?.data || error.message,
      );

      throw error;
    }
  };


  const removeFavorite = async (propertyId) => {
    try {
      const response = await api.delete(
        `/favorite/${propertyId}`,
      );

      // Remove favorite from UI
      setFavorites((prev) =>
        prev.filter(
          (item) =>
            item.property?._id !== propertyId &&
            item.property !== propertyId,
        ),
      );

      return response.data;
    } catch (error) {
      console.log(
        "Remove Favorite Error:",
        error.response?.data || error.message,
      );

      throw error;
    }
  };

  // =========================
  // Check If Property Is Favorite
  // =========================

  const isFavorite = (propertyId) => {
    return favorites.some(
      (item) =>
        item.property?._id === propertyId ||
        item.property === propertyId,
    );
  };

  // =========================
  // Load Favorites
  // =========================

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    const role = localStorage.getItem("role");

    // Only buyer needs favorites
    if (isLoggedIn && role === "buyer") {
      getFavorites();
    }
  }, []);

  return (
    <FavoriteContext.Provider
      value={{
        // States
        favorites,
        loading,

        // Functions
        getFavorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}