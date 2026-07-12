import React, { useContext, useState } from "react";
import { Heart, MapPin } from "lucide-react";
import { PropertyContext } from "../../context/PropertyContext";
import { BookingContext } from "../../context/BookingContext";


export default function Properties() {
  const [search, setSearch] = useState("");

  const { properties, searchProperty, filterProperty } =
    useContext(PropertyContext);
  const { createBooking } = useContext(BookingContext);
  const handleBooking = async (propertyId) => {
    try {
      const response = await createBooking(propertyId);
      alert(response.message || "Booking Created Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Booking Failed");
    }
  };
  return (
    <div className="min-h-screen bg-stone-100 p-8">
      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-stone-900">
          Discover Properties
        </h1>

        <p className="text-stone-500 mt-2">
          Browse homes, apartments and villas across India.
        </p>
      </div>

      {/* Search & Filter */}

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}

        <input
          type="text"
          placeholder="Search by property or city..."
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
          className="flex-1 bg-white rounded-xl border px-4 py-3 outline-none shadow-sm"
        />

        {/* Property Type */}

        <select
          onChange={(e) => filterProperty("", e.target.value)}
          className="bg-white rounded-xl border px-4 py-3 shadow-sm"
        >
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Farm House">Farm House</option>
          <option value="Plot">Plot</option>
        </select>

        {/* City */}

        <select
          onChange={(e) => filterProperty(e.target.value, "")}
          className="bg-white rounded-xl border px-4 py-3 shadow-sm"
        >
          <option value="">All Cities</option>
          <option value="Delhi">Delhi</option>
          <option value="Noida">Noida</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="Mumbai">Mumbai</option>
        </select>
      </div>

      {/* Property Cards */}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
          >
            {/* Image */}

            <div className="relative">
              <img
                src={property.images?.[0]}
                alt={property.title}
                className="h-72 w-full object-cover"
              />

              <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-red-50">
                <Heart size={20} className="text-red-500" />
              </button>
            </div>

            {/* Content */}

            <div className="p-6">
              <div className="flex justify-between items-center">
                <span className="bg-stone-100 px-3 py-1 rounded-full text-sm">
                  {property.propertyType}
                </span>

                <span className="text-xl font-bold">₹{property.price}</span>
              </div>

              <h2 className="text-2xl font-semibold mt-5">{property.title}</h2>

              <div className="flex items-center gap-2 text-stone-500 mt-3">
                <MapPin size={18} />
                <span>
                  {property.city}, {property.state}
                </span>
              </div>

              <div className="mt-3 text-gray-600 line-clamp-2">
                {property.description || property.desciption}
              </div>

              {/* Buttons */}

              <div className="flex gap-3 mt-8">
                <button className="flex-1 bg-stone-900 text-white py-3 rounded-xl hover:bg-black transition">
                  View Details
                </button>

                <button
                  onClick={() => handleBooking(property._id)}
                  className="flex-1 border border-stone-900 text-stone-900 py-3 rounded-xl hover:bg-stone-900 hover:text-white transition"
                >
                  Book Visit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}

      {properties.length === 0 && (
        <div className="text-center py-24">
          <h2 className="text-2xl font-semibold">No Properties Found</h2>

          <p className="text-stone-500 mt-2">
            Try searching or changing the filters.
          </p>
        </div>
      )}
    </div>
  );
}
