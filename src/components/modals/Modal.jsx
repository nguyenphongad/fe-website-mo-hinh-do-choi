import { useEffect, useState } from "react";

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = "medium",
  showCloseButton = true,
  closeOnOverlayClick = true 
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      handleClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'modal--small',
    medium: 'modal--medium', 
    large: 'modal--large',
    full: 'modal--full'
  };

  return (
    <div 
      className={`modal-overlay ${isAnimating ? 'modal-overlay--open' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={`modal ${sizeClasses[size]} ${isAnimating ? 'modal--open' : ''}`}>
        {(title || showCloseButton) && (
          <div className="modal__header">
            {title && <h3 className="modal__title">{title}</h3>}
            {showCloseButton && (
              <button 
                onClick={handleClose}
                className="modal__close"
                aria-label="Đóng modal"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );
}
