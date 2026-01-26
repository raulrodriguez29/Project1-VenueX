import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar";
import { updateVenue, updateSeatSections } from "../../api/venue.api";
import type { Venue } from "../../types/Venue";
import type { SeatSectionForm } from "../../types/SeatSection";
import { deleteVenue } from "../../api/venue.api";

export default function EditVenue() {
  const { id } = useParams<{ id: string }>();
  const venueId = Number(id);
  const navigate = useNavigate()
  if (!venueId) {
    return <p className="text-center mt-10 text-red-400">Invalid venue</p>;
  }

  const [formData, setFormData] = useState<Partial<Venue>>({});
  const [sections, setSections] = useState<SeatSectionForm>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [sectionSuccess, setSectionSuccess] = useState<string | null>(null);
  const [sectionError, setSectionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingSections, setIsSubmittingSections] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSections({ ...sections, [e.target.name]: Number(e.target.value) });
  };

  const handleVenueSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);
  setSuccess(null);

  try {
    await updateVenue(venueId, formData);
    setSuccess("Venue updated successfully");
  } catch (err: any) {
    setError(err.response?.data?.message || "Error updating venue");
  } finally {
    setIsSubmitting(false);
  }
};

const handleSectionSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmittingSections(true);
  setSectionError(null);
  setSectionSuccess(null);

  try {
    await updateSeatSections(venueId, sections);
    setSectionSuccess("Seat sections updated successfully");
  } catch (err: any) {
    setSectionError(
      err.response?.data?.message || "Error updating seat sections"
    );
  } finally {
    setIsSubmittingSections(false);
  }
};

const handleDeleteVenue = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this venue? This action cannot be undone."
  );

  if (!confirmed) return;

  try {
    await deleteVenue(venueId);
    navigate("/venues"); 
  } catch (err: any) {
    alert(err.response?.data?.message || "Failed to delete venue");
  }
};

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-start gap-16 mb-16">
          <button
            className="px-4 py-2 text-sm rounded-md border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteVenue();
            }}>
            Delete Venue
          </button>
        </div>
        {/* FORMS CONTAINER */}
        <div className="flex flex-col lg:flex-row gap-16 items-start justify-center">

          {/* VENUE FORM (LARGER) */}
          <form
            onSubmit={handleVenueSubmit}
            className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#333] space-y-6 w-full lg:w-2/3"
          >
            <h3 className="text-2xl font-semibold text-white text-center mb-4">
              Update venue
            </h3>

            {["name", "location", "description"].map((field) => (
              <div key={field} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300 capitalize">
                  {field}
                </label>

                {field === "description" ? (
                  <textarea
                    name={field}
                    value={formData[field as keyof typeof formData] || ""}
                    onChange={handleChange}
                    rows={3}
                    className="px-4 py-3 rounded-lg bg-[#111] border border-[#444] text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#720a24]"
                  />
                ) : (
                  <input
                    name={field}
                    type="text"
                    value={formData[field as keyof typeof formData] || ""}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-lg bg-[#111] border border-[#444] text-white focus:outline-none focus:ring-2 focus:ring-[#720a24]"
                  />
                )}
              </div>
            ))}

            {success && (
              <p className="text-sm text-green-400 text-center p-3 bg-green-900/20 rounded-lg">
                {success}
              </p>)}

            {error && (
              <p className="text-sm text-red-400 text-center p-3 bg-red-900/20 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-[#720a24] text-white font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {isSubmitting ? "Updating..." : "Update Venue"}
            </button>
          </form>

          {/* SEAT SECTIONS FORM (SMALLER) */}
          <form
            onSubmit={handleSectionSubmit}
            className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333] space-y-7.5 w-full lg:w-1/3"
          >
            <h3 className="text-xl font-semibold text-white text-center mb-2">
              Update Seat Sections
            </h3>

            {["VIP", "Premium", "Floor", "General"].map((type) => (
              <div
                key={type}
                className="flex items-center gap-3 p-3 bg-[#111]/50 rounded-lg"
              >
                <label className="w-24 font-semibold text-white">
                  {type}
                </label>

                <input
                  type="number"
                  name={type}
                  min={1}
                  value={sections[type as keyof SeatSectionForm] || ""}
                  onChange={handleSectionChange}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#0a0a0a] border border-[#555] text-white focus:outline-none focus:ring-2 focus:ring-[#720a24]"
                  placeholder="0"
                />
              </div>
            ))}

            {sectionSuccess && (
              <p className="text-sm text-green-400 text-center p-3 bg-green-900/20 rounded-lg">
                {sectionSuccess}
              </p>)}
            {sectionError && (
              <p className="text-sm text-red-400 text-center p-3 bg-red-900/20 rounded-lg">
                {sectionError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmittingSections}
              className="w-full py-3 rounded-lg bg-[#720a24] text-white font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {isSubmittingSections ? "Updating..." : "Update Seat Sections"}
            </button>
          </form>
        </div>
        <button
            className="mt-6 w-full py-2 rounded-lg text-white font-medium hover:scale-105 transition"
            style={{background: "linear-gradient(135deg, #ff3366, #ff6699)",
            }}
            onClick={(e) => {
              e.stopPropagation()
              navigate("/venues")}}>
            Back
          </button>
      </div>
    </>
  );
}
