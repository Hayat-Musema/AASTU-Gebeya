import { useState } from 'react'
import './LoginPage.css'

export default function LoginPage({ onBackClick, onProfileClick, onSellerSignUp, onSignInClick }) {
  const [selectedRole, setSelectedRole] = useState('buyer')

  const handleSignUp = () => {
    if (selectedRole === 'seller' && onSellerSignUp) {
      onSellerSignUp()
    } else {
      onProfileClick()
    }
  }

  return (
    <main className="login-page">
      <section className="login-shell" aria-label="Create AASTU Curator account">
        <div className="login-brand-panel">
          <div className="brand-mark">
            <i className="fas fa-sparkles"></i>
            <span>AASTU Gebeya</span>
          </div>

          <div className="brand-copy">
            <h1>Elevating Campus Commerce.</h1>
            <p>
              Join the exclusive marketplace designed for the AASTU community.
              Buy essentials or turn your dorm gear into digital gold.
            </p>
          </div>

          <div className="joined-block">
            <div className="avatar-stack" aria-hidden="true">
              <span>Y</span>
              <span>A</span>
              <span>M</span>
              <span>+400</span>
            </div>
            <p>Joined by 400+ AASTU students this semester.</p>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="form-heading">
            <h2>Create Account</h2>
            <p>Start your journey as a curated student member.</p>
          </div>

          <form className="signup-form" onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
            <div className="role-group">
              <span>I WANT TO BE A...</span>
              <div className="role-options">
                <label className={`role-card${selectedRole === 'buyer' ? ' active' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={selectedRole === 'buyer'}
                    onChange={() => setSelectedRole('buyer')}
                  />
                  <i className="fas fa-bag-shopping"></i>
                  <strong>Buyer</strong>
                </label>
                <label className={`role-card${selectedRole === 'seller' ? ' active' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={selectedRole === 'seller'}
                    onChange={() => setSelectedRole('seller')}
                  />
                  <i className="fas fa-store"></i>
                  <strong>Seller</strong>
                </label>
              </div>
            </div>

            <label className="field-label">
              <span>Full Name</span>
              <input type="text" aria-label="Full Name" />
            </label>

            <label className="field-label">
              <span>Email Address</span>
              <input type="email" aria-label="AASTU Email Address" />
              <small>Preferably use @aastustudent.edu.et domain</small>
            </label>

            <div className="field-row">
              <label className="field-label">
                <span>Password</span>
                <input type="password" aria-label="Password" />
              </label>
              <label className="field-label">
                <span>Confirm Password</span>
                <input type="password" aria-label="Confirm Password" />
              </label>
            </div>

            <label className="terms-row">
              <input type="checkbox" />
              <span>
                I agree to the <a href="#terms">Terms of Service</a> and
                <a href="#safety"> Campus Safety Guide.</a>
              </span>
            </label>

            <button className="signup-button" type="submit">
              <span>Sign Up</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>

          <p className="login-link">
            Already have an account?{' '}
            <a
              href="#signin"
              onClick={(e) => { e.preventDefault(); if (onSignInClick) onSignInClick() }}
            >
              Login to Hub
            </a>
          </p>
        </div>
      </section>

      <button className="back-button" type="button" onClick={onBackClick}>
        <i className="fas fa-arrow-left"></i>
        <span>Back</span>
      </button>

      <button className="help-button" type="button">
        <i className="fas fa-question-circle"></i>
        <span>Need help?</span>
      </button>
    </main>
  )
}
