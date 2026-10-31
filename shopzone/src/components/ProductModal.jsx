function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <img src={product.image} alt={product.name} />

        <div className="modal-info">
          <p className="product-category">{product.category}</p>

          <h2>{product.name}</h2>

          <p>⭐ {product.rating} / 5</p>

          <h2>₹{product.price.toLocaleString("en-IN")}</h2>

          <p>{product.description}</p>

          <button
            className="add-btn"
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;