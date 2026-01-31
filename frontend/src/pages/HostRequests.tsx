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
      {hostRequests.length === 0 ? (
        <p className="text-center text-gray-700">
          You're all caught up! No new host requests.
        </p>
      ) : (
        <ul>
          {hostRequests.map((hostRequest) => (
            <li
              key={hostRequest.id}
              data-hostRequest-id={hostRequest.id}
            >
              <HostRequestCard hostRequest={hostRequest} />
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