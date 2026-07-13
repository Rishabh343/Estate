import React, { useContext, useState } from "react";
import {
  Heart,
  MapPin,
  Trash2,
  Building2,
  IndianRupee,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { FavoriteContext } from "../../context/FavoriteContext";
import Loader from "../../common/Loader";
import Modal from "../../common/Modal";

export default function Favorites() {
  const { favorites, loading, removeFavorite } = useContext(FavoriteContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleRemoveFavorite = async (propertyId) => {
    try {
      await removeFavorite(propertyId);

      // Close modal if removed from modal
      if (selectedProperty?._id === propertyId) {
        setIsModalOpen(false);
        setSelectedProperty(null);
      }
    } catch (error) {
      console.log(
        "Remove Favorite Error:",
        error.response?.data || error.message,
      );
    }
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const getPropertyImage = (property) => {
    if (Array.isArray(property?.images)) {
      return property.images[0];
    }

    return property?.images;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">My Favorites</h1>

        <p className="mt-1 text-sm text-stone-500">
          Properties you've saved for later.
        </p>
      </div>

      {favorites.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {favorites.map((favorite) => {
            const property = favorite.property;

            // Property may have been deleted
            if (!property) return null;

            return (
              <div
                key={favorite._id}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  border
                  border-stone-200
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <div className="relative overflow-hidden">
                  <img
                    src={getPropertyImage(property)}
                    alt={property.title}
                    className="
                      h-44
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* Favorite Heart */}

                  <button
                    type="button"
                    onClick={() => handleRemoveFavorite(property._id)}
                    className="
                      absolute
                      right-3
                      top-3
                      rounded-full
                      bg-white/95
                      p-2
                      shadow-sm
                      transition
                      hover:bg-red-50
                    "
                    title="Remove from favorites"
                  >
                    <Heart size={17} className="fill-red-500 text-red-500" />
                  </button>

                  {/* Property Type */}

                  <span
                    className="
                      absolute
                      bottom-3
                      left-3
                      rounded-full
                      bg-black/65
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-white
                      backdrop-blur-sm
                    "
                  >
                    {property.propertyType}
                  </span>
                </div>

                <div className="p-4">
                  {/* Title + Price */}

                  <div className="flex items-start justify-between gap-3">
                    <h2 className="line-clamp-1 text-lg font-semibold text-stone-900">
                      {property.title}
                    </h2>

                    <span className="shrink-0 text-sm font-semibold text-stone-900">
                      ₹{Number(property.price).toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Location */}

                  <div className="mt-3 flex items-center gap-2 text-sm text-stone-500">
                    <MapPin size={15} className="shrink-0" />

                    <span className="line-clamp-1">
                      {property.city}

                      {property.state && `, ${property.state}`}
                    </span>
                  </div>

                  {/* Divider */}

                  <div className="my-4 h-px bg-stone-100" />

                  {/* Buttons */}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleViewDetails(property)}
                      className="
                        flex-1
                        rounded-xl
                        bg-stone-900
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-black
                      "
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveFavorite(property._id)}
                      className="
                        flex
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-red-200
                        px-3
                        text-red-500
                        transition
                        hover:bg-red-50
                      "
                      title="Remove from favorites"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24">
          <Heart size={60} className="text-stone-300" />

          <h2 className="mt-5 text-xl font-semibold text-stone-800">
            No Favorite Properties
          </h2>

          <p className="mt-2 text-sm text-stone-500">
            Start exploring and save properties you love.
          </p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Property Details"
      >
        {selectedProperty && (
          <div className="space-y-4">
            {/* Property Image */}

            <img
              src={getPropertyImage(selectedProperty)}
              alt={selectedProperty.title}
              className="h-40 w-full rounded-xl object-cover"
            />

            {/* Title + Type */}

            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-stone-900">
                  {selectedProperty.title}
                </h2>

                <p className="mt-1 text-xs text-stone-500">
                  {selectedProperty.propertyType}
                </p>
              </div>

              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                {selectedProperty.status || "Available"}
              </span>
            </div>

            {/* Price */}

            <div className="flex items-center justify-between border-y border-stone-100 py-3">
              <div className="flex items-center gap-2 text-sm text-stone-500">
                <IndianRupee size={16} />
                Property Price
              </div>

              <span className="font-semibold text-stone-900">
                ₹{Number(selectedProperty.price || 0).toLocaleString("en-IN")}
              </span>
            </div>

            {/* Property Details */}

            <div className="space-y-3">
              {/* Location */}

              <div className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-stone-400" />

                <div>
                  <p className="text-xs text-stone-400">Location</p>

                  <p className="text-sm font-medium text-stone-700">
                    {selectedProperty.city || "Not available"}

                    {selectedProperty.state && `, ${selectedProperty.state}`}
                  </p>
                </div>
              </div>

              {/* Property Type */}

              <div className="flex items-start gap-3">
                <Building2
                  size={17}
                  className="mt-0.5 shrink-0 text-stone-400"
                />

                <div>
                  <p className="text-xs text-stone-400">Property Type</p>

                  <p className="text-sm font-medium text-stone-700">
                    {selectedProperty.propertyType || "Not available"}
                  </p>
                </div>
              </div>

              {/* Owner */}

              {selectedProperty.owner?.name && (
                <div className="flex items-start gap-3">
                  <User size={17} className="mt-0.5 shrink-0 text-stone-400" />

                  <div>
                    <p className="text-xs text-stone-400">Property Owner</p>

                    <p className="text-sm font-medium text-stone-700">
                      {selectedProperty.owner.name}
                    </p>
                  </div>
                </div>
              )}

              {/* Owner Email */}

              {selectedProperty.owner?.email && (
                <div className="flex items-start gap-3">
                  <Mail size={17} className="mt-0.5 shrink-0 text-stone-400" />

                  <div>
                    <p className="text-xs text-stone-400">Owner Email</p>

                    <p className="text-sm font-medium text-stone-700">
                      {selectedProperty.owner.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Owner Phone */}

              {selectedProperty.owner?.phone && (
                <div className="flex items-start gap-3">
                  <Phone size={17} className="mt-0.5 shrink-0 text-stone-400" />

                  <div>
                    <p className="text-xs text-stone-400">Owner Phone</p>

                    <p className="text-sm font-medium text-stone-700">
                      {selectedProperty.owner.phone}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Remove Favorite */}

            <button
              type="button"
              onClick={() => handleRemoveFavorite(selectedProperty._id)}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-200
                py-2.5
                text-sm
                font-medium
                text-red-600
                transition
                hover:bg-red-50
              "
            >
              <Trash2 size={16} />
              Remove from Favorites
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
