import { useState, useEffect } from "react";
import { Link } from "react-router";
import { SearchBar } from "../components/SearchBar";
import { HeroSection } from "../components/HeroSection";
import { ProductCard, ProductSkeleton } from "../components/products/ProductCard";
import { Footer } from "../components/Footer";
import productsData from "../data_samples/products.json";

export function meta() {
  return [
    { title: "ToyStore - Mô hình đồ chơi chất lượng cao" },
    { name: "description", content: "Khám phá bộ sưu tập mô hình đồ chơi độc đáo tại ToyStore" },
  ];
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="home-page">
      <main className="container">
        {/* Search Bar */}
        <SearchBar />
        
        {/* Hero Section */}
        <HeroSection />

        {/* Products Section */}
        <section className="products-section">
          <div className="section-header">
            <h2>Sản phẩm nổi bật</h2>
            <Link to="/products" className="view-all-link">
              Xem tất cả →
            </Link>
          </div>

          <div className="grid grid-4">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            }
          </div>
        </section>
      </main>
      
    </div>
  );
}
