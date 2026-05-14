import './HeroBanner.css'
import aastuGebeyaLogo from './assets/Logo.png'

export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <div className="hero-text">
          <h2 className="hero-title">
            <span className="highlight-text">Elevate</span>
            <br />
            <span className="highlight-text">your</span>
            <br />
            <span className="campus-text">Campus</span>
            <br />
            <span className="life-text">Life.</span>
          </h2>
          <p className="hero-description">
            Discover a curated collection of essentials and luxuries <br />
            that make dorm life better. Quality, affordability, <br />
            community-all in one place.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Start exploring</button>
            <button className="btn btn-secondary">Sell an item</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={aastuGebeyaLogo} alt="AASTU Gebeya logo" />
        </div>
      </div>
    </section>
  )
}
