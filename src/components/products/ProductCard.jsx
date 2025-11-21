import { Link } from "react-router";
import { toast } from "sonner";

export function ProductCard({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.isComingSoon) {
      toast.info("Sản phẩm sắp ra mắt");
      return;
    }
    
    if (product.stock === 0) {
      toast.error("Sản phẩm hết hàng");
      return;
    }
    
    // Get current cart from localStorage
    const currentCart = localStorage.getItem('cart');
    const cartItems = currentCart ? JSON.parse(currentCart) : [];
    
    // Create cart item
    const cartItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images[0] || '/images/placeholder.jpg',
      quantity: 1
    };
    
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Item exists, update quantity
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // New item, add to cart
      cartItems.push(cartItem);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Dispatch custom event to update cart count in header
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    // Success toast for adding to cart
    toast.success("Đã thêm vào giỏ hàng!", {
      action: {
        label: "Xem giỏ hàng",
        onClick: () => {
          window.location.href = "/cart";
        }
      }
    });
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__link">
        <div className="product-card__image">
          <img 
            src={product.images[0] || '/images/placeholder.jpg'} 
            alt={product.name}
            width="400"
            height="400"
            style={{ width: '100%', height: '192px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg';
              e.target.alt = 'Placeholder image';
            }}
          />
          
          <div className="product-card__badges">
            {product.isComingSoon && (
              <span className="product-card__badge product-card__badge--coming-soon">
                Coming Soon
              </span>
            )}
            {product.discount > 0 && (
              <span className="product-card__badge product-card__badge--discount">
                -{product.discount}%
              </span>
            )}
            {product.stock === 0 && !product.isComingSoon && (
              <span className="product-card__badge product-card__badge--out-of-stock">
                Hết hàng
              </span>
            )}
          </div>
        </div>

        <div className="product-card__content">
          <h3 className="product-card__title">{product.name}</h3>
          <p className="product-card__brand">{product.brand}</p>
          
          <div className="product-card__footer">
            <div className="product-card__price">
              <span className="product-card__price-current">
                {formatPrice(product.price)}
              </span>
              {/* Always render this span to maintain layout consistency */}
              <span className="product-card__price-original">
                {product.originalPrice > product.price 
                  ? formatPrice(product.originalPrice)
                  : '' // Empty but still takes space
                }
              </span>
            </div>
            
            {product.isComingSoon ? (
              <span className="product-card__info product-card__info--coming-soon">
                {product.releaseDate ? new Date(product.releaseDate).toLocaleDateString('vi-VN') : 'Sớm'}
              </span>
            ) : (
              <span className="product-card__info">
                Còn: {product.stock}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="product-card__actions">
            <button
              onClick={handleAddToCart}
              disabled={product.isComingSoon || product.stock === 0}
              className="product-card__add-to-cart"
            >
              <svg 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                className="product-card__cart-icon"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18M17 18h2m-2 0v2m0-2l-2-2" 
                />
              </svg>
              <span>
                {product.isComingSoon 
                  ? 'Coming Soon' 
                  : product.stock === 0 
                    ? 'Hết hàng' 
                    : 'Thêm giỏ hàng'
                }
              </span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="product-skeleton animate-pulse">
      <div className="product-skeleton__image"></div>
      <div className="product-skeleton__content">
        <div className="skeleton-line skeleton-line--title"></div>
        <div className="skeleton-line skeleton-line--brand"></div>
        <div className="skeleton-footer">
          <div className="skeleton-price"></div>
          <div className="skeleton-stock"></div>
        </div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
}
