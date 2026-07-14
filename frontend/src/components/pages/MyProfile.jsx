import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Edit,
  MapPin,
  Camera,
} from "lucide-react";
import { UserContext } from "../context/userContext";
import Loader from "../common/Loader";
import Modal from "../common/Modal";
// import { UserContext } from "../context/userContext";
// import Loader from "../common/Loader";
// import Modal from "../common/Modal";



export default function MyProfile() {
  const {
    user,
    loading,
    getUserProfile,
    updateUser,
  } = useContext(UserContext);

  // Modal State

  const [isOpen, setIsOpen] = useState(false);

  // Form State

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Image State

  const [profileImage, setProfileImage] =
    useState(null);

  const [preview, setPreview] = useState("");

  const [updating, setUpdating] =
    useState(false);

  // =========================
  // Get Profile
  // =========================

  useEffect(() => {
    getUserProfile();
  }, []);

  // =========================
  // Open Modal
  // =========================

  const openModalHandler = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });

    setProfileImage(null);

    setPreview(
      user?.profileImage || ""
    );

    setIsOpen(true);
  };

  // =========================
  // Close Modal
  // =========================

  const closeModalHandler = () => {
    setIsOpen(false);
    setProfileImage(null);
    setPreview("");
  };

  // =========================
  // Input Change
  // =========================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // Image Change
  // =========================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfileImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  // =========================
  // Update Profile
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const data = new FormData();

      data.append(
        "name",
        formData.name
      );

      data.append(
        "email",
        formData.email
      );

      data.append(
        "phone",
        formData.phone
      );

      data.append(
        "address",
        formData.address
      );

      if (profileImage) {
        data.append(
          "profileImage",
          profileImage
        );
      }

      await updateUser(data);

      closeModalHandler();

      alert(
        "Profile updated successfully"
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setUpdating(false);
    }
  };

  // =========================
  // Loading
  // =========================

  if (loading && !user) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <p className="text-stone-500">
          Profile not found.
        </p>
      </div>
    );
  }

  // =========================
  // Joined Date
  // =========================

  const joinedDate = user.createdAt
    ? new Date(
        user.createdAt
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-8">
      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900">
          My Profile
        </h1>

        <p className="text-stone-500 mt-2">
          Manage your personal information.
        </p>
      </div>

      {/* Profile Card */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        {/* Banner */}

        <div className="h-40 bg-stone-200" />

        <div className="px-6 md:px-10 pb-10">
          {/* Profile Top */}

          <div className="-mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6">
              {/* Profile Image */}

              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md bg-white"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white bg-stone-900 text-white flex items-center justify-center text-4xl font-bold shadow-md">
                  {user.name
                    ?.charAt(0)
                    .toUpperCase() ||
                    "A"}
                </div>
              )}

              {/* Name & Role */}

              <div className="sm:pb-2">
                <h2 className="text-3xl font-semibold text-stone-900">
                  {user.name}
                </h2>

                <div className="flex items-center gap-2 mt-2 text-stone-500">
                  <ShieldCheck
                    size={18}
                  />

                  <span className="capitalize">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Button */}

            <button
              onClick={
                openModalHandler
              }
              className="flex items-center justify-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-xl hover:bg-black transition"
            >
              <Edit size={18} />

              Edit Profile
            </button>
          </div>

          {/* Profile Details */}

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <ProfileItem
              icon={
                <User size={22} />
              }
              label="Full Name"
              value={user.name}
            />

            <ProfileItem
              icon={
                <Mail size={22} />
              }
              label="Email"
              value={user.email}
            />

            <ProfileItem
              icon={
                <Phone size={22} />
              }
              label="Phone"
              value={
                user.phone ||
                "Not available"
              }
            />

            <ProfileItem
              icon={
                <ShieldCheck
                  size={22}
                />
              }
              label="Role"
              value={
                user.role ||
                "Admin"
              }
            />

            <ProfileItem
              icon={
                <Calendar
                  size={22}
                />
              }
              label="Joined On"
              value={joinedDate}
            />

            <ProfileItem
              icon={
                <MapPin size={22} />
              }
              label="Address"
              value={
                user.address ||
                "Not available"
              }
            />
          </div>
        </div>
      </div>

      {/* =========================
          Reusable Modal
      ========================= */}

      <Modal
        isOpen={isOpen}
        onClose={closeModalHandler}
        title="Edit Profile"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Profile Image */}

          <div className="flex justify-center">
            <div className="relative">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-28 h-28 rounded-full object-cover border-4 border-stone-100"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-stone-900 text-white flex items-center justify-center text-4xl font-bold">
                  {formData.name
                    ?.charAt(0)
                    .toUpperCase() ||
                    "A"}
                </div>
              )}

              {/* Upload Button */}

              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-stone-900 text-white p-2.5 rounded-full cursor-pointer hover:bg-black transition"
              >
                <Camera size={18} />
              </label>

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="hidden"
              />
            </div>
          </div>

          {/* Name */}

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={
                handleChange
              }
              required
              className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-700"
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
              onChange={
                handleChange
              }
              required
              className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-700"
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
              onChange={
                handleChange
              }
              className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-700"
            />
          </div>

          {/* Address */}

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Address
            </label>

            <textarea
              name="address"
              value={
                formData.address
              }
              onChange={
                handleChange
              }
              rows="3"
              className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-700 resize-none"
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={
                closeModalHandler
              }
              className="flex-1 border border-stone-300 text-stone-700 py-3 rounded-xl hover:bg-stone-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updating}
              className="flex-1 bg-stone-900 text-white py-3 rounded-xl hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating
                ? "Updating..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

// =========================
// Reusable Profile Item
// =========================

function ProfileItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-4 bg-stone-50 rounded-xl p-5">
      <div className="text-stone-700">
        {icon}
      </div>

      <div>
        <p className="text-sm text-stone-500">
          {label}
        </p>

        <h3 className="font-semibold text-stone-900 capitalize">
          {value}
        </h3>
      </div>
    </div>
  );
}