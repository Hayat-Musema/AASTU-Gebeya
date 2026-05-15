import { useState } from 'react'
import './LoginPage.css'   // reuse the exact same styles

export default function SignInPage({ onBackClick, onSignUpClick, onProfileClick }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSignIn = (e) => {
    e.preventDefault()
    if (onProfileClick) onProfileClick()
  }

  return (
    <main className="login-page">
      <section className="login-shell" aria-label="Sign in to AASTU Gebeya">

        {/* ── Left brand panel — identical to LoginPage ── */}
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
              <span>+2.4k</span>
            </div>
            <p>Joined by 2,400+ AASTU students this semester.</p>
          </div>
        </div>

        {/* ── Right sign-in form panel ── */}
        <div className="login-form-panel">
          <div className="form-heading">
            <h2>Welcome Back</h2>
            <p>Log in to your curated student hub.</p>
          </div>

          <form className="signup-form" onSubmit={handleSignIn}>

            <label className="field-label">
              <span>Email Address</span>
              <input
                type="email"
                placeholder="name@aastu.edu.et"
                aria-label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="field-label">
              <span>Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <div className="signin-remember-row">
              <label className="signin-remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="signin-forgot">Forgot Password?</a>
            </div>

            <button className="signup-button" type="submit">
              <span>Sign In</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>

          <p className="login-link">
            Don't have an account?{' '}
            <a
              href="#signup"
              onClick={(e) => { e.preventDefault(); if (onSignUpClick) onSignUpClick() }}
            >
              Sign Up
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
