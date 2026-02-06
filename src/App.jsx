import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from './views/Home/HomeView';
import FAQ from './views/FAQs/FAQ';
import ContactoView from './views/Contacto/ContactoView';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contacto" element={<ContactoView />} />
      </Routes>
    </Router>
  );
}

export default App;
