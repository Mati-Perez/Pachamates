// src/App.jsx
import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';
import Envio from './pages/Envio';
import Cuenta from './pages/Cuenta';

export default function App() {
  // 🛒 Estado del carrito y drawer
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const contactoRef = useRef(null);
  const usuario = JSON.parse(localStorage.getItem('usuario'));


  const scrollToContacto = () => {
    contactoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 👉 Agregar producto al carrito
  const handleAddToCart = (producto) => {
    setCartItems((prev) => [...prev, producto]);
  };

  // ❌ Eliminar producto del carrito
  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Finalizar compra
  const handleCheckout = () => {
    alert('¡Gracias por tu compra! 🧉');
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <BrowserRouter>
      {/* Navbar con cantidad de productos en el carrito */}
      <Navbar cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} onContactoClick={scrollToContacto}/>

      {/* Rutas principales */}
      <Routes>
        <Route path="/" element={<Inicio contactoRef={contactoRef}/>} />
        <Route path="/tienda" element={<Tienda onAddToCart={handleAddToCart} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        
        <Route
          path="/panel"
          element={
            usuario?.email === 'admin'
              ? <AdminPanel />
              : <Cuenta />
          }
        />

        <Route path="/envio" element={<Envio />} />


      </Routes>

      {/* Drawer del carrito */}
      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <Footer />
    </BrowserRouter>
  );
}
