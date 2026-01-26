<<<<<<< HEAD
import { Routes, Route, } from "react-router-dom";
=======
/*
import { Routes, Route } from "react-router-dom";
>>>>>>> origin/arjun_bookPayTicket
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";       
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"
import Venues from "./pages/Venues/Venues";
import Cart from "./user/Cart";
import Checkout from "./user/Checkout";
import CreateVenue from "./pages/Venues/CreateVenue";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import ContactForm from "./pages/ContactForm";
import VenueDetails from "./pages/Venues/VenueDetails";
import Profile from "./user/Profile";
import EditVenue from "./pages/Venues/EditVenue";
import EditEvent from "./pages/EditEvent";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import Notifications from "./pages/Notifications";
import HostRequests from "./pages/HostRequests";

export default function App() {
  return (
    <div className="h-full w-full overflow-auto font-body bg-black text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/contact-form" element={<ContactForm />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venues/create" element={<CreateVenue />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/host-requests" element={<HostRequests />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/venues/:id" element={<VenueDetails />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/venues/:id/edit" element={< EditVenue />} />
        <Route path="/events/:id/edit" element={<EditEvent />} />
        <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
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