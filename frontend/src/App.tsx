import Navbar from "./components/navbar/Navbar";
import Hero from "./components/HeroSection";
import TrendingEvents from "./components/TrendingEvents";
import OrganizerPromo from "./components/OrganizerPromo";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="h-full w-full overflow-auto font-body bg-black text-white">
      <Navbar />

      {/* navbar height offset MUST remain */}
      <main className="pt-16">
        <Hero />
        <TrendingEvents/>
        <OrganizerPromo />
      </main>

      <Footer />
    </div>
  );
}