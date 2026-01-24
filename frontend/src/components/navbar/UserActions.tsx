import {CartIcon} from "./Icons";
import {ProfileIcon} from "./Icons";
import {InboxIcon} from "./Icons";

type UserActionsProps = {
  cartCount?: number
  inboxCount?: number
  onCartClick?: () => void
  onInboxClick?: () => void
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
  cartCount = 0,
  inboxCount = 0,
  onCartClick,
  onInboxClick,
  onProfileClick,
}: UserActionsProps) => {
  return (
    <div className="flex items-center gap-3">
      {/* Cart */}
      <ActionButton onClick={onCartClick} ariaLabel="Shopping cart">
        <CartIcon />
        {cartCount > 0 && <Badge count={cartCount} />}
      </ActionButton>

      {/* Inbox */}
      <ActionButton onClick={onInboxClick} ariaLabel="Messages">
        <InboxIcon />
        {inboxCount > 0 && <Badge count={inboxCount} />}
      </ActionButton>

      {/* Profile */}
      <ProfileButton onClick={onProfileClick} />
    </div>
  )
}