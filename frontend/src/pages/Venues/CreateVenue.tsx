import Navbar from "../../components/navbar/Navbar";
import Blank from "../../components/Blank";
import Footer from "../../components/Footer";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVenue, createSeatSections } from "../../api/venue.api";
import type { Venue } from "../../types/Venue";
import type { CreateSeatSectionRequest } from "../../types/SeatSection";

type SeatSectionForm = {
  VIP: number | "";
  Premium: number | "";
  Floor: number | "";
  General: number | "";
};

export default function CreateVenue() {
  const navigate = useNavigate();

  // venue form
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // created venue
  const [createdVenue, setCreatedVenue] = useState<Venue | null>(null);

  // seat sections
  const [sections, setSections] = useState<SeatSectionForm>({
    VIP: "",
    Premium: "",
    Floor: "",
    General: "",
  });
  const [sectionError, setSectionError] = useState<string | null>(null);
  const [isSubmittingSections, setIsSubmittingSections] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVenueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // create the venue
      console.log("TOKEN:", localStorage.getItem('token') ? "✅ EXISTS" : "❌ MISSING");
      console.log("ROLE:", localStorage.getItem('role'));
      const { data } = await createVenue(formData);
      setCreatedVenue(data); // keep the venue so we can create sections for it
    } catch (err) {
      setError("Failed to create venue. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSections((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const handleSectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSectionError(null);

    if (!createdVenue) return;

    // build payload
    const payload: CreateSeatSectionRequest[] = Object.entries(sections).map(
      ([type, capacity]) => ({
        type,
        capacity: Number(capacity),
      })
    );

    // basic front‑end validation: no blanks, no < 1
    if (payload.some((s) => !s.capacity || s.capacity < 1)) {
      setSectionError("All capacities must be at least 1.");
      return;
    }

    setIsSubmittingSections(true);

    try {
      await createSeatSections(createdVenue.id, payload);
      // after success you can either navigate away or just show a message
      navigate("/venues");
    } catch (err) {
      console.error(err);
      setSectionError("Failed to create seat sections. Please try again.");
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
          CREATE A NEW VENUE
        </h2>

        <div className="pt-4" />

        {/* Venue form (same style as you already have) */}
        <form onSubmit={handleVenueSubmit} className="space-y-4">
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
            {isSubmitting ? "Creating..." : "Create Venue"}
          </button>
        </form>

        {/* Seat sections form, shown only after venue was created */}
        {createdVenue && (
          <div className="mt-10 border-t border-gray-700 pt-6">
            <h3 className="text-2xl font-semibold text-[#720a24] mb-4">
              Seat Sections for {createdVenue.name}
            </h3>

            <form onSubmit={handleSectionSubmit} className="space-y-4">
              {["VIP", "Premium", "Floor", "General"].map((type) => (
                <div key={type} className="flex items-center gap-4">
                  <label className="w-24">{type}</label>
                  <input
                    type="number"
                    name={type}
                    min={1}
                    required
                    value={sections[type as keyof SeatSectionForm]}
                    onChange={handleSectionChange}
                    className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white w-32 focus:outline-none focus:ring-2 focus:ring-[#720a24]"
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
                {isSubmittingSections
                  ? "Creating Sections..."
                  : "Create Seat Sections"}
              </button>
            </form>
          </div>
        )}
      </Blank>
      <Footer />
    </>
  );
}
