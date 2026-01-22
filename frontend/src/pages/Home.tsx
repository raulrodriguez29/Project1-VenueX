import Navbar from "../components/navbar/Navbar"
import HeroSection from "../components/HeroSection"
import TrendingEvents from "../components/TrendingEvents"
import OrganizerPromo from "../components/OrganizerPromo"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrendingEvents />
      <OrganizerPromo />
      <Footer />
    </>
  )
}
