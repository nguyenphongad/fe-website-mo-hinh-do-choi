export function ReviewCard({ review }) {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="review-card">
      <div className="review-card__header">
        <div className="review-card__avatar">
          <img src={review.avatar || '/avatars/default.jpg'} alt={review.author} />
        </div>
        <div className="review-card__meta">
          <h4 className="review-card__author">{review.author}</h4>
          <div className="review-card__rating">
            <div className="stars">{renderStars(review.rating)}</div>
            <span className="date">{formatDate(review.date)}</span>
          </div>
        </div>
      </div>
      
      <div className="review-card__content">
        <p>{review.content}</p>
        
        {review.images && review.images.length > 0 && (
          <div className="review-card__images">
            {review.images.map((image, index) => (
              <img key={index} src={image} alt={`Review ${index + 1}`} />
            ))}
          </div>
        )}
      </div>
      
      {review.helpful && (
        <div className="review-card__footer">
          <button className="helpful-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7v13m-3-3h6M7 17v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4a1 1 0 011-1h1a1 1 0 011 1z" />
            </svg>
            Hữu ích ({review.helpful})
          </button>
        </div>
      )}
    </div>
  );
}
