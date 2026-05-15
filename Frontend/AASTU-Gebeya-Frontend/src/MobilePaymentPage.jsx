import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import './MobilePaymentPage.css'

const STEPS = ['Address', 'Payment', 'Review']
const ACTIVE_STEP = 1 // Payment step

const SAMPLE_ITEMS = [
  { id: 1, name: 'Advanced Scientific Calculator', price: 750 },
  { id: 2, name: 'LED Study Lamp', price: 1200 },
]

const DELIVERY_FEE = 0
const SERVICE_FEE = 25
const DELIVERY_ADDRESS = 'Block 54, Room 202'

export default function MobilePaymentPage({
  isDarkTheme,
  onExploreClick,
  onHomeClick,
  onLoginClick,
  onProfileClick,
  onSellClick,
  onThemeToggle,
  onBackToPayment,
  onOrderConfirmClick,
}) {
  const [wallet, setWallet] = useState('telebirr')
  const [phone, setPhone] = useState('')

  const itemsTotal = SAMPLE_ITEMS.reduce((sum, item) => sum + item.price, 0)
  const totalPrice = itemsTotal + DELIVERY_FEE + SERVICE_FEE

  return (
    <div className="mpay-page">
      <Header
        isDarkTheme={isDarkTheme}
        onExploreClick={onExploreClick}
        onHomeClick={onHomeClick}
        onLoginClick={onLoginClick}
        onProfileClick={onProfileClick}
        onSellClick={onSellClick}
        onThemeToggle={onThemeToggle}
      />

      {/* Step bar — same as CheckoutPage */}
      <div className="checkout-stepbar">
        <div className="checkout-stepbar-inner">
          <button
            className="checkout-step mpay-back-logo"
            type="button"
            onClick={onBackToPayment || onHomeClick}
            aria-label="Back"
          >
            <i className="fas fa-arrow-left"></i>
            <span>AASTU Gebeya</span>
          </button>

          {STEPS.map((step, idx) => (
            <button
              key={step}
              className={`checkout-step${idx === ACTIVE_STEP ? ' checkout-step-active' : ''}${idx < ACTIVE_STEP ? ' checkout-step-done' : ''}`}
              type="button"
            >
              {step}
            </button>
          ))}
        </div>

        <div className="mpay-stepbar-actions">
          <button className="checkout-close" type="button" aria-label="Help">
            <i className="fas fa-circle-question"></i>
          </button>
          <button className="checkout-close" type="button" onClick={onHomeClick} aria-label="Close">
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      <main className="checkout-main">
        <div className="checkout-body">

          {/* ── Left column ── */}
          <div className="checkout-left">
            <section className="checkout-card mpay-card" aria-labelledby="mpay-title">

              <h2 id="mpay-title">Complete Mobile Payment</h2>
              <p className="mpay-subtitle">
                Select your preferred mobile wallet and scan the QR code or enter
                your phone number to authorize the transaction.
              </p>

              {/* Wallet selector */}
              <div className="mpay-wallet-options">
                <label className={`mpay-wallet${wallet === 'telebirr' ? ' mpay-wallet-active' : ''}`}>
                  <input
                    type="radio"
                    name="wallet"
                    value="telebirr"
                    checked={wallet === 'telebirr'}
                    onChange={() => setWallet('telebirr')}
                  />
                  <span className="mpay-radio-dot"></span>
                  <div className="mpay-wallet-text">
                    <strong>Telebirr</strong>
                    <span>Ethio Telecom Wallet</span>
                  </div>
                </label>

                <label className={`mpay-wallet${wallet === 'cbe' ? ' mpay-wallet-active' : ''}`}>
                  <input
                    type="radio"
                    name="wallet"
                    value="cbe"
                    checked={wallet === 'cbe'}
                    onChange={() => setWallet('cbe')}
                  />
                  <span className="mpay-radio-dot"></span>
                  <div className="mpay-wallet-text">
                    <strong>CBE Birr</strong>
                    <span>Commercial Bank of Ethiopia</span>
                  </div>
                </label>
              </div>

              {/* QR + phone input panel */}
              <div className="mpay-panel">
                {/* QR code illustration */}
                <div className="mpay-qr-wrap" aria-label="QR code to scan">
                  <div className="mpay-phone-mock" aria-hidden="true">
                    <div className="mpay-phone-screen">
                      <QRIllustration />
                    </div>
                  </div>
                  <p className="mpay-scan-label">SCAN TO PAY</p>
                </div>

                {/* Phone number input */}
                <div className="mpay-phone-input-wrap">
                  <label className="checkout-field">
                    <span>{wallet === 'telebirr' ? 'Telebirr Phone Number' : 'CBE Birr Phone Number'}</span>
                    <input
                      type="tel"
                      placeholder="0911..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-label="Mobile payment phone number"
                    />
                  </label>

                  <p className="mpay-ussd-note">
                    <i className="fas fa-circle-info"></i>
                    You will receive a USSD push notification on your phone to confirm the payment.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mpay-actions">
                <button className="mpay-confirm-btn" type="button" onClick={onOrderConfirmClick}>
                  Confirm Payment
                </button>
                <button
                  className="mpay-back-btn"
                  type="button"
                  onClick={onBackToPayment || onHomeClick}
                >
                  Back to Payment Method
                </button>
              </div>

              <p className="order-secure mpay-secure">
                <i className="fas fa-lock"></i>
                Secure Student Payment
              </p>
            </section>
          </div>

          {/* ── Right column — order summary ── */}
          <aside className="checkout-right" aria-label="Order summary">
            <div className="order-summary-card">
              <h3>Order Summary</h3>

              {/* Item thumbnails */}
              <ul className="mpay-summary-items">
                {SAMPLE_ITEMS.map((item) => (
                  <li key={item.id} className="mpay-summary-item">
                    <div className="mpay-summary-thumb" aria-hidden="true">
                      <i className="fas fa-box"></i>
                    </div>
                    <div className="mpay-summary-info">
                      <span>{item.name}</span>
                      <strong className="mpay-item-price">{item.price.toLocaleString()} ETB</strong>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mpay-summary-divider" />

              <ul className="order-summary-list">
                <li>
                  <span>Items total</span>
                  <span>{itemsTotal.toLocaleString()} ETB</span>
                </li>
                <li>
                  <span>Delivery fee</span>
                  <span className="order-free">{DELIVERY_FEE} ETB</span>
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

            {/* Delivery address chip */}
            <div className="mpay-delivery-chip">
              <i className="fas fa-truck"></i>
              <span>Delivery to: <strong>{DELIVERY_ADDRESS}</strong></span>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  )
}

/* ── QR code CSS illustration ── */
function QRIllustration() {
  return (
    <div className="qr-grid" aria-hidden="true">
      {/* Top-left position square */}
      <div className="qr-pos qr-pos-tl">
        <div className="qr-pos-inner" />
      </div>
      {/* Top-right position square */}
      <div className="qr-pos qr-pos-tr">
        <div className="qr-pos-inner" />
      </div>
      {/* Bottom-left position square */}
      <div className="qr-pos qr-pos-bl">
        <div className="qr-pos-inner" />
      </div>
      {/* Data dots */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className={`qr-dot${[1, 3, 6, 8, 11, 14, 17, 19, 22, 24].includes(i) ? ' qr-dot-on' : ''}`}
        />
      ))}
    </div>
  )
}
