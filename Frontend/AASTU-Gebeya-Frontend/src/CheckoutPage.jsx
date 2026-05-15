import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import './CheckoutPage.css'

const STEPS = ['Address', 'Payment', 'Review']

const SAMPLE_ITEMS = [
  {
    id: 1,
    name: 'Advanced Scientific Calculator',
    seller: 'Abebe Ayalew',
    price: 750,
    image: null,
  },
  {
    id: 2,
    name: 'LED Study Lamp',
    seller: 'Samuel L.',
    price: 1200,
    image: null,
  },
]

const DELIVERY_FEE = 0
const SERVICE_FEE = 25

export default function CheckoutPage({
  isDarkTheme,
  onExploreClick,
  onHomeClick,
  onLoginClick,
  onProfileClick,
  onSellClick,
  onMobilePaymentClick,
  onOrderConfirmClick,
  onThemeToggle,
}) {
  const [activeStep, setActiveStep] = useState(2) // 0=Address, 1=Payment, 2=Review
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')

  const itemsTotal = SAMPLE_ITEMS.reduce((sum, item) => sum + item.price, 0)
  const totalPrice = itemsTotal + DELIVERY_FEE + SERVICE_FEE

  return (
    <div className="checkout-page">
      <Header
        isDarkTheme={isDarkTheme}
        onExploreClick={onExploreClick}
        onHomeClick={onHomeClick}
        onLoginClick={onLoginClick}
        onProfileClick={onProfileClick}
        onSellClick={onSellClick}
        onThemeToggle={onThemeToggle}
      />

      {/* Checkout step bar */}
      <div className="checkout-stepbar">
        <div className="checkout-stepbar-inner">
          {STEPS.map((step, idx) => (
            <button
              key={step}
              className={`checkout-step${idx === activeStep ? ' checkout-step-active' : ''}${idx < activeStep ? ' checkout-step-done' : ''}`}
              onClick={() => setActiveStep(idx)}
              type="button"
            >
              {step}
            </button>
          ))}
        </div>
        <button className="checkout-close" type="button" onClick={onHomeClick} aria-label="Close checkout">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <main className="checkout-main">
        <div className="checkout-body">
          {/* Left column */}
          <div className="checkout-left">

            {/* Delivery address */}
            <section className="checkout-card" aria-labelledby="address-title">
              <div className="checkout-card-header">
                <div>
                  <h2 id="address-title">Add delivery or pickup address</h2>
                </div>
                <button className="checkout-add-address" type="button">
                  Add new address
                </button>
              </div>
              <button className="checkout-pickup-link" type="button">
                Choose campus pickup location
              </button>

              <div className="checkout-fields">
                <div className="checkout-field-row">
                  <label className="checkout-field">
                    <span>Full Name</span>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </label>
                  <label className="checkout-field">
                    <span>Phone Number</span>
                    <input
                      type="tel"
                      placeholder="0911..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>
                </div>

                <label className="checkout-field checkout-field-full">
                  <span>Campus Location / Dorm / Block</span>
                  <input
                    type="text"
                    placeholder="e.g. Block 54, Room 202"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </label>

                <label className="checkout-field checkout-field-full">
                  <span>Additional Notes</span>
                  <textarea
                    placeholder="Specific meeting point or time..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </label>
              </div>
            </section>

            {/* Payment method */}
            <section className="checkout-card" aria-labelledby="payment-title">
              <h2 id="payment-title">Payment method</h2>
              <div className="payment-options">
                <label className={`payment-option${paymentMethod === 'cash' ? ' payment-option-active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                  />
                  <span className="payment-radio-dot"></span>
                  <div className="payment-option-text">
                    <strong>Cash on Delivery</strong>
                    <span>Pay when you receive the item</span>
                  </div>
                </label>

                <label className={`payment-option${paymentMethod === 'mobile' ? ' payment-option-active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="mobile"
                    checked={paymentMethod === 'mobile'}
                    onChange={() => setPaymentMethod('mobile')}
                  />
                  <span className="payment-radio-dot"></span>
                  <div className="payment-option-text">
                    <strong>Mobile Payment</strong>
                    <span>Telebirr / CBE Birr</span>
                  </div>
                </label>
              </div>

              {paymentMethod === 'mobile' && (
                <button
                  className="checkout-add-address"
                  style={{ marginTop: '18px' }}
                  type="button"
                  onClick={onMobilePaymentClick}
                >
                  Continue to Mobile Payment
                </button>
              )}
            </section>

            {/* Review items */}
            <section className="checkout-card" aria-labelledby="review-title">
              <div className="review-header">
                <h2 id="review-title">Review items and delivery</h2>
                <span className="review-badge">Pickup/Meet on Campus</span>
              </div>

              <ul className="review-items" aria-label="Order items">
                {SAMPLE_ITEMS.map((item) => (
                  <li key={item.id} className="review-item">
                    <div className="review-item-img" aria-hidden="true">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <span className="review-item-placeholder">
                          <i className="fas fa-box"></i>
                        </span>
                      )}
                    </div>
                    <div className="review-item-info">
                      <strong>{item.name}</strong>
                      <span>
                        Seller: <a href="#seller" className="review-seller-link">{item.seller}</a>
                      </span>
                      <p className="review-item-price">{item.price.toLocaleString()} ETB</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

          </div>

          {/* Right column — order summary */}
          <aside className="checkout-right" aria-label="Order summary">
            <button className="place-order-btn" type="button" onClick={onOrderConfirmClick}>
              Place Order
            </button>

            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <ul className="order-summary-list">
                <li>
                  <span>Items total</span>
                  <span>{itemsTotal.toLocaleString()} ETB</span>
                </li>
                <li>
                  <span>Delivery fee</span>
                  <span className="order-free">0 ETB</span>
                </li>
                <li>
                  <span>Service Fee</span>
                  <span>{SERVICE_FEE} ETB</span>
                </li>
              </ul>
              <div className="order-total">
                <span>Total price</span>
                <strong>{totalPrice.toLocaleString()} ETB</strong>
              </div>
              <p className="order-terms">
                By placing your order, you agree to the AASTU Marketplace{' '}
                <a href="#terms">Student Transaction Terms</a>.
              </p>
            </div>

            <p className="order-secure">
              <i className="fas fa-shield-halved"></i>
              Secure Student Payment
            </p>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
