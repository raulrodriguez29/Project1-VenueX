import { ProfileIcon } from "../components/navbar/Icons";
import type { HostRequest } from "../types/HostRequest";
import type { User } from "../types/User";
import { deleteHostRequest, approveHostRequest, denyHostRequest } from "../api/hostRequests.api";
import { useState, useEffect } from "react";
import { getUserById } from "../api/user.api";

interface Props {
  hostRequest: HostRequest
}

export default function HostRequestCard({hostRequest}: Props) {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  type Status = 'PENDING' | 'APPROVED' | 'DENIED';
  const [styleStatus, setStyleStatus] = useState<Status>('PENDING');

  useEffect(() => {
    getUserById(hostRequest.userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [hostRequest.userId]);

  if (loading) return <div>Loading...</div>;

  function animateDelete (id : number) { // this function does a really cool animation
    const hostRequest = document.querySelector(`[data-hostRequest-id="${id}"]`);
    if (hostRequest) {
        hostRequest.classList.add('notification-removing');
    }
  };

async function handleDelete(id: number): Promise<void> {
    animateDelete(id);
    try {
        await deleteHostRequest(id);

    } catch (err) {
        console.error("Failed to delete host request", err);
    }
};

const handleApprove = async () => {
  try {
    await approveHostRequest(hostRequest.id, {
      status: "APPROVED",
    });
    setStyleStatus("APPROVED");
  } catch (err) {
    console.error("Failed to approve host request", err);
  }
};

const handleDeny = async () => {
  try {
    await denyHostRequest(hostRequest.id, {
      status: "DENIED",
    });
    setStyleStatus("DENIED");
  } catch (err) {
    console.error("Failed to deny host request", err);
  }
};
    
    return(
        <div
  className="notification-card notification-unread card-hover rounded-xl p-6 shadow-sm"
  style={{ 
    backgroundColor:
      styleStatus === 'PENDING'
        ? "#f5f5f5" 
        : "#c9c9c9"}}
  data-hostRequest-id={hostRequest.id}
>
  <div className="flex items-start gap-4">
    <div
      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
      style={{ 
        background: 
          styleStatus === 'APPROVED'
          ? 'linear-gradient(135deg, #10b981, #059669)'
          : styleStatus === 'DENIED'
          ? 'linear-gradient(135deg, #ef4444, #dc2626)'
          :"linear-gradient(135deg, #ff3366, #ff6699)" }}
    >
      <ProfileIcon />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {styleStatus === 'APPROVED'
              ? 'Request Approved'
              : styleStatus === 'DENIED'
              ? 'Request Denied'
              : 'New Host Request'}
          </h3>
          <p className="text-sm text-gray-500">USERID: {hostRequest.userId}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {hostRequest.requestedAt}
          </span>{" "}
          <button
            className="delete-btn w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
            onClick={() => handleDelete(hostRequest.id)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <p
        className="text-gray-700 leading-relaxed mb-4"
        id="notification-1-body"
      >
        {styleStatus === 'PENDING'
          ? `${user?.firstName} ${user?.lastName} has requested to become a Host.`
          : styleStatus === 'APPROVED'
          ? `${user?.firstName} ${user?.lastName}'s Host Request has been approved.`
          : `${user?.firstName} ${user?.lastName}'s Host Request has been denied.`}
      </p>
      {styleStatus === 'PENDING' && (
        <div className="flex gap-3">
          <button
            onClick={handleApprove}
            className="flex-1 px-4 py-2.5 rounded-lg font-medium text-white transition-all hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
          >
            {" "}
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>{" "}
              Approve{""}
            </span>{" "}
          </button>{" "}
          <button
            onClick={handleDeny}
            className="flex-1 px-4 py-2.5 rounded-lg font-medium text-white transition-all hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
          >
            {" "}
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>{" "}
              Deny{" "}
            </span>{" "}
          </button>
        </div>
      )}
    </div>
  </div>
</div>

    );
}