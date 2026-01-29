import Navbar from "../components/navbar/Navbar";
import Blank from "../components/Blank";
import Footer from "../components/Footer";
import { useState } from "react";

type EmailFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactForm = () => {
    const [formData, setFormData] = useState<EmailFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
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
    setSuccess(false);

    try {
      const mockSendEmail = () =>
        new Promise<void>((resolve) =>
            setTimeout(() => resolve(), 1200)
        );

        await mockSendEmail();

      console.log("Email submitted:", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Failed to send email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <><Navbar />
    <Blank>
        <h2
        className="font-display text-4xl md:text-5xl tracking-wide"
        style={{ color: "#ff3366" }}
        >
            CONTACT US
        </h2>
        <div className="pt-4"></div>

          <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-700">Name</label>
                  <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white focus:ring-2 focus:ring-[#720a24]" />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-700">Email</label>
                  <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white focus:ring-2 focus:ring-[#720a24]" />
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-700">Subject</label>
                  <input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white" />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-700">Message</label>
                  <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white resize-none" />
              </div>

              {/* Feedback */}
              {error && <p className="text-sm text-red-400">{error}</p>}
              {success && <p className="text-sm text-green-400">Message sent!</p>}

              {/* Submit */}
              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 mt-2 rounded-md bg-[#720a24] text-white font-semibold hover:opacity-90 disabled:opacity-50 transition"
              >
                  {isSubmitting ? "Sending..." : "Send Email"}
              </button>
          </form>
      </Blank><Footer /></>
  );
};

export default ContactForm;