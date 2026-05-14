import './FeaturedSelections.css';

export default function FeaturedSelections() {
  const products = [
    {
      id: 1,
      name: 'Mac Book Air M1 - Student Condition',
      price: 850.00,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=250&fit=crop',
      seller: 'Sarah Mende',
      rating: 5,
    },
    {
      id: 2,
      name: 'Professional...',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=250&fit=crop',
      seller: 'John Davis',
      rating: 4,
    },
    {
      id: 3,
      name: 'Sony Headphones...',
      price: 120.00,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=250&fit=crop',
      seller: 'Emily Chen',
      rating: 5,
    },
  ];

  return (
    <section className="featured-selections">
      <h2>Featured Selections</h2>
      <div className="featured-grid">
        {products.map((product) => (
          <button key={product.id} className="product-card" type="button">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <span className="product-badge">Hot</span>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="product-seller">
                <span className="seller-icon">👤</span>
                <span>{product.seller}</span>
              </div>
              <div className="product-rating">
                {'⭐'.repeat(product.rating)}<span className="gray-stars">{'⭐'.repeat(5 - product.rating)}</span>
              </div>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
