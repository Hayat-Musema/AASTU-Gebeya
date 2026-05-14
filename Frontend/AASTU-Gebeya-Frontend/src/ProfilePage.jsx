import Sidebar from './Sidebar'
import './ProfilePage.css'
import profilePhoto from './assets/profile photo.jpg'

const listings = [
  {
    id: 1,
    title: 'Calculus: Early Transcenden...',
    price: '450 ETB',
    tag: 'Used - Like New',
    icon: 'fas fa-grip-lines',
  },
  {
    id: 2,
    title: 'Noise Cancelling Headphones',
    price: '2,100 ETB',
    tag: 'Electronics',
    icon: 'fas fa-headphones-simple',
  },
  {
    id: 3,
    title: 'Hydroflask 32oz',
    price: '850 ETB',
    tag: 'Dorm Gear',
    icon: 'fas fa-bottle-water',
  },
]

export default function ProfilePage({ onHomeClick, onLogout }) {
  return (
    <div className="profile-page">
      <header className="profile-topbar">
        <h1>AASTU Gebeya</h1>
        <nav>
          <button type="button" onClick={onHomeClick}>Home</button>
          <button type="button">Explore</button>
          <button className="active" type="button">My Account</button>
        </nav>
      </header>

      <div className="profile-layout">
        <Sidebar
          activeNav="account"
          showLogout
          showUserProfile={false}
          onNavigate={(item) => {
            if (item === 'home') {
              onHomeClick()
            }
          }}
          onLogout={onLogout}
        />

        <main className="profile-content">
          <section className="profile-hero">
            <div className="profile-avatar-card">
              <img src={profilePhoto} alt="Hayat Musema profile" />
            </div>

            <div className="profile-summary">
              <p className="profile-kicker">Student Curator Profile</p>
              <h2>Hayat Musema</h2>
              <div className="profile-meta">
                <span><i className="fas fa-graduation-cap"></i> Software Engineering</span>
                <span><i className="fas fa-envelope"></i> hayat.musema@aastustudent.edu.et</span>
                <span><i className="fas fa-calendar"></i> Joined may 2026</span>
              </div>
            </div>
          </section>

          <section className="profile-stats">
            <div className="stat-pill"><i className="fas fa-list-check"></i> <strong>8</strong> Active Listings</div>
            <div className="stat-pill rating"><i className="fas fa-star"></i> <strong>4.9</strong> Seller Rating</div>
            <button type="button" className="edit-public"><i className="fas fa-pen"></i> Edit Public Profile</button>
          </section>

          <section className="my-listings">
            <div className="listings-title-row">
              <div>
                <h2>My Listings</h2>
                <p>Manage your items in the university marketplace</p>
              </div>
              <button type="button" className="create-listing">
                <i className="fas fa-plus-circle"></i>
                Create New Listing
              </button>
            </div>

            <div className="profile-listing-grid">
              {listings.map((listing) => (
                <article className="profile-listing-card" key={listing.id}>
                  <span className="listing-tag">{listing.tag}</span>
                  <div className={`listing-art listing-art-${listing.id}`}>
                    <i className={listing.icon}></i>
                  </div>
                  <h3>{listing.title}</h3>
                  <p>{listing.price}</p>
                  <div className="listing-actions">
                    <button type="button"><i className="fas fa-pen"></i> Edit</button>
                    <button className="delete-listing" type="button" aria-label="Delete listing">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="impact-panel">
            <h2>Your Impact on<br />Campus Sustainability</h2>
            <p>
              By re-homing 12 items this semester, you've helped reduce campus
              waste and saved fellow students an average of 40% on study materials.
            </p>
            <div className="impact-stats">
              <div><strong>12</strong><span>Items Sold</span></div>
              <div><strong>4.2k</strong><span>Views Received</span></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
