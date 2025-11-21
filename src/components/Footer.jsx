import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="container">
          <div className="footer__content">
            {/* Phần 1: Về chúng tôi */}
            <div className="footer__section footer__about">
              <h3 className="footer__title">Về chúng tôi</h3>
              
              <div className="footer__logo">
                <div className="footer__logo-icon">T</div>
                <span className="footer__logo-text">MÔ HÌNH GIÁ XƯỞNG</span>
              </div>
              
              <div className="footer__company-info">
                <h4>CÔNG TY TNHH  </h4>
                <div className="footer__legal">
                  <p>MST: 0601254344, Ngày cấp: 23-08-2023</p>
                  <p>Nơi cấp: Sở Kế Hoạch và Đầu Tư Tỉnh Nss</p>
                </div>
                <p className="footer__description">
                  Cung cấp sản phẩm chất lượng từ các thương hiệu hàng đầu.
                </p>
              </div>
              
              <div className="footer__contact">
                <div className="footer__contact-item">
                  <svg className="footer__contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Lô BT2-05 Đường Ddđ...</span>
                </div>
                
                <div className="footer__contact-item">
                  <svg className="footer__contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>09999999</span>
                </div>
                
                <div className="footer__contact-item">
                  <svg className="footer__contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>mohinhgiaxuong@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Phần 2: Chính sách & Hỗ trợ */}
            <div className="footer__section footer__policies">
              <div className="footer__policies-group">
                <h3 className="footer__title">Chính sách</h3>
                <ul className="footer__links">
                  <li><Link to="/chinh-sach-bao-mat">Chính Sách Bảo Mật Thông Tin</Link></li>
                  <li><Link to="/chinh-sach-bao-mat-thanh-toan">Chính Sách Bảo Mật Thông Tin Thanh Toán</Link></li>
                  <li><Link to="/dieu-khoan-giao-dich">Điều Khoản Giao Dịch Chung</Link></li>
                  <li><Link to="/chinh-sach-van-chuyen">Chính Sách Vận Chuyển Và Giao Hàng</Link></li>
                  <li><Link to="/chinh-sach-thanh-toan">Chính Sách Thanh Toán</Link></li>
                </ul>
              </div>
              
              <div className="footer__policies-group">
                <h3 className="footer__title">Hỗ trợ</h3>
                <ul className="footer__links">
                  <li><Link to="/huong-dan-mua-hang">Hướng dẫn mua hàng</Link></li>
                  <li><Link to="/huong-dan-thanh-toan">Hướng dẫn thanh toán</Link></li>
                  <li><Link to="/huong-dan-giao-nhan">Hướng dẫn giao nhận</Link></li>
                  <li><Link to="/dieu-khoan-dich-vu">Điều khoản dịch vụ</Link></li>
                </ul>
              </div>
            </div>

            {/* Phần 3: Phương thức thanh toán */}
            <div className="footer__section footer__payment">
              <h3 className="footer__title">Phương thức thanh toán</h3>
              
              <div className="footer__payment-methods">
                {/* Banking */}
                <div className="footer__payment-item">
                  <div className="footer__payment-card footer__payment-card--bank">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 8.5v7h20v-7H2zm18 5H4v-3h16v3zm-8-1.5H8v1h4v-1z"/>
                    </svg>
                    <span>Chuyển khoản</span>
                  </div>
                </div>
                
              
                
                {/* COD */}
                <div className="footer__payment-item">
                  <div className="footer__payment-card footer__payment-card--cod">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.06.66C6.16 17.37 8 12.14 17 10v2l4-3-4-3v2z"/>
                    </svg>
                    <span>Thanh toán khi nhận hàng</span>
                  </div>
                </div>
              </div>
              
              {/* BCT Logo */}
              {/* <div className="footer__certification">
                <div className="footer__bct">
                  <div className="footer__bct-logo">BCT</div>
                  <span>Đã thông báo bộ công thương</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__copyright">
            <p>&copy; 2024 Mô Hình G/.....</p>
            <div className="footer__social">
              <a href="#" aria-label="Facebook">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.23 16.779c-2.492 0-4.514-2.022-4.514-4.514s2.022-4.514 4.514-4.514 4.514 2.022 4.514 4.514-2.022 4.514-4.514 4.514zm7.554 0c-2.492 0-4.514-2.022-4.514-4.514s2.022-4.514 4.514-4.514 4.514 2.022 4.514 4.514-2.022 4.514-4.514 4.514z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
