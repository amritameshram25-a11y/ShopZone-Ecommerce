import { useState } from "react";

import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";

import products from "./Data/Products";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("default");

  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);

  // Filter products
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    const matchesMin =
      minPrice === "" || product.price >= Number(minPrice);

    const matchesMax =
      maxPrice === "" || product.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMin &&
      matchesMax
    );
  });

  // Sort products
  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Add product to cart
  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  };

  // Update quantity
  const updateQuantity = (id, change) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product
  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="app">
      <Navbar
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
        onCartClick={() => setShowCart(true)}
      />

      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">WELCOME TO OSO STORE</p>

          <h1>
            Discover Your
            <br />
            <span>Perfect Products.</span>
          </h1>

          <p>
            Explore our curated collection of quality products
            at amazing prices.
          </p>

          <button
            className="hero-btn"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Collection →
          </button>
        </div>

        <div className="hero-decoration">
          <span>OSO</span>
        </div>
      </section>

      <main className="shop-container" id="products">
        <div className="section-heading">
          <div>
            <p className="section-tag">OUR COLLECTION</p>
            <h2>Explore Products</h2>
          </div>

          <p>{filteredProducts.length} Products Found</p>
        </div>

        <div className="shop-layout">
          <Filter
            category={category}
            setCategory={setCategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sort={sort}
            setSort={setSort}
          />

          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={setSelectedProduct}
                  onAddToCart={addToCart}
                />
              ))
            ) : (
              <div className="no-products">
                <h2>No Products Found</h2>
                <p>Try changing your search or filters.</p>

                <button
                  className="add-btn"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setMinPrice("");
                    setMaxPrice("");
                    setSort("default");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <h2>OSO<span>Store.</span></h2>
        <p>Quality products. Better shopping experience.</p>
        <p>© 2026 OSO Store. All rights reserved.</p>
      </footer>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      {showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      )}
    </div>
  );
}

export default App;