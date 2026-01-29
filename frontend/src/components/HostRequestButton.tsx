import { useAuth } from "../auth/AuthContext"
import { createHostRequest } from "../api/hostRequests.api"
import { useState } from "react"

export default function HostRequestButton() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [requestSent, setRequestSent] = useState(false);
    const { user } = useAuth();

    const handleSubmit = async () => {
      setIsSubmitting(true);
      setError(null);
  
      try {
        const response = await createHostRequest({
          userId: user?.id,
          status: "PENDING",
        });
        setRequestSent(true);
  
      } catch (err) {
        console.error(err);
        setError('Failed to submit host request');
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <>
      <div className="flex flex-col">
          <button
                className="ml-auto px-5 py-2 rounded-full text-md font-semibold text-white transition-all hover:scale-105"
                style={{
                background: "linear-gradient(135deg, #ff3366, #ff6699)",
                }}
                onClick={handleSubmit}
            >
            Request to host an event
              </button>
              {requestSent && (<p className="mt-2 text-sm text-green-600">
              Host request sent!</p>)}
          
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>
    </>
  )
}