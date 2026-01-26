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
