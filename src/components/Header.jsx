import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

export function Header() {
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load cart items from localStorage
    const loadCart = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };

    loadCart();

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/login');
  };

  const categories = [
    { name: 'Gundam', path: '/category/gundam' },
    { name: 'Anime Figure', path: '/category/figure' },
    { name: 'Transformers', path: '/category/transformers' },
    { name: 'Mô hình xe', path: '/category/vehicles' },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <header className="header">
      <div className="header__container container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <div className="header__logo-icon">
            <span>T</span>
          </div>
          <span className="header__logo-text">ToyStore</span>
        </Link>

        {/* Navigation Menu */}
        <nav className="header__nav">
          <Link to="/" className="header__nav-link">
            Trang chủ
          </Link>
          
          <div 
            className="header__nav-dropdown"
            onMouseEnter={() => setShowCategoryMenu(true)}
            onMouseLeave={() => setShowCategoryMenu(false)}
          >
            <button className="header__nav-dropdown-toggle">
              Danh mục
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showCategoryMenu && (
              <div className="header__nav-dropdown-menu">
                {categories.map((category) => (
                  <Link
                    key={category.path}
                    to={category.path}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* <Link to="/about" className="header__nav-link">
            Giới thiệu
          </Link>
          <Link to="/contact" className="header__nav-link">
            Liên hệ
          </Link> */}
        </nav>

        {/* Right Side */}
        <div className="header__actions">
          {/* Cart with Dropdown */}
          <div 
            className="header__cart-container"
            onMouseEnter={() => setShowCartDropdown(true)}
            onMouseLeave={() => setShowCartDropdown(false)}
          >
            <Link to="/cart" className="header__cart">
              <MdOutlineShoppingCartCheckout size={24} />
              {getTotalItems() > 0 && (
                <span className="header__cart-badge">{getTotalItems()}</span>
              )}
            </Link>

            {/* Cart Dropdown */}
            {showCartDropdown && (
              <div className="header__cart-dropdown">
                <div className="header__cart-dropdown-header">
                  <h3>Giỏ hàng ({getTotalItems()})</h3>
                </div>
                
                <div className="header__cart-dropdown-content">
                  {cartItems.length === 0 ? (
                    <p className="empty-cart">Giỏ hàng trống</p>
                  ) : (
                    <>
                      <div className="cart-items">
                        {cartItems.slice(0, 3).map((item) => (
                          <div key={`${item.id}-${item.size || 'default'}`} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div className="cart-item-info">
                              <h4>{item.name}</h4>
                              <p>
                                {item.quantity} x {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {cartItems.length > 3 && (
                        <p className="more-items">Và {cartItems.length - 3} sản phẩm khác...</p>
                      )}
                      
                      <div className="cart-total">
                        <strong>Tổng: {formatPrice(getTotalPrice())}</strong>
                      </div>
                      
                      <div className="cart-actions">
                        <Link to="/cart" className="btn btn-primary">
                          Xem giỏ hàng
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile or Login */}
          {user ? (
            <div className="header__profile">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="header__profile-toggle"
              >
                <img 
                  src={user.avatar || '/avatars/default.jpg'} 
                  alt={user.name}
                />
                <span>{user.name}</span>
              </button>

              {showProfileMenu && (
                <div className="header__profile-menu">
                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Thông tin cá nhân
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Đơn hàng của tôi
                  </Link>
                  <div className="divider"></div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowProfileMenu(false);
                    }}
                    className="danger"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login"
              className="btn btn-primary"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
