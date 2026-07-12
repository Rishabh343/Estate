import React from "react";
import { Heart, MapPin, Trash2 } from "lucide-react";

export default function Favorites() {
  const favorites = [
    {
      id: 1,
      title: "Luxury Villa",
      city: "Chandigarh",
      price: "₹80,00,000",
      type: "Villa",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900",
    },
    {
      id: 2,
      title: "Modern Apartment",
      city: "Delhi",
      price: "₹45,00,000",
      type: "Apartment",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900",
    },
    {
      id: 3,
      title: "Farm House",
      city: "Noida",
      price: "₹1,20,00,000",
      type: "Farm House",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-100 p-8">

      {/* Heading */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-stone-800">
          My Favorites
        </h1>

        <p className="text-stone-500 mt-2">
          Properties you've saved for later.
        </p>
      </div>

      {/* Cards */}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {favorites.map((property) => (
          <div
            key={property.id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Image */}

            <div className="relative">

              <img
                src={property.image}
                alt={property.title}
                className="h-64 w-full object-cover"
              />

              <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md transition hover:bg-red-50">
                <Heart size={20} className="fill-red-500 text-red-500" />
              </button>

            </div>

            {/* Details */}

            <div className="p-6">

              <div className="mb-3 flex items-center justify-between">

                <span className="rounded-full bg-stone-100 px-3 py-1 text-sm">
                  {property.type}
                </span>

                <span className="text-2xl font-bold text-stone-800">
                  {property.price}
                </span>

              </div>

              <h2 className="text-2xl font-semibold text-stone-900">
                {property.title}
              </h2>

              <div className="mt-3 flex items-center gap-2 text-stone-500">
                <MapPin size={16} />
                {property.city}
              </div>

              {/* Buttons */}

              <div className="mt-8 flex gap-3">

                <button className="flex-1 rounded-xl bg-stone-900 py-3 font-medium text-white transition hover:bg-black">
                  View Details
                </button>

                <button className="rounded-xl border border-red-200 px-4 transition hover:bg-red-50">
                  <Trash2 size={18} className="text-red-500" />
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Empty State (show when no favorites) */}

      {/*

      <div className="flex flex-col items-center justify-center py-24">

        <Heart
          size={70}
          className="text-stone-300"
        />

        <h2 className="mt-6 text-2xl font-semibold">
          No Favorite Properties
        </h2>

        <p className="mt-2 text-stone-500">
          Start exploring and save properties you love.
        </p>

      </div>

      */}
    </div>
  );
}