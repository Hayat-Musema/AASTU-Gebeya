import Header from './Header'
import Footer from './Footer'
import './ProductDetailsPage.css'

const similarItems = [
  { title: 'Calculus: Early Transcendentals', price: '350 ETB', block: 'Block 12', art: 'books' },
  { title: 'Aluminum Laptop Stand', price: '450 ETB', block: 'Block 4', art: 'stand' },
  { title: 'LED Desk Lamp (Battery)', price: '280 ETB', block: 'Block 2', art: 'lamp' },
  { title: 'Quartz Wrist Watch', price: '600 ETB', block: 'Block 5', art: 'watch' },
]

const defaultProduct = {
  title: 'Advanced Scientific Calculator',
  price: '750 ETB',
  oldPrice: '1,200 ETB',
  tag: 'Like New',
  subtitle: 'Perfect for civil engineering and architecture students.',
}

export default function ProductDetailsPage({
  isDarkTheme,
  product,
  onExploreClick,
  onHomeClick,
  onLoginClick,
  onProfileClick,
  onSellClick,
  onCheckoutClick,
  onThemeToggle,
}) {
  const item = product || defaultProduct

  return (
    <div className="details-page">
      <Header
        isDarkTheme={isDarkTheme}
        onExploreClick={onExploreClick}
        onHomeClick={onHomeClick}
        onLoginClick={onLoginClick}
        onProfileClick={onProfileClick}
        onSellClick={onSellClick}
        onThemeToggle={onThemeToggle}
      />

      <main className="details-content">
        <nav className="details-breadcrumb">
          <button type="button" onClick={onExploreClick}>Marketplace</button>
          <span>/</span>
          <span>Electronics</span>
          <span>/</span>
          <strong>Scientific Calculator</strong>
        </nav>

        <section className="details-hero">
          <div className="details-gallery">
            <div className="details-main-image">
              <span className="verified-seller">Verified Student Seller</span>
              <LargeCalculator />
            </div>
            <div className="thumbnail-row">
              <button className="active" type="button"><MiniArt type="keys" /></button>
              <button type="button"><MiniArt type="calculator" /></button>
              <button type="button"><MiniArt type="case" /></button>
              <button type="button"><i className="fas fa-plus"></i></button>
            </div>
          </div>

          <aside className="details-panel">
            <div className="condition-row">
              <span>{item.tag || 'Like New'}</span>
              <p>Ref ID: CUR-9182</p>
            </div>
            <h1>{item.title === 'CASIO FX-991EX Classwiz' ? 'Advanced Scientific Calculator' : item.title}</h1>
            <div className="details-price-row">
              <strong>{item.price || '750 ETB'}</strong>
              <span>{item.oldPrice || '1,200 ETB'}</span>
            </div>

            <section className="description-block">
              <h2>Product Description</h2>
              <p>
                Perfect for Civil Engineering and Architecture students. Features
                400+ functions, solar power with battery backup, and a high-resolution
                natural textbook display. Barely used for one semester. Fully
                functional, no scratches on the screen.
              </p>
            </section>

            <section className="seller-card">
              <div className="seller-avatar">AA</div>
              <div>
                <h3>Abebe Ayalew</h3>
                <p>Mechanical Engineering, Year 3</p>
              </div>
              <span><i className="fas fa-star"></i> Verified</span>
            </section>

            <div className="seller-location">
              <span><i className="fas fa-location-dot"></i> AASTU Block 43</span>
              <span><i className="fas fa-phone"></i> +251 911 234 567</span>
            </div>

            <div className="contact-actions">
              <button type="button"><i className="fab fa-telegram"></i> Telegram</button>
              <button type="button"><i className="fas fa-phone"></i> Call Seller</button>
            </div>

            <button
              className="buy-now-btn"
              type="button"
              onClick={onCheckoutClick}
            >
              <i className="fas fa-bag-shopping"></i> Buy Now
            </button>

            <button className="report-link" type="button">
              <i className="fas fa-circle-exclamation"></i>
              Report Inaccurate Listing
            </button>
          </aside>
        </section>

        <section className="similar-section">
          <div className="similar-heading-row">
            <div>
              <h2>Similar Campus Finds</h2>
              <p>Curated essentials from your classmates</p>
            </div>
            <button type="button" onClick={onExploreClick}>View Marketplace <i className="fas fa-arrow-right"></i></button>
          </div>

          <div className="similar-grid">
            {similarItems.map((similar) => (
              <article className="similar-card" key={similar.title}>
                <div className={`similar-art similar-art-${similar.art}`}>
                  <MiniArt type={similar.art} />
                </div>
                <div className="similar-info">
                  <span>{similar.art}</span>
                  <h3>{similar.title}</h3>
                  <div>
                    <strong>{similar.price}</strong>
                    <small>{similar.block}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function LargeCalculator() {
  return (
    <div className="large-calculator">
      <div className="large-calc-screen">188888888888</div>
      <div className="large-calc-labels">
        <span>SHIFT</span><span>ALPHA</span><span>MODE</span>
      </div>
      <div className="large-calc-keys">
        {Array.from({ length: 45 }).map((_, index) => <span key={index}></span>)}
      </div>
    </div>
  )
}

function MiniArt({ type }) {
  if (type === 'calculator') {
    return <div className="mini-calculator"><span></span></div>
  }

  if (type === 'case') {
    return <div className="mini-case"><span></span></div>
  }

  if (type === 'books') {
    return <div className="mini-books"><span></span><span></span></div>
  }

  if (type === 'stand') {
    return <div className="mini-stand"><span></span></div>
  }

  if (type === 'lamp') {
    return <div className="mini-lamp"><span></span><span></span></div>
  }

  if (type === 'watch') {
    return <div className="mini-watch"><span></span></div>
  }

  return <div className="mini-keys"><span></span><span></span><span></span></div>
}
