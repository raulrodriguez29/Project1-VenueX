import { useAuth } from "./AuthContext"

type RoleGateProps = {
  allow: string[]
  children: React.ReactNode
}

export default function RoleGate({ allow, children }: RoleGateProps) {
  const { user } = useAuth()

  if (!user) return null
  if (!allow.includes(user.role)) return null

  return <>{children}</>
}
