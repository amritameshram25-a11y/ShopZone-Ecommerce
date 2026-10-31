function Navbar({ search, setSearch, cartCount, onCartClick }) {
  return (
    <nav className="navbar">
      <div className="logo">
        OSO<span>Store.</span>
      </div>

      <div className="search-box">
        <span>⌕</span>
        <input
          type="text"
          placeholder="Search your favorite products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button className="cart-button" onClick={onCartClick}>
        🛒 Cart
        <span className="cart-count">{cartCount}</span>
      </button>
    </nav>
  );
}

export default Navbar;