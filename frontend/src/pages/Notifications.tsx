import Navbar from "../components/navbar/Navbar";
import Blank from "../components/Blank";
import Footer from "../components/Footer";
import NotificationCard from "../components/NotificationCard";

export default function Notifications() {


  return (
<>
    <Navbar />
    <Blank>
    <>
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
    <NotificationCard />
    <NotificationCard />
  </div>
</>

    </Blank>
    <Footer />
</>
  )
}