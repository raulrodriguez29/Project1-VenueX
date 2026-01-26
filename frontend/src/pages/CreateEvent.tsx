import Navbar from "../components/navbar/Navbar";
import Blank from "../components/Blank";
import Calendar from "../components/Calendar/Calendar";
import Footer from "../components/Footer";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVenue } from "../api/venue.api";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await createVenue(formData);
      navigate("/venues"); // redirect after success
    } catch (err) {
      setError("Failed to create venue. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
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
            <div className="pt-4">
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
        {/* Venue */}
        <div className="flex flex-col gap-1">
        <label
            htmlFor="venue-select"
            className="text-sm text-gray-700"
        >
            Venue
        </label>{" "}
        <select
            id="venue-select"
            name="venue"
            className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-[#720a24]"
            required
        >
            {" "}
            <option value="">--Select a venue--</option>{" "}
            <option value="consultation"> Consultation</option>{" "}
            <option value="design"> Design Review</option>{" "}
            <option value="development"> Development</option>{" "}
        </select>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-[#720a24]"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1">
          <label htmlFor="location" className="text-sm text-gray-700">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-[#720a24]"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#720a24]"
          />
        </div>
        <div className="pt-2"></div>
        <div className="flex">
            <div className="w-1/3">
                <Calendar />
            </div>
        </div>
        {/* Error */}
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 py-2 rounded-md bg-[#720a24] text-white font-semibold hover:opacity-90 disabled:opacity-50 transition"
        >
          {isSubmitting ? "Creating..." : "Create Event"}
        </button>
        </form>
        </Blank>
        <Footer />
    </>
  )
}