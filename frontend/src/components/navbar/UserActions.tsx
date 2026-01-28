import {CartIcon, HostRequestIcon} from "./Icons";
import {ProfileIcon} from "./Icons";
import {InboxIcon} from "./Icons";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import RoleGate from "../../auth/RoleGate";

type UserActionsProps = {
  cartCount?: number
  inboxCount?: number
  hostRequestCount?: number
  onCartClick?: () => void
  onInboxClick?: () => void
  onHostRequestClick?: () => void
  onProfileClick?: () => void
}

const Badge = ({ count }: { count: number }) => (
  <span
    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
    style={{ background: "#ff3366" }}
  >
    {count}
  </span>
)

const ProfileButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    aria-label="User profile"
    className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-105"
    style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
  >
    <ProfileIcon />
  </button>
)

const ActionButton = ({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode
  onClick?: () => void
  ariaLabel: string
}) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/5 transition-all"
  >
    {children}
  </button>
)

export const UserActions = ({
  inboxCount = 0,
  hostRequestCount = 0,
  onInboxClick,
  onProfileClick,
  onHostRequestClick
}: UserActionsProps) => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3">
      {isLoggedIn ? (
        <>
          {/* Show Icons only when logged in */}
          <button onClick={() => navigate("/bookings")}
            className="px-4 py-2 rounded font-semibold transition"
            style={{
            background: "linear-gradient(135deg, #ff3366, #ff6699)",
            color: "white",
          }}
          >
            Get Bookings
          </button>

          <RoleGate allow={["ADMIN"]}>
            <ActionButton onClick={onHostRequestClick} ariaLabel="Host requests">
              <HostRequestIcon/>
              {hostRequestCount > 0 && <Badge count={hostRequestCount} />}
            </ActionButton>
          </RoleGate>

          <Link to="/notifications">
            <ActionButton onClick={onInboxClick} ariaLabel="Messages">
              <InboxIcon />
              {inboxCount > 0 && <Badge count={inboxCount} />}
            </ActionButton>
          </Link>

          <ProfileButton onClick={onProfileClick} />
          
          <button 
            onClick={logout}
            className="ml-2 text-xs font-bold text-gray-400 hover:text-brand transition-colors uppercase tracking-widest"
          >
            Logout
          </button>
        </>
      ) : (
        /* Show Login/Signup when logged out */
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-sm font-semibold text-gray-300 hover:text-white transition-colors"
          >
            Login
          </Link>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 rounded-full text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
          >
            SIGN UP
          </button>
        </div>
      )}
    </div>
  )
}