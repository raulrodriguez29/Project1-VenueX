import { NotificationIcon } from "./navbar/Icons";
import { useNavigate } from "react-router-dom";
import type { Notification } from "../types/Notification";

import { deleteNotification } from "../api/notifications.api";

interface Props {
    notification: Notification
}

export default function NotificationCard({notification}: Props) {
    const navigate = useNavigate()

    function animateDelete (id : number) { // this function does a really cool animation
        const notification = document.querySelector(`[data-notification-id="${id}"]`);
        if (notification) {
            notification.classList.add('notification-removing');
        }
    }
    
    async function handleDelete(id: number): Promise<void> {
        animateDelete(id);
        try {
            await deleteNotification(id);

        } catch (err) {
            console.error("Failed to delete notification", err);
        }
    };
    
    return(
        <div
            className="notification-card notification-unread card-hover rounded-xl p-6 shadow-sm"
            style={{ backgroundColor: "#f5f5f5" }}
            data-notification-id={1}
        >
            <div className="flex items-start gap-4">
            <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
            >
                <NotificationIcon />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                    Notification Alert
                    </h3>
                    <p className="text-sm text-gray-500">Event Host</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                    {notification.sentAt}
                    </span>{" "}
                    <button
                    className="delete-btn w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                    onClick={() => handleDelete(notification.id)}
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
                <p className="text-gray-700 leading-relaxed" id="notification-1-body">
                {notification.message}
                </p>
            </div>
            </div>
        </div>
    );
}