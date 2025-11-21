import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Footer } from "../components/Footer";
import accountsData from "../data_samples/accounts.json";

export function meta() {
  return [
    { title: "Đăng nhập - ToyStore" },
    { name: "description", content: "Đăng nhập vào tài khoản ToyStore của bạn" },
  ];
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate inputs
      if (!email.trim()) {
        toast.error("Vui lòng nhập email");
        return;
      }
      
      if (!password.trim()) {
        toast.error("Vui lòng nhập mật khẩu");
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = accountsData.find((acc) => 
        acc.email === email && acc.password === password
      );

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast.success("Đăng nhập thành công!");
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        toast.error("Email hoặc mật khẩu không chính xác");
        setError("Email hoặc mật khẩu không chính xác");
      }
    } catch (err) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
      setError("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Chức năng Google sẽ được cập nhật sớm!");
  };

  return (
    <div className="home-page">
      <main className="container">
        <div className="login-section">
          <div className="login-section__container">
            {/* Header */}
            <div className="login-section__header">
              <p>Đăng nhập để thanh toán và khám phá thế giới mô hình đồ chơi</p>
            </div>

            {/* Form */}
            <div className="login-section__form">
              {/* Demo accounts */}
              <div className="demo-info">
                <h3>Tài khoản demo:</h3>
                <p>Email: user@gmail.com</p>
                <p>Mật khẩu: 123456</p>
              </div>

              <form onSubmit={handleLogin}>
                {/* Remove old error message display since we're using toast */}
                
                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@gmail.com"
                  />
                </div>

                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="login-btn"
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>

                {/* Divider */}
                <div className="divider">
                  <span>Hoặc</span>
                </div>

                {/* Google Login */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="google-btn"
                >
                  <svg viewBox="0 0 24 24">
                    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Đăng nhập với Google</span>
                </button>
              </form>
              
              {/* Register Link */}
              <div className="auth-switch">
                <p>Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}
