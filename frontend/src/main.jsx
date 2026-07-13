import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserProvider from "./components/context/userContext.jsx";
import PropertyProvider from "./components/context/PropertyContext.jsx";
import BookingProvider from "./components/context/BookingContext.jsx";
import FavoriteProvider from "./components/context/FavoriteContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <FavoriteProvider>
        <PropertyProvider>
          <BookingProvider>
            <App />
          </BookingProvider>
        </PropertyProvider>
      </FavoriteProvider>
    </UserProvider>
  </StrictMode>,
);
