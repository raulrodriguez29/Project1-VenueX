/*
import { Routes, Route, Navigate } from "react-router-dom";

import Profile from "./Profile";
import Bookings from "./Bookings";
import BookingDetails from "./BookingDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Payments from "./Payments";
import Notifications from "./Notifications";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="profile" element={<Profile />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="bookings/:id" element={<BookingDetails />} />

      {// Cart + Checkout live under /user/... }
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />

      <Route path="payments" element={<Payments />} />
      <Route path="notifications" element={<Notifications />} />

      {// Fallback }
      <Route path="*" element={<Navigate to="bookings" replace />} />
    </Routes>
  );
}
*/
import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "./Cart";
import Checkout from "./Checkout";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="cart" replace />} />
    </Routes>
  );
}
