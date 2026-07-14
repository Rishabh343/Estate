import { createContext, useEffect, useState } from "react";
import api from "../../services/api";

export const PropertyContext = createContext();

export default function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get All Properties

  const getProperties = async () => {
    try {
      setLoading(true);

      const response = await api.get("/properties");

      setProperties(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getMyProperties = async () => {
  try {
    setLoading(true);

    const response = await api.get(
      "/properties/myproperties",
    );

    setProperties(response.data.data);

    return response.data;
  } catch (error) {
    console.log(
      "Get My Properties Error:",
      error.response?.data || error.message,
    );

    throw error;
  } finally {
    setLoading(false);
  }
};
  const getAllAppovedProperties = async () => {
    try {
      setLoading(true);

      const response = await api.get("/properties/appovedproperties");

      setProperties(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // Add Property

  const addProperty = async (formData) => {
    try {
      const response = await api.post("/properties", formData);

      setProperties((prev) => [response.data.data, ...prev]);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Update Property

  const updateProperty = async (id, formData) => {
    try {
      const response = await api.put(`/properties/${id}`, formData);

      setProperties((prev) =>
        prev.map((item) => (item._id === id ? response.data.data : item)),
      );

      return response.data;
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("BACKEND ERROR:", error.response?.data);
      console.log("MESSAGE:", error.message);
    }
  };

  // Delete Property

  const deleteProperty = async (id) => {
    try {
      await api.delete(`/properties/${id}`);

      setProperties((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Search

  const searchProperty = async (keyword) => {
    try {
      const response = await api.get(`/properties/search?keyword=${keyword}`);

      setProperties(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter

  const filterProperty = async (city, type) => {
    try {
      const response = await api.get(
        `/properties/filter?city=${city}&propertyType=${type}`,
      );

      setProperties(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const approveProperty = async (id) => {
    try {
      const response = await api.put(`/properties/approveProperty/${id}`);

      setProperties((prev) =>
        prev.map((property) =>
          property._id === id ? response.data.data : property,
        ),
      );

      return response.data;
    } catch (error) {
      console.log(error.response?.data || error.message);

      throw error;
    }
  };

  const rejectProperty = async (id) => {
    try {
      const response = await api.put(`/properties/rejectProperty/${id}`);

      setProperties((prev) =>
        prev.map((property) =>
          property._id === id ? response.data.data : property,
        ),
      );

      return response.data;
    } catch (error) {
      console.log(error.response?.data || error.message);

      throw error;
    }
  };
  useEffect(() => {
    getProperties();
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        getProperties,
        getMyProperties,
        getAllAppovedProperties,
        addProperty,
        updateProperty,
        deleteProperty,
        searchProperty,
        filterProperty,
        approveProperty,
        rejectProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}
