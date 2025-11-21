import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Tabs, Rate } from "antd";
import { toast } from "sonner";
import { Footer } from "../components/Footer";
import { ReviewCard } from "../components/products/ReviewCard";

export function meta() {
  return [
    { title: "Chi tiết sản phẩm - ToyStore" },
    { name: "description", content: "Xem chi tiết sản phẩm mô hình đồ chơi" },
  ];
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      author: "Nguyễn Văn A",
      avatar: "/avatars/user1.jpg",
      rating: 5,
      date: "2024-01-15",
      content: "Sản phẩm rất chất lượng, chi tiết rất đẹp. Đóng gói cẩn thận, giao hàng nhanh. Sẽ ủng hộ shop lần sau!",
      helpful: 12,
      images: [
        "https://jola.vn/cdn/720/Article/o_wEjh0eC/ecwceqwe.jpg"
      ]
    },
    {
      id: 2,
      author: "Trần Thị B",
      avatar: "/avatars/user2.jpg", 
      rating: 4,
      date: "2024-01-10",
      content: "Mô hình đẹp, giá hợp lý. Chỉ có điều hộp hơi bị móp một chút nhưng không ảnh hưởng đến sản phẩm bên trong.",
      helpful: 8
    },
    {
      id: 3,
      author: "Lê Minh C",
      avatar: "/avatars/user3.jpg",
      rating: 5,
      date: "2024-01-05", 
      content: "Chất lượng tuyệt vời! Khớp nối rất chắc chắn, màu sắc sống động. Đúng như mô tả.",
      helpful: 15
    }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const response = await fetch('/data_samples/products.json');
        const products = await response.json();
        const foundProduct = products.find(p => p.id === id);
        
        setProduct(foundProduct);
        setReviews(mockReviews);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleAddToCart = () => {
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
      quantity: quantity
    };
    
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Item exists, update quantity
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // New item, add to cart
      cartItems.push(cartItem);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Dispatch custom event to update cart count in header
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    toast.success("Đã thêm vào giỏ hàng!", {
      action: {
        label: "Xem giỏ hàng",
        onClick: () => {
          window.location.href = "/cart";
        }
      }
    });
  };

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`star ${i < rating ? 'filled' : ''}`}
        fill={i < rating ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="home-page">
        <div className="product-detail">
          <div className="container">
            <div className="product-detail__loading">
              <div className="product-detail-skeleton">
                <div className="product-detail-skeleton__images">
                  <div className="skeleton-main-image"></div>
                  <div className="skeleton-thumbnails">
                    {[1,2,3].map(i => (
                      <div key={i} className="skeleton-thumb"></div>
                    ))}
                  </div>
                </div>
                <div className="product-detail-skeleton__info">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-brand"></div>
                  <div className="skeleton-rating"></div>
                  <div className="skeleton-price"></div>
                  <div className="skeleton-description"></div>
                  <div className="skeleton-description"></div>
                  <div className="skeleton-description" style={{ width: '70%' }}></div>
                  <div className="skeleton-specs"></div>
                  <div className="skeleton-stock"></div>
                  <div className="skeleton-actions"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="home-page">
        <div className="product-detail">
          <div className="container">
            <div className="product-not-found">
              <div className="product-not-found__content">
                <h1>Không tìm thấy sản phẩm</h1>
                <p>Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <Link to="/" className="btn btn-primary">Về trang chủ</Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const tabItems = [
    {
      key: 'description',
      label: 'Mô tả chi tiết',
      children: (
        <div style={{ background: 'var(--white)', padding: '24px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>Mô tả chi tiết sản phẩm</h3>
          <p style={{ lineHeight: '1.8', color: 'var(--gray-700)', marginBottom: '16px' }}>
            {product?.description}
          </p>
          <p style={{ lineHeight: '1.8', color: 'var(--gray-700)' }}>
            Sản phẩm được làm từ chất liệu {product?.specifications?.material} cao cấp, 
            đảm bảo độ bền và an toàn cho người sử dụng. Với tỷ lệ {product?.specifications?.scale}, 
            mô hình có kích thước {product?.specifications?.height} phù hợp để trưng bày.
          </p>
        </div>
      ),
    },
    {
      key: 'specifications',
      label: 'Thông số kỹ thuật',
      children: (
        <div style={{ background: 'var(--white)', padding: '24px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>Thông số kỹ thuật chi tiết</h3>
          <table style={{ width: '100%', marginTop: '16px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                <td style={{ padding: '12px 0', fontWeight: '600', width: '30%' }}>Tỷ lệ:</td>
                <td style={{ padding: '12px 0' }}>{product?.specifications?.scale}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                <td style={{ padding: '12px 0', fontWeight: '600' }}>Chiều cao:</td>
                <td style={{ padding: '12px 0' }}>{product?.specifications?.height}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                <td style={{ padding: '12px 0', fontWeight: '600' }}>Chất liệu:</td>
                <td style={{ padding: '12px 0' }}>{product?.specifications?.material}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                <td style={{ padding: '12px 0', fontWeight: '600' }}>Độ khó:</td>
                <td style={{ padding: '12px 0' }}>{product?.specifications?.difficulty}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                <td style={{ padding: '12px 0', fontWeight: '600' }}>Thương hiệu:</td>
                <td style={{ padding: '12px 0' }}>{product?.brand}</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 0', fontWeight: '600' }}>Danh mục:</td>
                <td style={{ padding: '12px 0' }}>{product?.category}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: 'reviews',
      label: `Đánh giá (${reviews.length})`,
      children: (
        <div>
          <div style={{ 
            background: 'var(--white)', 
            padding: '24px', 
            borderRadius: '12px', 
            marginBottom: '24px' 
          }}>
            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>Tổng quan đánh giá</h3>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '24px', 
              marginTop: '16px' 
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: '700', 
                  color: 'var(--primary-color)',
                  lineHeight: '1'
                }}>
                  {calculateAverageRating()}
                </div>
                <Rate 
                  disabled 
                  value={Math.floor(calculateAverageRating())} 
                  style={{ fontSize: '20px', color: 'var(--primary-color)' }}
                />
                <div style={{ 
                  color: 'var(--gray-600)', 
                  fontSize: '14px',
                  marginTop: '8px'
                }}>
                  Dựa trên {reviews.length} đánh giá
                </div>
              </div>
            </div>
          </div>

          <div>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      ),
    },
  ];

  if (!product) {
    return (
      <div className="home-page">
        <div className="product-detail">
          <div className="container">
            <div className="product-not-found">
              <div className="product-not-found__content">
                <h1>Không tìm thấy sản phẩm</h1>
                <p>Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <Link to="/" className="btn btn-primary">Về trang chủ</Link>
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
      <main className="product-detail">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="product-detail__breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

          <div className="product-detail__content">
            {/* Images */}
            <div className="product-detail__images">
              <div className="product-detail__main-image">
                <img 
                  src={product.images[selectedImage] || '/images/placeholder.jpg'} 
                  alt={product.name}
                  onClick={handleImageClick}
                  style={{ cursor: 'pointer' }}
                />
                
                {/* Badges */}
                <div className="product-detail__badges">
                  {product.isComingSoon && (
                    <span className="badge badge--coming-soon">Coming Soon</span>
                  )}
                  {product.discount > 0 && (
                    <span className="badge badge--discount">-{product.discount}%</span>
                  )}
                  {product.stock === 0 && !product.isComingSoon && (
                    <span className="badge badge--out-of-stock">Hết hàng</span>
                  )}
                </div>
              </div>
              
              <div className="product-detail__thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`product-detail__thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-detail__info">
              <h1 className="product-detail__title">{product.name}</h1>
              <p className="product-detail__brand">Thương hiệu: {product.brand}</p>
              
              <div className="product-detail__rating">
                <div className="stars">
                  {renderStars(Math.floor(calculateAverageRating()))}
                </div>
                <span className="rating-text">
                  {calculateAverageRating()} ({reviews.length} đánh giá)
                </span>
              </div>
              
              <div className="product-detail__price">
                <span className="current-price">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                    <span className="discount-badge">-{product.discount}%</span>
                  </>
                )}
              </div>

              <div className="product-detail__description">
                <h3>Mô tả sản phẩm</h3>
                <p>{product.description}</p>
              </div>

              <div className="product-detail__specs">
                <h3>Thông số kỹ thuật</h3>
                <ul>
                  <li><strong>Tỷ lệ:</strong> <span>{product.specifications?.scale}</span></li>
                  <li><strong>Chiều cao:</strong> <span>{product.specifications?.height}</span></li>
                  <li><strong>Chất liệu:</strong> <span>{product.specifications?.material}</span></li>
                  <li><strong>Độ khó:</strong> <span>{product.specifications?.difficulty}</span></li>
                </ul>
              </div>

              <div className="product-detail__stock">
                {product.isComingSoon ? (
                  <p className="coming-soon">
                    Sản phẩm sẽ ra mắt: {product.releaseDate ? new Date(product.releaseDate).toLocaleDateString('vi-VN') : 'Sớm'}
                  </p>
                ) : product.stock > 0 ? (
                  <p className="in-stock">Còn {product.stock} sản phẩm</p>
                ) : (
                  <p className="out-of-stock">Hết hàng</p>
                )}
              </div>

              {!product.isComingSoon && product.stock > 0 && (
                <div className="product-detail__actions">
                  <div className="quantity-selector">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max={product.stock}
                    />
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className="btn btn-primary add-to-cart-btn"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              )}

              <div className="product-detail__tags">
                {product.tags?.map((tag) => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Product Sections with Ant Design Tabs */}
          <div className="product-sections">
            <Tabs
              defaultActiveKey="description"
              items={tabItems}
              size="large"
              style={{
                marginTop: '48px',
                '--ant-primary-color': 'var(--primary-color)',
              }}
              tabBarStyle={{
                marginBottom: '32px',
                borderBottom: '2px solid var(--gray-200)',
              }}
            />
          </div>
        </div>

        {/* Simple Image Modal */}
        {isImageModalOpen && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => setIsImageModalOpen(false)}
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
                borderRadius: '8px'
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setIsImageModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'var(--white)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
