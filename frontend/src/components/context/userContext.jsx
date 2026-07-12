import { createContext, useState } from "react";
import api from "../../services/api";


export const UserContext = createContext();

export default function UserProvider({ children }) {
  // Logged-in user's profile
  const [user, setUser] = useState(null);

  // All users for Admin
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  // Get Logged-in User Profile
  const getUserProfile = async () => {
    try {
      setLoading(true);

      const response = await api.get("/user/profile");

      setUser(response.data.data);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Admin - Get All Users
  const getAllProfile = async () => {
    try {
      setLoading(true);

      const response = await api.get("/user/users");

      setUsers(response.data.data);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update Logged-in User Profile
  const updateUser = async (formData) => {
    try {
      const response = await api.put("/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update logged-in user
      setUser(response.data.data);

      // Also update user in admin users array
      setUsers((prev) =>
        prev.map((item) =>
          item._id === response.data.data._id ? response.data.data : item,
        ),
      );

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Admin - Delete User
  const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/user/${id}`);

      setUsers((prev) => prev.filter((item) => item._id !== id));

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Admin - Search Users
  const searchUser = async (keyword) => {
    try {
      const response = await api.get(`/user/search?name=${keyword}`);

      setUsers(response.data.data);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Admin - Filter Users by Role
  const filterUser = async (role) => {
    try {
      const response = await api.get(`/user/filter?role=${role}`);

      setUsers(response.data.data);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        // States
        user,
        users,
        loading,

        // Functions
        getUserProfile,
        getAllProfile,
        updateUser,
        deleteUser,
        searchUser,
        filterUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
