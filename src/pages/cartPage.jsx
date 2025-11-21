import { useState, useEffect } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Footer } from "../components/Footer";
import { FloatingButtons } from "../components/FloatingButtons";

export function meta() {
  return [
    { title: "Giỏ hàng - ToyStore" },
    { name: "description", content: "Xem và quản lý giỏ hàng của bạn" },
  ];
}

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    // Dispatch custom event to update cart count in header
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const updateQuantity = (itemId, size, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId && (item.size || 'default') === (size || 'default')) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    updateCart(updatedCart);
    toast.success("Đã cập nhật số lượng");
  };

  const removeItem = (itemId, size) => {
    const updatedCart = cartItems.filter(item => 
      !(item.id === itemId && (item.size || 'default') === (size || 'default'))
    );
    
    updateCart(updatedCart);
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
  };

  const clearCart = () => {
    updateCart([]);
    toast.success("Đã xóa toàn bộ giỏ hàng");
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="home-page">
        <div className="cart-page">
          <div className="container">
            <div className="cart-loading">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-24 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="home-page">
      <main className="cart-page">
        <div className="container">
          <div className="cart-header">
            <h1>Giỏ hàng của bạn</h1>
            <span className="cart-count">({getTotalItems()} sản phẩm)</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart__icon">
                🛒
              </div>
              <h2>Giỏ hàng trống</h2>
              <p>Bạn chưa thêm sản phẩm nào vào giỏ hàng</p>
              <Link to="/" className="btn btn-primary">
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <div className="cart-content">
              <div className="cart-items">
                <div className="cart-items__header">
                  <span>Sản phẩm</span>
                  <span>Đơn giá</span>
                  <span>Số lượng</span>
                  <span>Thành tiền</span>
                  <span></span>
                </div>

                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size || 'default'}`} className="cart-item">
                    <div className="cart-item__product">
                      <Link to={`/product/${item.id}`}>
                        <img src={item.image} alt={item.name} />
                      </Link>
                      <div className="cart-item__info">
                        <Link to={`/product/${item.id}`}>
                          <h3>{item.name}</h3>
                        </Link>
                        <p className="brand">{item.brand}</p>
                        {item.size && (
                          <p className="variant">Kích thước: {item.size}</p>
                        )}
                      </div>
                    </div>

                    <div className="cart-item__price">
                      {formatPrice(item.price)}
                    </div>

                    <div className="cart-item__quantity">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="quantity-btn"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-item__total">
                      {formatPrice(item.price * item.quantity)}
                    </div>

                    <div className="cart-item__actions">
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="remove-btn"
                        title="Xóa sản phẩm"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-sidebar">
                <div className="cart-summary">
                  <h3>Tóm tắt đơn hàng</h3>
                  
                  <div className="summary-row">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  
                  <div className="summary-row">
                    <span>Phí vận chuyển:</span>
                    <span className="free">Miễn phí</span>
                  </div>
                  
                  <div className="summary-divider"></div>
                  
                  <div className="summary-row total">
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>

                  <button className="btn btn-primary checkout-btn">
                    Tiến hành thanh toán
                  </button>
                  
                </div>

                <div className="cart-actions">
                  <button 
                    onClick={clearCart}
                    className="btn btn-secondary clear-cart"
                  >
                    Xóa toàn bộ giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
    </div>
  );
}
