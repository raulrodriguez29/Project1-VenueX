import Navbar from "../components/navbar/Navbar"
import HeroSection from "../components/HeroSection"
import TrendingEvents from "../components/TrendingEvents"
import OrganizerPromo from "../components/OrganizerPromo"
import Footer from "../components/Footer"
import { useAuth } from "../auth/AuthContext"

export default function Home() {
  const { isLoggedIn, user} = useAuth()

  return (
    <>
      <Navbar />
      <HeroSection />
      <TrendingEvents />
      {(!isLoggedIn || user?.role === "USER") && <OrganizerPromo />}
      <Footer />
    </>
  )
}
