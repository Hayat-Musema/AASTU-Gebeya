import Header from './Header'
import Footer from './Footer'
import './OrderConfirmationPage.css'

const ORDER = {
  id: '#AASTU-78291',
  amountPaid: '1,975 ETB',
  status: 'CONFIRMED',
  destination: 'Block 54, Room 202',
  subDestination: 'AASTU Main Campus, Addis Ababa',
}

const ITEMS = [
  { id: 1, name: 'Advanced Scientific Calculator', qty: 1, price: '1,450 ETB' },
  { id: 2, name: 'LED Study Lamp', qty: 1, price: '525 ETB' },
]

const SUBTOTAL = '1,975 ETB'
const TOTAL_PAID = '1,975 ETB'

const NEXT_STEPS = [
  'The seller will contact you shortly via the provided phone number to coordinate the meeting.',
  'Meet at the specified location (Block 54) to verify the items and finalize the handover.',
]

export default function OrderConfirmationPage({
  isDarkTheme,
  onExploreClick,
  onHomeClick,
  onLoginClick,
  onProfileClick,
  onSellClick,
  onThemeToggle,
  onViewOrders,
  onBackToCheckout,
}) {
  return (
    <div className="oconf-page">
      <div className="oconf-topbar">
        <button className="oconf-back" type="button" onClick={onHomeClick}>
          <i className="fas fa-arrow-left"></i>
          <span>Home</span>
        </button>
        <div className="oconf-topbar-right">
          <button className="oconf-topbar-btn" type="button">Support</button>
          <button className="oconf-topbar-btn oconf-topbar-dots" type="button" aria-label="More options">
            <i className="fas fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>

      <main className="oconf-main">

        {/* ── Success hero ── */}
        <div className="oconf-hero">
          <div className="oconf-check-circle" aria-hidden="true">
            <i className="fas fa-check"></i>
          </div>
          <h1>Thank you for your order!</h1>
          <p>Your order has been placed successfully and the items are being prepared for you.</p>
        </div>

        <div className="oconf-body">

          {/* ── Left column ── */}
          <div className="oconf-left">

            {/* Order meta strip */}
            <div className="oconf-meta-strip">
              <div className="oconf-meta-cell">
                <span>ORDER ID</span>
                <strong>{ORDER.id}</strong>
              </div>
              <div className="oconf-meta-divider" aria-hidden="true" />
              <div className="oconf-meta-cell">
                <span>AMOUNT PAID</span>
                <strong className="oconf-amount">{ORDER.amountPaid}</strong>
              </div>
              <div className="oconf-meta-divider" aria-hidden="true" />
              <div className="oconf-meta-cell">
                <span>STATUS</span>
                <span className="oconf-status-badge">{ORDER.status}</span>
              </div>
            </div>

            {/* Delivery information */}
            <div className="oconf-card oconf-delivery-card">
              <div className="oconf-delivery-info">
                <h2>
                  <i className="fas fa-location-dot"></i>
                  Delivery Information
                </h2>
                <p className="oconf-dest-label">DESTINATION</p>
                <p className="oconf-dest-name">{ORDER.destination}</p>
                <p className="oconf-dest-sub">{ORDER.subDestination}</p>
              </div>
              <div className="oconf-campus-img" aria-label="AASTU campus aerial view">
                <AastuCampusIllustration />
              </div>
            </div>

            {/* What happens next */}
            <div className="oconf-card oconf-next-card">
              <div className="oconf-next-icon" aria-hidden="true">
                <i className="fas fa-comment-dots"></i>
              </div>
              <div className="oconf-next-content">
                <h2>What happens next?</h2>
                <ol className="oconf-next-steps">
                  {NEXT_STEPS.map((step, idx) => (
                    <li key={idx}>
                      <span className="oconf-step-num">0{idx + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

          </div>

          {/* ── Right column ── */}
          <aside className="oconf-right">
            <div className="oconf-card oconf-summary-card">
              <h3>Items Purchased ({ITEMS.length})</h3>

              <ul className="oconf-items">
                {ITEMS.map((item) => (
                  <li key={item.id} className="oconf-item">
                    <div className="oconf-item-thumb" aria-hidden="true">
                      <i className="fas fa-box"></i>
                    </div>
                    <div className="oconf-item-info">
                      <strong>{item.name}</strong>
                      <span>Qty: {item.qty}</span>
                    </div>
                    <span className="oconf-item-price">{item.price}</span>
                  </li>
                ))}
              </ul>

              <div className="oconf-summary-divider" />

              <ul className="oconf-fee-list">
                <li>
                  <span>Subtotal</span>
                  <span>{SUBTOTAL}</span>
                </li>
                <li>
                  <span>Delivery Fee</span>
                  <span className="oconf-free">FREE</span>
                </li>
              </ul>

              <div className="oconf-total-row">
                <span>Total Paid</span>
                <strong>{TOTAL_PAID}</strong>
              </div>

              <button
                className="oconf-primary-btn"
                type="button"
                onClick={onViewOrders || onProfileClick}
              >
                View My Orders
              </button>
              <button
                className="oconf-secondary-btn"
                type="button"
                onClick={onHomeClick}
              >
                Back to Home
              </button>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  )
}

/* ── Simple CSS campus illustration ── */
function AastuCampusIllustration() {
  return (
    <div className="campus-art" aria-hidden="true">
      <div className="campus-sky" />
      <div className="campus-ground">
        <div className="campus-building campus-b1" />
        <div className="campus-building campus-b2" />
        <div className="campus-building campus-b3" />
        <div className="campus-road" />
        <div className="campus-tree campus-t1" />
        <div className="campus-tree campus-t2" />
        <div className="campus-tree campus-t3" />
      </div>
    </div>
  )
}
