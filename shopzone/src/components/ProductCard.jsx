function ProductCard({ product, onViewDetails, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />

        <span className="rating">⭐ {product.rating}</span>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>

        <h3>{product.name}</h3>

        <h2>₹{product.price.toLocaleString("en-IN")}</h2>

        <div className="product-actions">
          <button
            className="details-btn"
            onClick={() => onViewDetails(product)}
          >
            View Details
          </button>

          <button
            className="add-btn"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;