import './BrowseCategory.css';

export default function BrowseCategory({ onLoginClick }) {
  const categories = [
    { id: 1, name: 'Electronics', icon: 'fas fa-laptop' },
    { id: 2, name: 'Cloths', icon: 'fas fa-shirt' },
    { id: 3, name: 'Accessories', icon: 'fas fa-glasses' },
    { id: 4, name: 'Cosmetics', icon: 'fas fa-spa' },
    { id: 5, name: 'Bookings', icon: 'fas fa-calendar' },
    { id: 6, name: 'Stationary', icon: 'fas fa-pen' },
  ];

  return (
    <section className="browse-category">
      <div className="browse-header">
        <h2>Browse by Category</h2>
        <a href="#login" className="view-all" onClick={onLoginClick}>View all</a>
      </div>
      <div className="categories-grid">
        {categories.map((category) => (
          <button key={category.id} className="category-card" type="button">
            <div className="category-icon">
              <i className={category.icon}></i>
            </div>
            <h3>{category.name}</h3>
          </button>
        ))}
      </div>
    </section>
  );
}
