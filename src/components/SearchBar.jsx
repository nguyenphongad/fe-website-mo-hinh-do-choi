import { useState, useEffect } from "react";
import { Modal } from "./modals/Modal";

export function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceSort: ""
  });

  const placeholders = [
    "Tìm kiếm Gundam, Figure, Transformers...",
    "Tìm theo thương hiệu Bandai, Good Smile...",
    "Tìm mô hình yêu thích của bạn...",
    "Khám phá bộ sưu tập đồ chơi...",
    "Tìm quà tặng hoàn hảo..."
  ];

  const categories = [
    { id: "gundam", name: "Gundam", count: 4 },
    { id: "anime-figure", name: "Anime Figure", count: 3 },
    { id: "transformers", name: "Transformers", count: 2 },
    { id: "mo-hinh-xe", name: "Mô hình xe", count: 3 }
  ];


  // Typewriter effect for placeholder
  useEffect(() => {
    let timeout;
    const currentText = placeholders[placeholderIndex];
    
    if (isTyping) {
      // Typing effect
      if (currentPlaceholder.length < currentText.length) {
        timeout = setTimeout(() => {
          setCurrentPlaceholder(currentText.slice(0, currentPlaceholder.length + 1));
        }, 100); // Speed of typing
      } else {
        // Finished typing, wait before deleting
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Pause time
      }
    } else {
      // Deleting effect
      if (currentPlaceholder.length > 0) {
        timeout = setTimeout(() => {
          setCurrentPlaceholder(currentPlaceholder.slice(0, -1));
        }, 50); // Speed of deleting (faster than typing)
      } else {
        // Finished deleting, move to next placeholder
        timeout = setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
          setIsTyping(true);
        }, 300); // Pause before next text
      }
    }

    return () => clearTimeout(timeout);
  }, [currentPlaceholder, isTyping, placeholderIndex, placeholders]);

  const handleCategoryChange = (categoryId) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handlePriceSortChange = (sortType) => {
    setFilters(prev => ({
      ...prev,
      priceSort: prev.priceSort === sortType ? "" : sortType
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceSort: ""
    });
  };

  const applyFilters = () => {
    setShowFilterModal(false);
    // Apply filter logic here
    console.log("Applied filters:", filters);
  };

  const getFilterCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.priceSort) count += 1;
    return count;
  };

  const filterCount = getFilterCount();

  return (
    <>
      <div className="search-bar">
        <div className="search-bar__container">
          <div className="search-bar__input-wrapper">
            <svg className="search-bar__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={currentPlaceholder + (isTyping ? '|' : '')}
              className="search-bar__input"
            />
          </div>
          
          <button 
            onClick={() => setShowFilterModal(true)}
            className="search-bar__filter-btn"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Lọc</span>
            {filterCount > 0 && (
              <span className="search-bar__filter-count">{filterCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      <Modal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="Bộ lọc tìm kiếm"
        size="medium"
      >
        <div className="filter-modal-content">
          {/* Categories Filter */}
          <div className="filter-section">
            <h4 className="filter-section__title">Danh mục</h4>
            <div className="filter-section__options">
              {categories.map((category) => (
                <label key={category.id} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <span className="filter-checkbox__checkmark"></span>
                  <span className="filter-checkbox__label">
                    {category.name}
                    <span className="filter-checkbox__count">({category.count})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Sort Filter */}
          <div className="filter-section">
            <h4 className="filter-section__title">Sắp xếp theo giá</h4>
            <div className="filter-section__options">
              <label className="filter-radio">
                <input
                  type="radio"
                  name="priceSort"
                  checked={filters.priceSort === "asc"}
                  onChange={() => handlePriceSortChange("asc")}
                />
                <span className="filter-radio__checkmark"></span>
                <span className="filter-radio__label">Giá tăng dần</span>
              </label>
              
              <label className="filter-radio">
                <input
                  type="radio"
                  name="priceSort"
                  checked={filters.priceSort === "desc"}
                  onChange={() => handlePriceSortChange("desc")}
                />
                <span className="filter-radio__checkmark"></span>
                <span className="filter-radio__label">Giá giảm dần</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="filter-modal-actions">
            <button 
              onClick={clearFilters}
              className="btn btn-secondary filter-modal__clear"
            >
              Xóa bộ lọc
            </button>
            <button 
              onClick={applyFilters}
              className="btn btn-primary filter-modal__apply"
            >
              Áp dụng {filterCount > 0 && `(${filterCount})`}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
