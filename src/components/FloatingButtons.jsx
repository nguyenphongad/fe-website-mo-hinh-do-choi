import { MdPhone } from "react-icons/md";
import { SiZalo } from "react-icons/si";

export function FloatingButtons() {
  const phoneNumber = "099999999";
  const zaloLink = "https://zalo.me/099999999";

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleZalo = () => {
    window.open(zaloLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="floating-buttons">
      <button
        onClick={handleCall}
        className="floating-buttons__btn floating-buttons__btn--call"
        title="Gọi điện thoại"
        aria-label="Gọi điện thoại"
      >
        <MdPhone size={24} />
        <span className="floating-buttons__tooltip">
          Gọi ngay: {phoneNumber}
        </span>
      </button>

      <button
        onClick={handleZalo}
        className="floating-buttons__btn floating-buttons__btn--zalo"
        title="Chat Zalo"
        aria-label="Chat Zalo"
      >
        <SiZalo size={20} />
        <span className="floating-buttons__tooltip">
          Chat Zalo
        </span>
      </button>
    </div>
  );
}
