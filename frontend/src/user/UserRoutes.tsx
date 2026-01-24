import { Routes, Route, Navigate } from "react-router-dom";

import Profile from "./Profile";
import Bookings from "./Bookings";
import BookingDetails from "./BookingDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Payments from "./Payments";
import Notifications from "./Notifications";
import { JSX } from "react/jsx-runtime";

export default function UserRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="profile" element={<Profile />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="bookings/:id" element={<BookingDetails />} />

      {/* ✅ your new pages */}
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />

      <Route path="payments" element={<Payments />} />
      <Route path="notifications" element={<Notifications />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="bookings" replace />} />
    </Routes>
  );
}