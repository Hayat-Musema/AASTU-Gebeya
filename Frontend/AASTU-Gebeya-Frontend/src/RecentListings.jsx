import './RecentListings.css';

export default function RecentListings({ onLoginClick }) {
  const listings = [
    {
      id: 1,
      name: 'iPhone 12 Black 64GB',
      price: 450.00,
      image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=300&h=300&fit=crop',
      seller: 'Mark Wilson',
    },
    {
      id: 2,
      name: 'Nike White Air Max 90',
      price: 85.00,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      seller: 'Lisa Anderson',
    },
  ];

  return (
    <section className="recent-listings">
      <div className="listings-header">
        <h2>Recent Listings</h2>
        <a href="#login" className="view-more" onClick={onLoginClick}>VIEW MORE</a>
      </div>
      <div className="listings-grid">
        {listings.map((listing) => (
          <button key={listing.id} className="listing-card" type="button">
            <img src={listing.image} alt={listing.name} />
            <div className="listing-info">
              <h3>{listing.name}</h3>
              <p className="listing-seller">{listing.seller}</p>
              <p className="listing-price">${listing.price.toFixed(2)}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
