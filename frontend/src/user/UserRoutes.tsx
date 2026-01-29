import { Routes, Route, Navigate } from "react-router-dom";
import Checkout from "./Checkout";
import Bookings from "./Bookings";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="checkout" element={<Checkout />} />
      <Route path="*" element={<Navigate to="cart" replace />} />
      <Route path="bookings" element={<Bookings />} />
    </Routes>
  );
}