import './ExplorePage.css'
import Header from './Header'
import Footer from './Footer'

const products = [
  {
    id: 1,
    title: 'CASIO FX-991EX Classwiz',
    subtitle: 'Perfect condition, used for one semester in Engineering Math...',
    price: '1,250 ETB',
    tag: 'Used',
    badge: 'Verified',
    badgeType: 'verified',
    art: 'calculator',
  },
  {
    id: 2,
    title: 'Dynamics & Statics Set',
    subtitle: 'Original textbooks by Hibbeler. 14th Edition. Minimal highlights inside.',
    price: '2,800 ETB',
    tag: 'Good',
    badge: 'Bundle',
    badgeType: 'bundle',
    art: 'books',
  },
  {
    id: 3,
    title: 'Rotring Drafting Kit',
    subtitle: 'Professional kit for architecture and civil students. Never used.',
    price: '4,500 ETB',
    tag: 'Brand New',
    art: 'drafting',
  },
  {
    id: 4,
    title: 'ThinkPad L14 Gen 2',
    subtitle: 'i5, 16GB RAM, 512GB SSD. Perfect for software engineering students.',
    price: '42,000 ETB',
    tag: 'Refurbished',
    art: 'laptop',
  },
  {
    id: 5,
    title: 'Premium Lab Coat',
    subtitle: 'Size Large. High-quality fabric, stain resistant. Required for Chemistry...',
    price: '850 ETB',
    tag: 'Like New',
    art: 'coat',
  },
  {
    id: 6,
    title: 'LED Study Lamp',
    subtitle: 'Adjustable brightness and color temp. Essential for late-night study.',
    price: '1,200 ETB',
    tag: 'Used',
    art: 'lamp',
  },
]

const categories = ['All Curations', 'Architecture Set', 'Reference Books', 'Lab Coats', 'Drawing Boards']
const sidebarCategories = ['Electronics', 'Cloths', 'Accessories', 'Cosmetics', 'Bookings', 'Stationary']

export default function ExplorePage({
  isDarkTheme,
  onExploreClick,
  onHomeClick,
  onLoginClick,
  onProductClick,
  onProfileClick,
  onSellClick,
  onThemeToggle,
}) {
  const openProductDetails = (product, event) => {
    event?.preventDefault()
    event?.stopPropagation()
    onProductClick(product)
  }

  return (
    <div className="explore-page">
      <Header
        isDarkTheme={isDarkTheme}
        onExploreClick={onExploreClick}
        onHomeClick={onHomeClick}
        onLoginClick={onLoginClick}
        onProfileClick={onProfileClick}
        onSellClick={onSellClick}
        onThemeToggle={onThemeToggle}
      />

      <main className="marketplace-shell">
        <aside className="filter-sidebar">
          <h2>Curated Results</h2>

          <div className="filter-block">
            <h3>Category</h3>
            {sidebarCategories.map((item, index) => (
              <label className="filter-option" key={item}>
                <input type="radio" name="explore-category" defaultChecked={index === 0} />
                <span>{item}</span>
              </label>
            ))}
          </div>

          <div className="filter-block">
            <h3>Condition</h3>
            <div className="condition-pills">
              <button className="active" type="button">Brand New</button>
              <button type="button">Pre-owned</button>
              <button type="button">Like New</button>
            </div>
          </div>

          <div className="filter-block">
            <h3>Price Range (ETB)</h3>
            <div className="price-line">
              <span>0 ETB</span>
              <span>15,000+ ETB</span>
            </div>
            <div className="range-track"><span></span></div>
          </div>

          <button className="reset-filters" type="button">Reset Filters</button>
        </aside>

        <section className="marketplace-content">
          <div className="marketplace-title-row">
            <div>
              <h1>Marketplace</h1>
              <p>Showing 24 essentials for AASTU students</p>
            </div>
            <label className="sort-control">
              <span>Sort by:</span>
              <select defaultValue="recent">
                <option value="recent">Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </label>
          </div>

          <div className="category-tabs">
            {categories.map((category, index) => (
              <button className={index === 0 ? 'active' : ''} type="button" key={category}>
                {category}
              </button>
            ))}
          </div>

          <div className="marketplace-grid">
            {products.map((product) => (
              <article
                className="marketplace-card"
                key={product.id}
                onClick={(event) => openProductDetails(product, event)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    openProductDetails(product, event)
                  }
                }}
              >
                <div className={`marketplace-art marketplace-art-${product.art}`}>
                  {product.badge && (
                    <span className={`quality-badge ${product.badgeType}`}>{product.badge}</span>
                  )}
                  <ProductArt type={product.art} />
                </div>
                <div className="marketplace-card-body">
                  <div className="product-title-row">
                    <h2>{product.title}</h2>
                    <span>{product.tag}</span>
                  </div>
                  <p>{product.subtitle}</p>
                  <div className="product-bottom-row">
                    <strong>{product.price}</strong>
                    <button
                      type="button"
                      onClick={(event) => openProductDetails(product, event)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="pagination">
            <button type="button"><i className="fas fa-chevron-left"></i></button>
            <button className="active" type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
            <span>...</span>
            <button type="button"><i className="fas fa-chevron-right"></i></button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function ProductArt({ type }) {
  if (type === 'calculator') {
    return (
      <div className="calc-art">
        <div className="calc-screen">MATH MODE</div>
        {Array.from({ length: 24 }).map((_, index) => <span key={index}></span>)}
      </div>
    )
  }

  if (type === 'books') {
    return <div className="books-art"><span></span><span></span><span></span></div>
  }

  if (type === 'drafting') {
    return <div className="drafting-art"><span></span><span></span><span></span></div>
  }

  if (type === 'laptop') {
    return <div className="laptop-art"><span></span></div>
  }

  if (type === 'coat') {
    return <div className="coat-art"><span></span></div>
  }

  return <div className="lamp-art"><span></span><span></span><span></span></div>
}
