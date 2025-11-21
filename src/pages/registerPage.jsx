import React, { useState } from 'react';
import { Link, useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function meta() {
  return [
    { title: "Đăng ký - ToyStore" },
    { name: "description", content: "Tạo tài khoản ToyStore để mua sắm mô hình đồ chơi" },
  ];
}

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError("Vui lòng nhập họ");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Vui lòng nhập tên");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Vui lòng nhập số điện thoại");
      return false;
    }
    if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      setError("Số điện thoại không hợp lệ");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Vui lòng nhập email");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Email không hợp lệ");
      return false;
    }
    if (!formData.password) {
      setError("Vui lòng nhập mật khẩu");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      const response = await fetch('/data_samples/accounts.json');
      const accounts = await response.json();
      
      const existingUser = accounts.find(acc => acc.email === formData.email);
      if (existingUser) {
        setError("Email này đã được sử dụng");
        return;
      }

      // Create new user object
      const newUser = {
        id: String(accounts.length + 1),
        email: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        avatar: '/avatars/default.jpg',
        role: 'customer',
        createdAt: new Date().toISOString().split('T')[0],
        orders: []
      };

      // In real app, this would be sent to server
      console.log("New user created:", newUser);
      
      // Auto login after registration
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      // Show success message and redirect
      alert("Đăng ký thành công! Chào mừng bạn đến với ToyStore!");
      navigate('/');
      
    } catch (err) {
      setError("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    // Simulate Google registration
    alert("Chức năng đăng ký bằng Google sẽ được cập nhật sớm!");
  };

  return (
    <div className="home-page">
      <Header />
      
      <main className="container">
        <div className="login-section">
          <div className="login-section__container">
            {/* Header */}
            <div className="login-section__header">
              <div className="logo">
                <span>T</span>
              </div>
              <h2>Tạo tài khoản mới</h2>
              <p>Đăng ký để trải nghiệm mua sắm tuyệt vời tại ToyStore</p>
            </div>

            {/* Form */}
            <div className="login-section__form">
              <form onSubmit={handleRegister}>
                {error && (
                  <div className="error-message">
                    <p>{error}</p>
                  </div>
                )}

                {/* Name Fields */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">
                      Họ <span className="required">*</span>
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Họ"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">
                      Tên <span className="required">*</span>
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Tên"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="phone">
                    Số điện thoại <span className="required">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Số điện thoại"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                </div>

                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password">
                    Mật khẩu <span className="required">*</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                  />
                </div>

                {/* Confirm Password */}
                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    Xác nhận mật khẩu <span className="required">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="login-btn"
                >
                  {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
                </button>

                {/* Divider */}
                <div className="divider">
                  <span>Hoặc</span>
                </div>

                {/* Google Register */}
                <button
                  type="button"
                  onClick={handleGoogleRegister}
                  className="google-btn"
                >
                  <svg viewBox="0 0 24 24">
                    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Đăng ký với Google</span>
                </button>
              </form>

              {/* Login Link */}
              <div className="auth-switch">
                <p>Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default Register;
