import Navbar from "../components/navbar/Navbar";
import Blank from "../components/Blank";
import Footer from "../components/Footer";
import HostRequestCard from "../components/HostRequestCard"

export default function HostRequests() {


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
        <HostRequestCard />
        <HostRequestCard />
    </div>

    </Blank>
    <Footer />
</>
  )
}