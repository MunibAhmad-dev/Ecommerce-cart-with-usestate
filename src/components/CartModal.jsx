import React from "react";
import { useState } from "react";
import "../global.css";
export default function CartModal({ cartItems,handleClearCart, onClose, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const handleCheckout = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      onClose();
    }, 20000);
  };

  const handleRemoveClick = (id) => {
    setItemToRemove(id);
  };

  const confirmRemove = () => {
    onRemove(itemToRemove);
    setItemToRemove(null);
  };

  const cancelRemove = () => {
    setItemToRemove(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">🛒 Your Cart</h2>
          <button className="btn btn-danger" onClick={() => onClose(false)}>
            Close
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart feels lonely 🛒💔</p>
            <button 
              className="btn btn-primary mt-2"
              onClick={() => onClose(false)}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  {item.price < 500 && <span className="sale-badge">SALE 🔥</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span>₹{item.price}</span>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleRemoveClick(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              Total: ₹{total.toFixed(2)}
            </div>

            <button 
              className={`btn btn-primary ${cartItems.length === 0 ? 'btn-disabled' : ''}`}
              disabled={cartItems.length === 0}
              onClick={handleCheckout}
            >
              Checkout
              </button>
              <button className="btn btn-primary" onClick={()=> handleClearCart()} >Clear All Prodects</button>

            {showConfirmation && (
              <div className="text-center mt-2">
                <p>Your order has been confirmed!</p>
                <p>Total price: ₹{total.toFixed(2)} for {cartItems.length} items</p>
              </div>
            )}
          </>
        )}

        {itemToRemove && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <h3>Confirm Removal</h3>
              <p>Are you sure you want to remove this item from your cart?</p>
              <div className="confirmation-buttons">
                <button className="btn btn-danger" onClick={confirmRemove}>
                  Yes, Remove
                </button>
                <button className="btn btn-primary" onClick={cancelRemove}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}