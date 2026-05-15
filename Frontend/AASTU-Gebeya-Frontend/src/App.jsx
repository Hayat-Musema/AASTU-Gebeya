import Header from './Header'
import Sidebar from './Sidebar'
import HeroBanner from './HeroBanner'
import BrowseCategory from './BrowseCategory'
import FeaturedSelections from './FeaturedSelections'
import RecentListings from './RecentListings'
import Footer from './Footer'
import LoginPage from './LoginPage'
import SignInPage from './SignInPage'
import ProfilePage from './ProfilePage'
import ExplorePage from './ExplorePage'
import ProductDetailsPage from './ProductDetailsPage'
import SellItemPage from './SellItemPage'
import CheckoutPage from './CheckoutPage'
import MobilePaymentPage from './MobilePaymentPage'
import OrderConfirmationPage from './OrderConfirmationPage'
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

  const showSignIn = () => {
    setPage('signin')
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

  const showCheckout = () => {
    setPage('checkout')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showMobilePayment = () => {
    setPage('mobilepayment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showOrderConfirmation = () => {
    setPage('orderconfirmation')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showProductDetails = (product) => {
    setSelectedProduct(product)
    setPage('details')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleHomeClick = (event) => {
    // Let header nav links and profile/explore/home links handle themselves
    if (event.target.closest('[data-profile-link], [data-explore-link], [data-home-link]')) {
      return
    }
    // Only trigger login for non-nav buttons (e.g. hero CTA), not header or sidebar buttons
    const btn = event.target.closest('button')
    if (btn && !btn.closest('.header') && !btn.closest('.sidebar')) {
      showLogin()
    }
  }

  return (
    <div className={`app-shell ${isDarkTheme ? 'dark-theme' : ''}`}>
      {page === 'login' && (
        <LoginPage
          onBackClick={showHome}
          onProfileClick={showProfile}
          onSellerSignUp={showSell}
          onSignInClick={showSignIn}
        />
      )}

      {page === 'signin' && (
        <SignInPage
          onBackClick={showHome}
          onSignUpClick={showLogin}
          onProfileClick={showProfile}
        />
      )}

      {page === 'profile' && (
        <ProfilePage
          onHomeClick={showHome}
          onLogout={showSignIn}
          onExploreClick={showExplore}
          onSellClick={showSell}
        />
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
          onCheckoutClick={showCheckout}
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

      {page === 'checkout' && (
        <CheckoutPage
          isDarkTheme={isDarkTheme}
          onExploreClick={showExplore}
          onHomeClick={showHome}
          onLoginClick={showLogin}
          onProfileClick={showProfile}
          onSellClick={showSell}
          onMobilePaymentClick={showMobilePayment}
          onOrderConfirmClick={showOrderConfirmation}
          onThemeToggle={() => setIsDarkTheme((current) => !current)}
        />
      )}

      {page === 'mobilepayment' && (
        <MobilePaymentPage
          isDarkTheme={isDarkTheme}
          onExploreClick={showExplore}
          onHomeClick={showHome}
          onLoginClick={showLogin}
          onProfileClick={showProfile}
          onSellClick={showSell}
          onBackToPayment={showCheckout}
          onOrderConfirmClick={showOrderConfirmation}
          onThemeToggle={() => setIsDarkTheme((current) => !current)}
        />
      )}

      {page === 'orderconfirmation' && (
        <OrderConfirmationPage
          isDarkTheme={isDarkTheme}
          onHomeClick={showHome}
          onProfileClick={showProfile}
          onViewOrders={showProfile}
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
                if (item === 'account') showProfile()
                else if (item === 'sell') showSell()
                else if (item === 'home') showHome()
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
