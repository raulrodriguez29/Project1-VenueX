type AuthActionsProps = {
  onLogin?: () => void
  onSignup?: () => void
}

export const AuthButtons = ({ onLogin, onSignup }: AuthActionsProps) => {
  return (
    <div id = "auth-actions" className = "flex items-center gap-3">
        <button
          id="login-btn"
          onClick={onLogin}
          className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
        >
          Log In
        </button>
        <button
          id="signup-btn"
          onClick={onSignup}
          className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
        >
          Sign Up
        </button>
    </div>
  )
}