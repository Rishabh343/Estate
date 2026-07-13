import React, { useContext, useEffect, useState } from "react";
import { Heart, MapPin } from "lucide-react";
import { FavoriteContext } from "../../context/FavoriteContext";
import { BookingContext } from "../../context/BookingContext";
import { PropertyContext } from "../../context/PropertyContext";
import Modal from "../../common/Modal";

export default function Properties() {
  const [search, setSearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const {
    properties,
    getAllAppovedProperties,
    searchProperty,
    filterProperty,
    resetProperties,
  } = useContext(PropertyContext);

  const { createBooking } = useContext(BookingContext);

  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoriteContext);

  const isFavorite = (propertyId) => {
    return favorites.some(
      (favorite) =>
        favorite.property?._id === propertyId ||
        favorite.property === propertyId,
    );
  };

  const handleFavorite = async (propertyId) => {
    try {
      if (isFavorite(propertyId)) {
        await removeFavorite(propertyId);
      } else {
        await addFavorite(propertyId);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update favorite");
    }
  };

  const handleBooking = async (propertyId) => {
    try {
      const response = await createBooking(propertyId);

      alert(response.message || "Booking Created Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Booking Failed");
    }
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setSelectedProperty(null);
  };
  useEffect(() => {
    getAllAppovedProperties();
  }, []);
  return (
    <div className="min-h-screen bg-[#f5f3ef] p-4 md:p-6 lg:p-8">
      {/* Heading */}

      <div className="mb-7">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
          Explore
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">
          Discover Properties
        </h1>

        <p className="mt-2 text-sm text-stone-500">
          Browse thoughtfully selected homes, apartments and villas across
          India.
        </p>
      </div>

      {/* Search & Filters */}

      <div className="mb-7 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm md:flex-row">
        <input
          type="text"
          placeholder="Search property or city..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;

            setSearch(value);

            if (value.trim() === "") {
              resetProperties();
            } else {
              searchProperty(value);
            }
          }}
          className="flex-1 rounded-xl bg-stone-50 px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-stone-400"
        />

        <select
          onChange={(e) => filterProperty("", e.target.value)}
          className="rounded-xl bg-stone-50 px-4 py-2.5 text-sm outline-none"
        >
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Farm House">Farm House</option>
          <option value="Plot">Plot</option>
        </select>

        <select
          onChange={(e) => filterProperty(e.target.value, "")}
          className="rounded-xl bg-stone-50 px-4 py-2.5 text-sm outline-none"
        >
          <option value="">All Cities</option>
          <option value="Delhi">Delhi</option>
          <option value="Noida">Noida</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="Mumbai">Mumbai</option>
        </select>
      </div>

      {/* Property Cards */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {properties.map((property) => {
          const favorite = isFavorite(property._id);

          return (
            <div
              key={property._id}
              className="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}

              <div className="relative overflow-hidden">
                <img
                  src={property.images?.[0]}
                  alt={property.title}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <button
                  type="button"
                  onClick={() => handleFavorite(property._id)}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm"
                >
                  <Heart
                    size={18}
                    className={
                      favorite ? "fill-red-500 text-red-500" : "text-stone-600"
                    }
                  />
                </button>

                <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  {property.propertyType}
                </span>
              </div>

              {/* Content */}

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="line-clamp-1 text-lg font-semibold text-stone-900">
                    {property.title}
                  </h2>

                  <span className="shrink-0 text-base font-semibold">
                    ₹{Number(property.price).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-1.5 text-sm text-stone-500">
                  <MapPin size={15} />

                  <span>
                    {property.city}
                    {property.state && `, ${property.state}`}
                  </span>
                </div>

                <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-stone-500">
                  {property.description || property.desciption}
                </p>

                <div className="my-4 h-px bg-stone-100" />

                <div className="flex gap-2">
                  {/* VIEW DETAILS */}

                  <button
                    type="button"
                    onClick={() => handleViewDetails(property)}
                    className="flex-1 rounded-xl bg-stone-900 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-black"
                  >
                    View Details
                  </button>

                  {/* BOOK */}

                  <button
                    type="button"
                    onClick={() => handleBooking(property._id)}
                    className="flex-1 rounded-xl border border-stone-300 px-3 py-2.5 text-sm font-medium text-stone-800 transition hover:bg-stone-900 hover:text-white"
                  >
                    Book Visit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}

      {properties.length === 0 && (
        <div className="py-24 text-center">
          <h2 className="text-xl font-semibold">No Properties Found</h2>

          <p className="mt-2 text-sm text-stone-500">
            Try searching or changing the filters.
          </p>
        </div>
      )}

      <Modal
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
        title="Property Details"
      >
        {selectedProperty && (
          <div className="space-y-5">
            {/* Image */}

            <img
              src={selectedProperty.images?.[0]}
              alt={selectedProperty.title}
              className="h-56 w-full rounded-xl object-cover"
            />

            {/* Title + Price */}

            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-stone-900">
                  {selectedProperty.title}
                </h2>

                <p className="mt-1 text-sm text-stone-500">
                  {selectedProperty.propertyType}
                </p>
              </div>

              <p className="font-semibold text-stone-900">
                ₹{Number(selectedProperty.price).toLocaleString("en-IN")}
              </p>
            </div>

            {/* Location */}

            <div className="flex items-center gap-2 text-sm text-stone-600">
              <MapPin size={17} />

              <span>
                {selectedProperty.city}
                {selectedProperty.state && `, ${selectedProperty.state}`}
              </span>
            </div>

            {/* Description */}

            <div>
              <h3 className="mb-1 text-sm font-semibold text-stone-800">
                Description
              </h3>

              <p className="text-sm leading-6 text-stone-600">
                {selectedProperty.description ||
                  selectedProperty.desciption ||
                  "No description available."}
              </p>
            </div>

            {/* Owner */}

            {selectedProperty.owner && (
              <div className="rounded-xl bg-stone-50 p-4">
                <p className="text-xs uppercase tracking-wider text-stone-400">
                  Property Owner
                </p>

                <p className="mt-1 font-medium text-stone-800">
                  {selectedProperty.owner?.name || "Owner"}
                </p>

                {selectedProperty.owner?.email && (
                  <p className="mt-1 text-sm text-stone-500">
                    {selectedProperty.owner.email}
                  </p>
                )}
              </div>
            )}

            {/* Book From Modal */}

            <button
              type="button"
              onClick={() => {
                handleBooking(selectedProperty._id);
                handleCloseModal();
              }}
              className="w-full rounded-xl bg-stone-900 py-3 text-sm font-medium text-white transition hover:bg-black"
            >
              Book a Visit
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
