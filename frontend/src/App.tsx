/*
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";       
import Register from "./pages/Register";
import Venues from "./pages/venues";
import Cart from "./user/Cart";
import Checkout from "./user/Checkout";
import EventDetails from "./pages/EventDetails";

export default function App() {
  return (
    <div className="h-full w-full overflow-auto font-body bg-black text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </div>
  );
}
*/

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Venues from "./pages/venues";
import UserRoutes from "./user/UserRoutes";
import Ticket from "./user/Ticket";


export default function App() {
  return (
    <div className="h-full w-full overflow-auto font-body bg-black text-white">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/venues" element={<Venues />} />

        {/* User route group */}
        <Route path="/user/*" element={<UserRoutes />} />

        {/* Optional: keep old paths working by redirecting */}
        <Route path="/cart" element={<Navigate to="/user/cart" replace />} />
        <Route path="/checkout" element={<Navigate to="/user/checkout" replace />} />

        <Route path="/events/:eventId/tickets" element={<Ticket />} />
      </Routes>
    </div>
  );
}