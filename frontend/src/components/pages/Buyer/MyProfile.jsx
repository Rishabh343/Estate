import React, { useContext, useEffect, useState } from "react";
import { User, Mail, Phone, Calendar, Edit, Camera } from "lucide-react";
import { UserContext } from "../../context/userContext";
import Modal from "../../common/Modal";



export default function MyProfile() {
  const { user, loading, getUserProfile, updateUser } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: null,
  });

  // Get logged-in user profile
  useEffect(() => {
    getUserProfile();
  }, []);

  // Put user data inside form when user data is fetched
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        profileImage: null,
      });
    }
  }, [user]);

  // Handle text inputs
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle image
  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: e.target.files[0],
    }));
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);

      if (formData.profileImage) {
        data.append("profileImage", formData.profileImage);
      }

      await updateUser(data);

      setIsOpen(false);

      alert("Profile updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <p className="text-lg text-stone-600">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <p className="text-lg text-stone-600">Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-8">
      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900">
          My Profile
        </h1>

        <p className="text-stone-500 mt-2">Manage your personal information.</p>
      </div>

      {/* Profile Card */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        {/* Banner */}

        <div className="h-40 bg-stone-200"></div>

        <div className="px-6 md:px-10 pb-10">
          {/* Profile Top */}

          <div className="-mt-16 flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              {/* Profile Image */}

              <img
                src={
                  user.profileImage ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name || "User",
                  )}`
                }
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md bg-white"
              />

              {/* Name */}

              <div className="md:pb-2">
                <h2 className="text-3xl font-semibold text-stone-900">
                  {user.name}
                </h2>

                <p className="text-stone-500 capitalize">{user.role}</p>
              </div>
            </div>

            {/* Edit Button */}

            <button
              onClick={() => setIsOpen(true)}
              className="mt-6 md:mt-0 flex items-center justify-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-xl hover:bg-black transition"
            >
              <Edit size={18} />
              Edit Profile
            </button>
          </div>

          {/* User Details */}

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {/* Name */}

            <div className="flex items-center gap-4 bg-stone-50 rounded-xl p-5">
              <User size={22} />

              <div>
                <p className="text-sm text-stone-500">Full Name</p>

                <h3 className="font-semibold">{user.name}</h3>
              </div>
            </div>

            {/* Email */}

            <div className="flex items-center gap-4 bg-stone-50 rounded-xl p-5">
              <Mail size={22} />

              <div>
                <p className="text-sm text-stone-500">Email</p>

                <h3 className="font-semibold">{user.email}</h3>
              </div>
            </div>

            {/* Phone */}

            <div className="flex items-center gap-4 bg-stone-50 rounded-xl p-5">
              <Phone size={22} />

              <div>
                <p className="text-sm text-stone-500">Phone</p>

                <h3 className="font-semibold">
                  {user.phone || "Not provided"}
                </h3>
              </div>
            </div>

            {/* Joined */}

            <div className="flex items-center gap-4 bg-stone-50 rounded-xl p-5">
              <Calendar size={22} />

              <div>
                <p className="text-sm text-stone-500">Joined On</p>

                <h3 className="font-semibold">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Not available"}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-stone-900">
            Edit Profile
          </h2>

          <p className="text-stone-500 mt-1 mb-6">
            Update your personal information.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900"
              />
            </div>

            {/* Email */}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900"
              />
            </div>

            {/* Profile Image */}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Profile Image
              </label>

              <label className="flex items-center gap-3 border border-dashed border-stone-300 rounded-xl px-4 py-4 cursor-pointer hover:bg-stone-50">
                <Camera size={20} />

                <span className="text-stone-600">
                  {formData.profileImage
                    ? formData.profileImage.name
                    : "Choose profile image"}
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Buttons */}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 border border-stone-300 py-3 rounded-xl hover:bg-stone-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 bg-stone-900 text-white py-3 rounded-xl hover:bg-black transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
