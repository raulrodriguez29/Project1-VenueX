import { Routes, Route } from "react-router-dom";
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
import Notifications from "./pages/Notifications";

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
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/venues/:id" element={<VenueDetails />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/venues/:id/edit" element={< EditVenue />} />
      </Routes>
    </div>
  );
}