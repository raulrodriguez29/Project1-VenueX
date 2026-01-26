import { useNavigate, Link } from "react-router-dom"; // Added Link
import { useAuth } from "../../auth/AuthContext";
import { UserActions } from "./UserActions";
import RoleGate from "../../auth/RoleGate"; // Adjust this path to where your teammate's file is

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 nav-bg border-b border-white/10"
      style={{ backgroundColor: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
    >
      <div className="flex flex-nowrap justify-between max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 items-center h-16">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <span className="font-display text-2xl tracking-wider" style={{ color: "#ff3366" }}>
              VENUEX
            </span>
          </div>

          <div id="offcenter-navbar" className="flex gap-4 relative left-2">
            <button className="px-4 py-2 rounded-full text-sm font-semibold text-gray-300 hover:text-white transition-colors" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
              onClick={() => navigate('/venues')}>
              <span>Venues</span>
            </button>
            <button className="px-4 py-2 rounded-full text-sm font-semibold text-gray-300 hover:text-white transition-colors" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
              <span>Events</span>
            </button>

            {/* --- ADMIN BUTTON START --- */}
            <RoleGate allow={["ADMIN", "ROLE_ADMIN"]}>
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-pink-500 hover:bg-pink-500/10 transition-all"
                style={{ border: "1px solid rgba(255, 51, 102, 0.3)" }}
              >
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></span>
                Admin
              </Link>
            </RoleGate>
            {/* --- ADMIN BUTTON END --- */}
          </div>
        </div>

        {/* Auth Buttons */}
        <UserActions 
          onProfileClick={() => navigate(`/profile/${user?.id}`)}
        />
      </div>
    </nav>
  );
}