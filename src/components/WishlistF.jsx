import React, { useState } from "react";
import "../global.css";

function WishlistF({ Wishlist, handleaddtocart, close, onwishremove }) {
    const [wishtocart, setwishtocart] = useState([]);

    const handlewishtocart = () => {
        setwishtocart([...wishtocart, Wishlist])
    }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">💖 Your Wishlist</h2>
          <button className="btn btn-danger" onClick={() => close(false)}>
            Close
          </button>
        </div>

        {Wishlist.length === 0 ? (
          <div className="empty-cart">
            <p>Your wishlist is empty 💔</p>
            <button
              className="btn btn-primary mt-2"
              onClick={() => close(false)}
            >
              Continue Browsing
            </button>
          </div>
        ) : (
          <>
            {Wishlist.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span>₹{item.price}</span>
                  <button
                    className="btn btn-danger"
                    onClick={() => onwishremove(item.id)}
                  >
                    Remove
                        </button>
<button
  onClick={() => {
    handleaddtocart(item);      // Add to cart
    onwishremove(item.id);      // Remove from wishlist
  }}
  className="btn btn-primary"
>
  Add to Cart
</button>                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default WishlistF;
