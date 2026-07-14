import React, { useContext, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import { PropertyContext } from "../../context/PropertyContext";
import Loader from "../../common/Loader";
import Modal from "../../common/Modal";

const initialFormData = {
  title: "",
  propertyType: "",
  furnished: "",
  description: "",
  purpose: "",
  price: "",
  city: "",
  state: "",
  images: [],
};

export default function MyPropertiesOwner() {
  const {
    properties,
    loading,
    getMyProperties,
    addProperty,
    updateProperty,
    deleteProperty,
  } = useContext(PropertyContext);

  const [isOpen, setIsOpen] = useState(false);

  // null = Add Mode
  // property object = Edit Mode
  const [editingProperty, setEditingProperty] = useState(null);

  const [formData, setFormData] = useState(initialFormData);

  // Get properties
  useEffect(() => {
    getMyProperties();
  }, []);

  // Open Add Property Modal
  const openAddModal = () => {
    setEditingProperty(null);

    setFormData(initialFormData);

    setIsOpen(true);
  };

  // Open Edit Property Modal
  const openEditModal = (property) => {
    setEditingProperty(property);

    setFormData({
      title: property.title || "",
      propertyType: property.propertyType || "",
      furnished: property.furnished || "",
      description: property.description || property.desciption || "",
      purpose: property.purpose || "",
      price: property.price || "",
      city: property.city || "",
      state: property.state || "",
      images: [],
    });

    setIsOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsOpen(false);

    setEditingProperty(null);

    setFormData(initialFormData);
  };

  // Handle Inputs
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Multiple Images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  // Add or Update Property
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("propertyType", formData.propertyType);
      data.append("furnished", formData.furnished);
      data.append("description", formData.description);
      data.append("purpose", formData.purpose);
      data.append("price", formData.price);
      data.append("city", formData.city);
      data.append("state", formData.state);

      // Multiple Images
      formData.images.forEach((image) => {
        data.append("images", image);
      });

      if (editingProperty) {
        // Update
        await updateProperty(editingProperty._id, data);
      } else {
        // Add
        await addProperty(data);
      }

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Property
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProperty(id);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading && properties.length === 0) {
    return <Loader />;
  }

  const propertyList = Array.isArray(properties) ? properties : [];

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-6 lg:p-8">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">My Properties</h1>

          <p className="text-stone-500 mt-1">
            Manage all your listed properties.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-stone-900 hover:bg-black text-white px-5 py-3 rounded-xl transition"
        >
          <Plus size={18} />
          Add Property
        </button>
      </div>

      {/* Property Table */}

      {propertyList.length > 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead className="bg-stone-900 text-white">
              <tr>
                <th className="p-4 text-left">Property</th>

                <th className="p-4 text-left">City</th>

                <th className="p-4 text-left">Price</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {propertyList.map((property) => (
                <tr
                  key={property._id}
                  className="border-b border-stone-100 hover:bg-stone-50 transition"
                >
                  {/* Property */}

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {property.images?.[0] && (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                      )}

                      <div>
                        <p className="font-semibold text-stone-900">
                          {property.title}
                        </p>

                        <p className="text-xs text-stone-500 capitalize mt-1">
                          {property.propertyType}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* City */}

                  <td className="p-4 text-stone-600">{property.city}</td>

                  {/* Price */}

                  <td className="p-4 font-medium text-stone-800">
                    ₹{Number(property.price).toLocaleString("en-IN")}
                  </td>

                  {/* Status */}

                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize
                      ${
                        property.status?.toLowerCase() === "approved"
                          ? "bg-green-100 text-green-700"
                          : property.status?.toLowerCase() === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {property.status || "Pending"}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 transition"
                        title="View Property"
                      >
                        {/* <Eye size={18} /> */}
                      </button>

                      <button
                        onClick={() => openEditModal(property)}
                        className="p-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition"
                        title="Edit Property"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(property._id)}
                        className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                        title="Delete Property"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */

        <div className="bg-white rounded-2xl border border-stone-200 py-20 text-center">
          <h2 className="text-xl font-semibold text-stone-800">
            No Properties Yet
          </h2>

          <p className="text-stone-500 mt-2">
            Add your first property to get started.
          </p>

          <button
            onClick={openAddModal}
            className="mt-6 bg-stone-900 text-white px-6 py-3 rounded-xl hover:bg-black transition"
          >
            Add Property
          </button>
        </div>
      )}

      {/* Add / Edit Property Modal */}

      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {/* Modal Header */}

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-stone-900">
              {editingProperty ? "Edit Property" : "Add Property"}
            </h2>

            <p className="text-sm text-stone-500 mt-1">
              {editingProperty
                ? "Update your property information."
                : "Enter the details of your new property."}
            </p>
          </div>

          {/* Form */}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Property Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Luxury Villa"
                required
                className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900"
              />
            </div>

            {/* Property Type + Purpose */}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Property Type
                </label>

                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none bg-white"
                >
                  <option value="">Select Type</option>

                  <option value="Apartment">Apartment</option>

                  <option value="Villa">Villa</option>

                  <option value="House">House</option>

                  <option value="Plot">Plot</option>

                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Purpose
                </label>

                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none bg-white"
                >
                  <option value="">Select Purpose</option>

                  <option value="Sale">Sale</option>

                  <option value="Rent">Rent</option>
                </select>
              </div>
            </div>

            {/* Furnished + Price */}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Furnished
                </label>

                <select
                  name="furnished"
                  value={formData.furnished}
                  onChange={handleChange}
                  required
                  className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none bg-white"
                >
                  <option value="">Select</option>

                  <option value="Furnished">Furnished</option>

                  <option value="Semi-Furnished">Semi-Furnished</option>

                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="5000000"
                  required
                  className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900"
                />
              </div>
            </div>

            {/* City + State */}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900"
                />
              </div>
            </div>

            {/* Description */}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your property..."
                className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900 resize-none"
              />
            </div>

            {/* Images */}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Property Images
              </label>

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-stone-300 rounded-xl p-6 cursor-pointer hover:bg-stone-50 transition">
                <Upload size={28} className="text-stone-400" />

                <p className="text-sm text-stone-600 mt-2">
                  Choose property images
                </p>

                <p className="text-xs text-stone-400 mt-1">Maximum 10 images</p>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* Selected Files */}

              {formData.images.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-stone-600">
                    {formData.images.length} image(s) selected
                  </p>
                </div>
              )}
            </div>

            {/* Buttons */}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 border border-stone-300 py-3 rounded-xl hover:bg-stone-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-stone-900 text-white py-3 rounded-xl hover:bg-black transition disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editingProperty
                    ? "Update Property"
                    : "Add Property"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
