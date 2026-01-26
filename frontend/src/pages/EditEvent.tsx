import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar/Navbar";
import Blank from "../components/Blank";
import Footer from "../components/Footer";
import { 
    deleteEvent,
  updateEvent, 
  updateEventSeatSection 
} from "../api/events.api";
import type { UpdateEvents } from "../types/Events";
//import type { EventSeatSectionForm } from "../types/EventSeatSection";

export default function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const eventId = Number(id);

  // Event form - starts EMPTY
  const [formData, setFormData] = useState<UpdateEvents>({
    name: "",
    description: "",
    startTime: "",
  });
  
  // Seat sections form - starts EMPTY  
  const [sectionsForm, setSectionsForm] = useState<Record<string, string>>({
    VIP: "",
    Premium: "",
    Floor: "",
    General: "",
  });

  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [isSubmittingSections, setIsSubmittingSections] = useState(false);
  
  // SEPARATE success/error states for each form
  const [eventMessage, setEventMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [sectionsMessage, setSectionsMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (eventMessage) setEventMessage(null); // Clear message when typing
  };

  const handleSectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSectionsForm(prev => ({ ...prev, [name]: value }));
    if (sectionsMessage) setSectionsMessage(null); // Clear message when typing
  };

  // Filter out empty fields for event update
  const getValidEventData = () => {
    const validData: Partial<UpdateEvents> = {};
    if (formData.name.trim()) validData.name = formData.name.trim();
    if (formData.description.trim()) validData.description = formData.description.trim();
    if (formData.startTime) validData.startTime = formData.startTime;
    return validData;
  };

  const handleDeleteEvent = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this venue? This action cannot be undone."
    );
  
    if (!confirmed) return;
  
    try {
      await deleteEvent(eventId);
      navigate("/"); 
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete venue");
    }
  };

  // Filter out empty seat sections
  const getValidSectionsData = () => {
    const validSections = Object.entries(sectionsForm)
      .filter(([_, price]) => price && price.trim() !== "" && Number(price) >= 0)
      .map(([seatSectionName, price]) => ({
        seatSectionName,
        price: Number(price)  
      }));

    return validSections; 
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validData = getValidEventData();
    
    // Only submit if there's data to update
    if (Object.keys(validData).length === 0) {
      setEventMessage({ type: 'error', text: "Please enter at least one field to update" });
      return;
    }

    setIsSubmittingEvent(true);
    setEventMessage(null);

    try {
      await updateEvent(eventId, validData as UpdateEvents);
      setEventMessage({ type: 'success', text: "Event updated successfully!" });
      setFormData({ name: "", description: "", startTime: "" }); // Clear form
    } catch (err: any) {
      setEventMessage({ type: 'error', text: err.response?.data?.message || "Failed to update event" });
      console.error("Event update error:", err);
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  const handleSectionsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validSections = getValidSectionsData();
    
    if (validSections.length === 0) {
      setSectionsMessage({ type: 'error', text: "Please enter at least one valid price" });
      return;
    }

    setIsSubmittingSections(true);
    setSectionsMessage(null);

    try {
      await updateEventSeatSection(eventId, validSections as any);
      setSectionsMessage({ type: 'success', text: "Seat sections updated successfully!" });
      setSectionsForm({ VIP: "", Premium: "", Floor: "", General: "" }); // Clear form
    } catch (err: any) {
      setSectionsMessage({ type: 'error', text: err.response?.data?.message || "Failed to update seat sections" });
      console.error("Sections error:", err.response?.data);
    } finally {
      setIsSubmittingSections(false);
    }
  };

  return (
    <>
      <Navbar />
      <Blank>
        <h2 className="font-display text-4xl md:text-5xl tracking-wide" style={{ color: "#720a24" }}>
          EDIT EVENT
        </h2>
        <button
            className="px-4 py-2 text-sm rounded-md border border-black-500 text-red-400 hover:bg-red-500 hover:text-white transition"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteEvent();
            }}>
            Delete Venue
          </button>
        <div className="pt-4" />

        {/* Horizontal Dual Forms */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          
          {/* EVENT EDIT FORM - WIDER */}
          <form onSubmit={handleEventSubmit} className="flex-1 bg-[#1a1a1a] p-8 rounded-2xl border border-[#333] space-y-6 max-w-4xl">
            <h3 className="text-2xl font-semibold text-white mb-6">Event Details</h3>
            
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm text-gray-700">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleEventChange}
                className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-[#720a24]"
                placeholder="Enter new event name"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-sm text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleEventChange}
                rows={3}
                className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#720a24]"
                placeholder="Enter new description"
              />
            </div>

            {/* Date/Time */}
            <div className="flex flex-col gap-1">
              <label htmlFor="startTime" className="text-sm text-gray-700">Date & Time</label>
              <input
                id="startTime"
                name="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={handleEventChange}
                className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-[#720a24]"
              />
            </div>

            {/* EVENT-SPECIFIC MESSAGE (SUCCESS/ERROR) */}
            {eventMessage && (
              <div className={`p-3 border rounded-lg ${
                eventMessage.type === 'success' 
                  ? 'bg-green-900/30 border-green-500' 
                  : 'bg-red-900/30 border-red-500'
              }`}>
                <p className={`text-sm ${
                  eventMessage.type === 'success' 
                    ? 'text-green-400' 
                    : 'text-red-400'
                }`}>
                  {eventMessage.text}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmittingEvent}
              className="w-full py-2 rounded-md bg-[#720a24] text-white font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {isSubmittingEvent ? "Updating..." : "Update Event"}
            </button>
          </form>

          {/* SEAT SECTIONS FORM - NARROWER */}
          <form onSubmit={handleSectionsSubmit} className="w-full lg:w-80 bg-[#1a1a1a] p-6 rounded-2xl border border-[#333] space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Seat Prices</h3>
            
            <div className="space-y-3">
              {["VIP", "Premium", "Floor", "General"].map((type) => (
                <div key={type} className="flex items-center h-12">
                  <label className="w-15 text-sm font-medium text-white capitalize flex-shrink-0">
                    {type}
                  </label>
                  <input
                    type="number"
                    name={type}
                    min={0}
                    step="0.01"
                    value={sectionsForm[type] || ""}
                    onChange={handleSectionChange}
                    className="flex-1 px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-[#720a24] h-10 ml-3"
                    placeholder="0.00"
                  />
                </div>
              ))}
            </div>

            {/* SECTIONS-SPECIFIC MESSAGE (SUCCESS/ERROR) */}
            {sectionsMessage && (
              <div className={`p-3 border rounded-lg ${
                sectionsMessage.type === 'success' 
                  ? 'bg-green-900/30 border-green-500' 
                  : 'bg-red-900/30 border-red-500'
              }`}>
                <p className={`text-sm ${
                  sectionsMessage.type === 'success' 
                    ? 'text-green-400' 
                    : 'text-red-400'
                }`}>
                  {sectionsMessage.text}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmittingSections}
              className="w-full py-2 rounded-md bg-[#720a24] text-white font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {isSubmittingSections ? "Updating..." : "Update Prices"}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-md bg-gray-700 text-white font-semibold hover:bg-gray-600 transition"
          >
            Back
          </button>
        </div>
      </Blank>
      <Footer />
    </>
  );
}
