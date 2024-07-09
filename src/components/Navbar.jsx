import { Link } from "react-router-dom";

import { useState } from "react";
import '../styles/navbar.css';

function Navbar() {
  const [nav, setNav] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <nav>
        
        {/* desktop */}

        <div className="navbar">
          
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>
            <li>
            
              <Link className="Manufacturer-link" to="/Manufacturer_space">
                Manufacturer Space
              </Link>
            </li>
            <li>
            
              <Link className="customer-link" to="/Customer_space">
                Customer Space
              </Link>
            </li>
            
            
            
          </ul>

          {/* mobile */}
          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;


