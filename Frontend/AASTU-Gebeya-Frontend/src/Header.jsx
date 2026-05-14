import { useState } from 'react';
import './Header.css';

export default function Header({
  isDarkTheme,
  onExploreClick,
  onHomeClick,
  onLoginClick,
  onProfileClick,
  onSellClick,
  onThemeToggle,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const handleThemeToggle = (event) => {
    event.stopPropagation();
    onThemeToggle();
  };
  const handleProfileClick = (event) => {
    event.stopPropagation();
    onProfileClick();
  };
  const handleExploreClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onExploreClick();
  };
  const handleHomeClick = (event) => {
    if (!onHomeClick) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    onHomeClick();
  };
  const handleSellClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (onSellClick) {
      onSellClick();
      return;
    }
    onLoginClick();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <h1 className="logo">AASTU Gebeya</h1>
        </div>
        
        <nav className="nav-links">
          <a href="#home" onClick={handleHomeClick}>Home</a>
          <a href="#about">About us</a>
          <a href="#explore" onClick={handleExploreClick} data-explore-link>Explore</a>
          <a href="#sell" onClick={handleSellClick}>Sell</a>
        </nav>

        <div className="header-actions">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search across campus products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          <button className="search-btn" type="button">
            <i className="fas fa-bell"></i>
          </button>
          <button
            className="search-btn"
            type="button"
            onClick={handleProfileClick}
            data-profile-link
          >
            <i className="fas fa-user"></i>
          </button>
          <button
            className="theme-toggle"
            type="button"
            onClick={handleThemeToggle}
            aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <i className={isDarkTheme ? 'fas fa-sun' : 'fas fa-moon'}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
