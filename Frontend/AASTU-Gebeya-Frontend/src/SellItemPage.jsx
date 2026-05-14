import './SellItemPage.css'
import Header from './Header'
import Footer from './Footer'

const categories = [
  'Select Category',
  'Dorm Gear',
  'Books',
  'Electronics',
  'Stationary',
  'Cloths',
  'Accessories',
]

export default function SellItemPage({
  isDarkTheme,
  onExploreClick,
  onHomeClick,
  onLoginClick,
  onProfileClick,
  onSellClick,
  onThemeToggle,
}) {
  return (
    <div className="sell-item-page">
      <Header
        isDarkTheme={isDarkTheme}
        onExploreClick={onExploreClick}
        onHomeClick={onHomeClick}
        onLoginClick={onLoginClick}
        onProfileClick={onProfileClick}
        onSellClick={onSellClick}
        onThemeToggle={onThemeToggle}
      />

      <main className="sell-item-main">
        <section className="sell-item-intro" aria-labelledby="sell-item-title">
          <h1 id="sell-item-title">Sell an Item</h1>
          <p>Clear the clutter. Fill your pockets. Curate your campus.</p>
        </section>

        <form className="sell-item-card">
          <section className="product-gallery" aria-labelledby="gallery-title">
            <h2 id="gallery-title">
              <i className="fas fa-camera"></i>
              Product Gallery
            </h2>

            <div className="gallery-grid">
              <label className="gallery-upload">
                <input type="file" accept="image/*" aria-label="Upload product image" />
                <i className="fas fa-file-arrow-up"></i>
                <span>Upload Image</span>
              </label>

              <div className="gallery-preview gallery-preview-styled" aria-hidden="true">
                <span className="pencil pencil-one"></span>
                <span className="pencil pencil-two"></span>
                <span className="pencil pencil-three"></span>
                <span className="paper paper-one"></span>
                <span className="paper paper-two"></span>
                <span className="paper paper-three"></span>
                <span className="mug"></span>
              </div>

              <button className="gallery-empty" type="button" aria-label="Add another product image">
                <i className="fas fa-image"></i>
              </button>
            </div>
          </section>

          <label className="sell-field sell-field-full">
            <span>Product Name</span>
            <input type="text" placeholder="e.g. Organic Chemistry 10th Ed." />
          </label>

          <div className="sell-form-row">
            <label className="sell-field">
              <span>Price (ETB)</span>
              <input type="number" min="0" placeholder="Br 0.00" />
            </label>

            <label className="sell-field">
              <span>Category</span>
              <select defaultValue="Select Category">
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <fieldset className="condition-group">
            <legend>Condition</legend>
            <div className="condition-options">
              <label className="condition-option active">
                <input type="radio" name="condition" defaultChecked />
                <span>Used</span>
              </label>
              <label className="condition-option">
                <input type="radio" name="condition" />
                <span>New</span>
              </label>
            </div>
          </fieldset>

          <label className="sell-field sell-field-full">
            <span>Description</span>
            <textarea placeholder="Describe the item's condition, usage history, and key features..." />
          </label>

          <div className="sell-form-actions">
            <button className="cancel-product" type="button" onClick={onHomeClick}>
              Cancel
            </button>
            <button className="post-product" type="submit">
              <i className="fas fa-paper-plane"></i>
              Post Product
            </button>
          </div>
        </form>

        <p className="sell-agreement">
          By posting, you agree to the <a href="#seller-guidelines">Seller Guidelines</a> and{' '}
          <a href="#safety">AASTU Campus Safety Protocol</a>.
        </p>
      </main>

      <Footer />
    </div>
  )
}
