import Header from './Header'
import Sidebar from './Sidebar'
import HeroBanner from './HeroBanner'
import BrowseCategory from './BrowseCategory'
import FeaturedSelections from './FeaturedSelections'
import RecentListings from './RecentListings'
import Footer from './Footer'
import LoginPage from './LoginPage'
import ProfilePage from './ProfilePage'
import ExplorePage from './ExplorePage'
import ProductDetailsPage from './ProductDetailsPage'
import SellItemPage from './SellItemPage'
import './App.css'
import { useState } from 'react'

function App() {
  const [page, setPage] = useState('home')
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const showLogin = () => {
    setPage('login')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showHome = () => {
    setPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showProfile = () => {
    setPage('profile')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showExplore = () => {
    setPage('explore')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showSell = () => {
    setPage('sell')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showProductDetails = (product) => {
    setSelectedProduct(product)
    setPage('details')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleHomeClick = (event) => {
    if (event.target.closest('[data-profile-link], [data-explore-link]')) {
      return
    }

    if (event.target.closest('button')) {
      showLogin()
    }
  }

  return (
    <div className={`app-shell ${isDarkTheme ? 'dark-theme' : ''}`}>
      {page === 'login' && (
        <LoginPage onBackClick={showHome} onProfileClick={showProfile} />
      )}

      {page === 'profile' && (
        <ProfilePage onHomeClick={showHome} onLogout={showLogin} />
      )}

      {page === 'explore' && (
        <ExplorePage
          isDarkTheme={isDarkTheme}
          onExploreClick={showExplore}
          onHomeClick={showHome}
          onLoginClick={showLogin}
          onProductClick={showProductDetails}
          onProfileClick={showProfile}
          onSellClick={showSell}
          onThemeToggle={() => setIsDarkTheme((current) => !current)}
        />
      )}

      {page === 'details' && (
        <ProductDetailsPage
          isDarkTheme={isDarkTheme}
          product={selectedProduct}
          onExploreClick={showExplore}
          onHomeClick={showHome}
          onLoginClick={showLogin}
          onProfileClick={showProfile}
          onSellClick={showSell}
          onThemeToggle={() => setIsDarkTheme((current) => !current)}
        />
      )}

      {page === 'sell' && (
        <SellItemPage
          isDarkTheme={isDarkTheme}
          onExploreClick={showExplore}
          onHomeClick={showHome}
          onLoginClick={showLogin}
          onProfileClick={showProfile}
          onSellClick={showSell}
          onThemeToggle={() => setIsDarkTheme((current) => !current)}
        />
      )}

      {page === 'home' && (
        <div className="home-page" onClick={handleHomeClick}>
          <Header
            isDarkTheme={isDarkTheme}
            onExploreClick={showExplore}
            onHomeClick={showHome}
            onLoginClick={showLogin}
            onProfileClick={showProfile}
            onSellClick={showSell}
            onThemeToggle={() => setIsDarkTheme((current) => !current)}
          />
          <div className="main-layout">
            <Sidebar
              activeNav="home"
              onNavigate={(item) => {
                if (item === 'account') {
                  showProfile()
                }
              }}
            />
            <main className="main-content">
              <HeroBanner />
              <BrowseCategory onLoginClick={showLogin} />
              <FeaturedSelections onLoginClick={showLogin} />
              <RecentListings onLoginClick={showLogin} />
            </main>
          </div>
          <Footer />
        </div>
      )}
    </div>
  )
}

export default App
