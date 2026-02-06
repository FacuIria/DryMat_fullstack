import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import HomeView from "./views/Home/HomeView";
import FAQ from "./views/FAQs/FAQ";
import ContactoView from "./views/Contacto/ContactoView";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // si lo querés instantáneo: behavior: "auto"
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contacto" element={<ContactoView />} />
      </Routes>
    </Router>
  );
}

export default App;
