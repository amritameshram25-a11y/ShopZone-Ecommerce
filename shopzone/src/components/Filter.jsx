function Filter({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort
}) {
  return (
    <aside className="filter-panel">
      <h3>Filters</h3>

      <div className="filter-group">
        <h4>Categories</h4>

        {["All", "Electronics", "Fashion", "Beauty", "Home"].map((item) => (
          <button
            key={item}
            className={category === item ? "category active" : "category"}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="filter-group">
        <h4>Minimum Price (₹)</h4>
        <input
          type="number"
          min="0"
          value={minPrice}
          placeholder="Minimum price"
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <h4>Maximum Price (₹)</h4>
        <input
          type="number"
          min="0"
          value={maxPrice}
          placeholder="Maximum price"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <h4>Sort By</h4>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>
    </aside>
  );
}

export default Filter;