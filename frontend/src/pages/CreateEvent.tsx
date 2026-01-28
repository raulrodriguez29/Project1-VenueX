import { useState, useEffect } from 'react';
import Navbar from "../components/navbar/Navbar";
import Blank from "../components/Blank";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import { createEvent, createEventSeatSections } from "../api/events.api"; 
import { getAllVenues } from "../api/venue.api"; 
import type { Venue } from "../types/Venue";

interface CreateEventRequest {
  venue: { id: number };
  name: string;
  description: string;
  startTime: string;
}

interface CreateEventSeatSectionRequest {
  seatSectionName: string;
  price: string;
}

export default function CreateEvent() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    venueId: 0,
    name: "",
    description: "",
    startTime: "",
  });
  
  const [venues, setVenues] = useState<Venue[]>([]);
  const [createdEventId, setCreatedEventId] = useState<number | null>(null); // NEW
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingSections, setIsSubmittingSections] = useState(false); // NEW
  const [error, setError] = useState<string | null>(null);
  const [sectionError, setSectionError] = useState<string | null>(null); // NEW
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  
  // Seat sections state
  const [sections, setSections] = useState<Record<string, string>>({
    VIP: "",
    Premium: "",
    Floor: "",
    General: "",
  }); 

  useEffect(() => {
    getAllVenues()
      .then(res => setVenues(res.data))
      .catch(err => console.error("Failed to load venues:", err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
    
    if (name === 'venueId') {
      setFormData(prev => ({ ...prev, venueId: Number(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSectionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSections(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.venueId) newErrors.venueId = "Venue required";
    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.description.trim()) newErrors.description = "Description required";
    if (!formData.startTime) newErrors.startTime = "Date required";

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const eventData: CreateEventRequest = {
        venue: { id: formData.venueId },
        name: formData.name,
        description: formData.description,
        startTime: formData.startTime,
      };
      
      const response = await createEvent(eventData);
      setCreatedEventId(response.data.id);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSectionSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!createdEventId) return;

  setIsSubmittingSections(true);
  setSectionError(null);

  try {
    const sectionData: CreateEventSeatSectionRequest[] = Object.entries(sections)
      .filter(([_, price]) => price && Number(price) >= 0)
      .map(([seatSectionName, price]) => ({
        seatSectionName,
        price: price.toString()
      }));

    if (sectionData.length === 0) {
      setSectionError("Please enter at least one valid price");
      return;
    }

    await createEventSeatSections(createdEventId, sectionData);
    navigate("/");
  } catch (err: any) {
    setSectionError(err.response?.data?.message || "Failed to create seat sections.");
    console.error("Error:", err.response?.data);
  } finally {
    setIsSubmittingSections(false);
  }
};


  return (
    <>
      <Navbar />
      <Blank>
        <h2
          className="font-display text-4xl md:text-5xl tracking-wide"
          style={{ color: "#720a24" }}
        >
          CREATE A NEW EVENT
        </h2>
        <div className="pt-4" />
        
        {/* Event Creation Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Venue, Name, Description, Date/Time fields - SAME AS BEFORE */}
          {/* Venue */}
          <div className="flex flex-col gap-1">
            <label htmlFor="venueId" className="text-sm text-gray-700">
              Venue *
            </label>
            <select
              id="venueId"
              name="venueId"
              value={formData.venueId || ""}
              onChange={handleChange}
              className={`px-3 py-2 rounded-md bg-[#1a1a1a] border ${
                fieldErrors.venueId ? 'border-red-500' : 'border-[#333]'
              } text-white focus:outline-none focus:ring-2 focus:ring-[#720a24] ${!formData.venueId ? 'text-gray-500' : ''}`}
              required
            >
              <option value="">--Select a venue--</option>
              {venues.map(venue => (
                <option key={venue.id} value={venue.id}>
                  {venue.id} - {venue.name}
                </option>
              ))}
            </select>
            {fieldErrors.venueId && (
              <p className="text-xs text-red-400 mt-1">{fieldErrors.venueId}</p>
            )}
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-gray-700">
              Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`px-3 py-2 rounded-md bg-[#1a1a1a] border ${
                fieldErrors.name ? 'border-red-500' : 'border-[#333]'
              } text-white focus:outline-none focus:ring-2 focus:ring-[#720a24]`}
              required
            />
            {fieldErrors.name && (
              <p className="text-xs text-red-400 mt-1">{fieldErrors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm text-gray-700">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`px-3 py-2 rounded-md bg-[#1a1a1a] border ${
                fieldErrors.description ? 'border-red-500' : 'border-[#333]'
              } text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#720a24]`}
              required
            />
            {fieldErrors.description && (
              <p className="text-xs text-red-400 mt-1">{fieldErrors.description}</p>
            )}
          </div>

          {/* Date/Time */}
          <div className="flex flex-col gap-1">
            <label htmlFor="startTime" className="text-sm text-gray-700">
              Date & Time *
            </label>
            <input
              id="startTime"
              name="startTime"
              type="datetime-local"
              value={formData.startTime}
              onChange={handleChange}
              className={`px-3 py-2 rounded-md bg-[#1a1a1a] border ${
                fieldErrors.startTime ? 'border-red-500' : 'border-[#333]'
              } text-white focus:outline-none focus:ring-2 focus:ring-[#720a24]`}
              required
            />
            {fieldErrors.startTime && (
              <p className="text-xs text-red-400 mt-1">{fieldErrors.startTime}</p>
            )}
          </div>

          <div className="pt-2"></div>
          <div className="flex">
            <div className="w-1/3">
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 py-2 rounded-md bg-[#720a24] text-white font-semibold hover:opacity-90 disabled:opacity-50 transition"
          >
            {isSubmitting ? "Creating..." : "Create Event"}
          </button>
        </form>

        {/* Seat Sections Form - Shown after event creation */}
        {createdEventId && (
          <div className="mt-10 border-t border-gray-700 pt-6">
            <h3 className="text-2xl font-semibold text-[#720a24] mb-4">
              Seat Section Prices
            </h3>

            <form onSubmit={handleSectionSubmit} className="space-y-4">
              {["VIP", "Premium", "Floor", "General"].map((type) => (
                <div key={type} className="flex items-center gap-4">
                  <label className="w-24 text-black font-medium">{type}</label>
                  <input
                    type="number"
                    name={type}
                    min={0}
                    step="0.01"
                    required
                    value={sections[type as keyof typeof sections]}
                    onChange={handleSectionChange}
                    className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white w-32 focus:outline-none focus:ring-2 focus:ring-[#720a24]"
                    placeholder="0.00"
                  />
                </div>
              ))}

              {sectionError && (
                <p className="text-sm text-red-400">{sectionError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmittingSections}
                className="w-full mt-4 py-2 rounded-md bg-[#720a24] text-white font-semibold hover:opacity-90 disabled:opacity-50 transition"
              >
                {isSubmittingSections ? "Creating Sections..." : "Create Seat Sections"}
              </button>
            </form>
          </div>
        )}
      </Blank>
      <Footer />
    </>
  );
}
