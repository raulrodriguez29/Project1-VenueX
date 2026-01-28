import { Routes, Route, Navigate, } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";       
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"
import Venues from "./pages/Venues/Venues";
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
import UserRoutes from "./user/UserRoutes";
import Bookings from "./user/Bookings";
import Ticket from "./user/Ticket";

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
        <Route path="/host-requests" element={<HostRequests />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/venues/:id" element={<VenueDetails />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/venues/:id/edit" element={< EditVenue />} />
        <Route path="/events/:id/edit" element={<EditEvent />} />
        <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        <Route path="/user/*" element={<UserRoutes />} />

        <Route path="/cart" element={<Navigate to="/user/cart" replace />} />
        <Route path="/checkout" element={<Navigate to="/user/checkout" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="/events/:eventId/tickets" element={<Ticket />} />
      </Routes>
    </div>
  );
}