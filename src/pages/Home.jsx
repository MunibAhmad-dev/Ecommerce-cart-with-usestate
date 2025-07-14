import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductsApi from "../components/useProductsApi";
import CartModal from "../components/CartModal";
import WishlistF from "../components/WishlistF";
export default function Home({ user, showCartOnLoad = false }) {
  const { products, error, loading } = useProductsApi("https://ecommerce-cart-with-usestate-8c3c.vercel.app/api/products");
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(showCartOnLoad);
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const navigate = useNavigate();

  const requireAuth = () => {
  if (!user) {
    const confirmRedirect = window.confirm("You must sign in or sign up to continue.\n\nDo you want to go to Sign In?");
    if (confirmRedirect) {
      navigate("/signin");
    }
    return false;
  }
  return true;
  };
  
    const handleLogout = () => {
    localStorage.removeItem("auth");
navigate("/signin");
}
  const handleAddToCart = (item) => {
    if (!requireAuth()) return;
    if (!cartItems.some(i => i.id === item.id)) {
      setCartItems(prev => [...prev, item]);
    }
  };
  const handleWishlistAdd = (item) => {
    if (!requireAuth()) return;
    if (!wishlist.some(i => i.id === item.id)) {
      setWishlist(prev => [...prev, item]);
    }
  };
  const handleRemoveCart = (id) => setCartItems(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setCartItems([]);
  const removeWishlist = (id) => setWishlist(prev => prev.filter(i => i.id !== id));
  return (
      <div className="app-container">
          <div style={{display: "flex", justifyContent: "flex-end"}}>     
      <button className="btn btn-color btn-secondary" onClick={() => setShowCart(true)}>
        🛒 Cart ({cartItems.length})
      </button>
      <button  className="btn btn-color" onClick={() => setShowWishlist(true)}>
        💘 Wishlist ({wishlist.length})
              </button>
              <button onClick={handleLogout} style={{backgroundColor: "red"}} className="btn btn-color btn-primary"> LogOut</button>
          </div>
      {loading && <p>Loading products…</p>}
      {error && <p>{error}</p>}
      <div className="product-grid">
        {products.map(item => (
            <div key={item.id} className="product-card">
                <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>₹{item.price}</p>
            <button
              className={`btn ${cartItems.some(i => i.id === item.id) ? "btn-disabled" : "btn-primary"}`}
              disabled={cartItems.some(i => i.id === item.id)}
              onClick={() => handleAddToCart(item)}
            >
              {cartItems.some(i => i.id === item.id) ? "Added" : "Add to Cart"}
            </button>
            <button
              className={`btn ${wishlist.some(i => i.id === item.id) ? "btn-disabled" : "btn-primary"}`}
              disabled={wishlist.some(i => i.id === item.id)}
              onClick={() => handleWishlistAdd(item)}
            >
              {wishlist.some(i => i.id === item.id) ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>
        ))}
      </div>
      {showCart && (
        <CartModal
          cartItems={cartItems}
          onRemove={handleRemoveCart}
          handleClearCart={clearCart}
          onClose={() => setShowCart(false)}
        />
      )}
      {showWishlist && (
        <WishlistF
          Wishlist={wishlist}
          handleaddtocart={(i) => { handleAddToCart(i); removeWishlist(i.id); }}
          onwishremove={removeWishlist}
          close={() => setShowWishlist(false)}
        />
      )}
    </div>
  );
}
