import { Link } from 'react-router-dom';
import './Navbar.css';
import DryMatLogo from '../../../assets/DryMatLogo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img
            className="navbar-logo-img"
            src={DryMatLogo}
            alt="DryMat Logo"
          />
          <h1 className="navbar-brand">DryMat</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
