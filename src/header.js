import React from 'react';

function Header({ theme, toggleTheme, openModal }) {
  return (
    <header>
      <h4>Progress</h4>
      <div className="wrapper">
        <button onClick={openModal} className="btn btn-secondary">Add</button>
        <div className="dropdown">
          <button id="bbtn" className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            Theme
          </button>
          <ul className="dropdown-menu">
            <li onClick={() => toggleTheme('dark')} className="dropdown-item">Dark</li>
            <li onClick={() => toggleTheme('light')} className="dropdown-item">Light</li>
            <li onClick={() => toggleTheme('system')} className="dropdown-item">System</li>
          </ul>
        </div>
        <div id="root"></div>
      </div>
    </header>
  );
}

export default Header;