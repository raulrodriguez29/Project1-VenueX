import Navbar from "../components/navbar/Navbar";
import Blank from "../components/Blank";
import Footer from "../components/Footer";
import NotificationCard from "../components/NotificationCard";

import { useEffect, useState } from "react";
import { getAllNotifications } from "../api/notifications.api";
import type { Notification } from "../types/Notification";

export default function Notifications({}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await getAllNotifications();
      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  return (
<>
    <Navbar />
    <Blank>
    <div className="mb-8">
    <h2
      className="font-display text-5xl md:text-6xl tracking-wide mb-3"
      id="page-title"
      style={{ color: "#ff3366" }}
    >
      NOTIFICATIONS
    </h2>
  </div>
  {/* Notifications List */}
  <div className="space-y-4">
    {notifications.length === 0 ? (
      <p className="text-center text-gray-700">
        You're all caught up! No new notifications.
      </p>
    ) : (
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            data-notification-id={notification.id}
          >
            <NotificationCard notification={notification} />
          </li>
        ))}
      </ul>
    )}
  </div>
    </Blank>
    <Footer />
</>
  )
}