import { Routes, Route } from "react-router-dom";
import Venues from "./pages/venues";
import Cart from "./user/Cart";
import Checkout from "./user/Checkout";

const App = () => {
  return (
    <Routes>
      <Route path="/venues" element={<Venues />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default App;