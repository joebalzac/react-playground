import { useState } from 'react';

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <ul className="nav-items">
        {['Home', 'About', 'Services', 'Contact'].map((item) => (
          <li
            key={item}
            className={`nav-item ${active === item ? 'active' : ''}`}
            onClick={() => setActive(item)}
          >
            {item}
          </li>
        ))}
        <li className="nav-item dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
          More
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;