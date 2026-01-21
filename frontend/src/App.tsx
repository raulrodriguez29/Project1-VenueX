import { Routes, Route } from "react-router-dom";
import Venues from "./pages/venues";

const App = () => {
  return (
    <Routes>
      <Route path="/venues" element={<Venues />} />
    </Routes>
  );
};

export default App;