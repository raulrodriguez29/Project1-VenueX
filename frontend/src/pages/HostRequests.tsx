import Navbar from "../components/navbar/Navbar";
import Blank from "../components/Blank";
import Footer from "../components/Footer";
import HostRequestCard from "../components/HostRequestCard"

import { useEffect, useState } from "react";
import { getAllHostRequests } from "../api/hostRequests.api";
import type { HostRequest } from "../types/HostRequest";


export default function HostRequests() {
  const [hostRequests, setHostRequests] = useState<HostRequest[]>([]);
  
    useEffect(() => {
      loadHostRequests();
    }, []);

  const loadHostRequests= async () => {
    try {
      const res = await getAllHostRequests();
      setHostRequests(res.data);
    } catch (error) {
      console.error("Failed to fetch host requests", error);
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
      HOST REQUESTS
    </h2>
    </div>
    {/* Host Requests List */}
    <div className="space-y-4">
        <ul>
          {hostRequests.map((hostRequest) => (
            <li
            data-hostRequest-id={hostRequest.id}
            className="notification-card rounded-xl p-6"
          >
            <HostRequestCard
              hostRequest={hostRequest}
            />
            </li>
          ))}
        </ul>
    </div>
    </Blank>
    <Footer />
</>
  )
}