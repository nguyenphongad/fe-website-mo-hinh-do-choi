import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import Register from './pages/registerPage'
import CartPage from './pages/cartPage'
import ProductDetailPage from './pages/productDetailPage'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import "./styles/main.scss"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <header >
        <Header />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  )
}

export default App
