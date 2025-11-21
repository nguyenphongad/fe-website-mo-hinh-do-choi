import { useState, useEffect } from "react";
import { Link } from "react-router";

export function HeroSection() {
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      try {
        const response = await fetch('/data_samples/products.json');
        const products = await response.json();
        // Lấy sản phẩm đầu tiên làm sản phẩm nổi bật
        setFeaturedProduct(products[0]);
      } catch (error) {
        console.error('Error loading featured product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProduct();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading || !featuredProduct) {
    return (
      <section className="hero">
        <div className="hero__loading">
          <div className="hero__loading-content">
            <div className="skeleton-badge"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-brand"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-price"></div>
            
            <div className="skeleton-features">
              <div className="skeleton-feature">
                <div className="skeleton-icon"></div>
                <div className="skeleton-text"></div>
              </div>
              <div className="skeleton-feature">
                <div className="skeleton-icon"></div>
                <div className="skeleton-text"></div>
              </div>
              <div className="skeleton-feature">
                <div className="skeleton-icon"></div>
                <div className="skeleton-text"></div>
              </div>
            </div>
            
            <div className="skeleton-buttons">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
          <div className="hero__loading-image">
            <div className="skeleton-image"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__info">
          <div className="hero__badge-group">
            <div className="hero__badge">Sản phẩm nổi bật</div>
            {featuredProduct.isComingSoon && (
              <div className="hero__badge hero__badge--coming-soon">
                Coming Soon
              </div>
            )}
          </div>
          <h1 className="hero__title">{featuredProduct.name}</h1>
          <p className="hero__brand">Thương hiệu: {featuredProduct.brand}</p>
          <p className="hero__description">{featuredProduct.description}</p>
          
          <div className="hero__price">
            <span className="hero__price-current">
              {formatPrice(featuredProduct.price)}
            </span>
            {featuredProduct.originalPrice > featuredProduct.price && (
              <span className="hero__price-original">
                {formatPrice(featuredProduct.originalPrice)}
              </span>
            )}
          </div>

          <div className="hero__features">
            <div className="hero__feature">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Chất lượng cao</span>
            </div>
            <div className="hero__feature">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span>Giá tốt nhất</span>
            </div>
            <div className="hero__feature">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Miễn phí giao hàng</span>
            </div>
          </div>

          <div className="hero__actions">
            <Link 
              to={`/product/${featuredProduct.id}`}
              className="btn btn-primary hero__cta"
            >
              Xem chi tiết
            </Link>
            {/* {!featuredProduct.isComingSoon && featuredProduct.stock > 0 && (
              <button className="btn btn-secondary hero__add-to-cart">
                Thêm vào giỏ hàng
              </button>
            )} */}
          </div>
        </div>

        <div className="hero__image">
          <div className="hero__image-wrapper">
            <img 
              src={featuredProduct.images[0] || '/images/placeholder.jpg'} 
              alt={featuredProduct.name}
            />
            
            {/* Discount Badge */}
            {featuredProduct.discount > 0 && (
              <div className="hero__badges">
                <span className="hero__badge-item hero__badge-item--discount">
                  -{featuredProduct.discount}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
