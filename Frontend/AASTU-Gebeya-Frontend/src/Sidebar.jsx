import './Sidebar.css';

export default function Sidebar({
  activeNav = 'home',
  onNavigate,
  onLogout,
  showCart = false,
  showLogout = false,
  showUserProfile = true,
}) {
  const handleNav = (navItem) => {
    onNavigate?.(navItem);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">AASTU Gebeya</h2>
        <p className="sidebar-tagline">The Digital Gallery</p>
      </div>

      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${activeNav === 'home' ? 'active' : ''}`}
          onClick={() => handleNav('home')}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </button>
        
        <button 
          className={`nav-item ${activeNav === 'sell' ? 'active' : ''}`}
          onClick={() => handleNav('sell')}
        >
          <i className="fas fa-tag"></i>
          <span>Sell</span>
        </button>
        
        <button 
          className={`nav-item ${activeNav === 'account' ? 'active' : ''}`}
          onClick={() => handleNav('account')}
          data-profile-link
        >
          <i className="fas fa-user-circle"></i>
          <span>My Account</span>
        </button>

        {showCart && (
          <button
            className={`nav-item ${activeNav === 'cart' ? 'active' : ''}`}
            onClick={() => handleNav('cart')}
          >
            <i className="fas fa-cart-shopping"></i>
            <span>Cart</span>
          </button>
        )}
      </nav>

      <div className="sidebar-footer">
        {showUserProfile && (
          <div className="user-profile">
            <div className="user-avatar">HM</div>
            <div className="user-info">
              <p className="user-name">Hayat Musema</p>
              <p className="user-role">SE Student</p>
            </div>
          </div>
        )}
        {showLogout && (
          <button className="logout-button" type="button" onClick={onLogout}>
            <i className="fas fa-right-from-bracket"></i>
            <span>Log out</span>
          </button>
        )}
      </div>
    </aside>
  );
}
