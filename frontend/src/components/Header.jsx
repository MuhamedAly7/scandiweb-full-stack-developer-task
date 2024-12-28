import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../graphql/queries";
import CartOverlay from "./CartOverlay";
import { useSelector } from "react-redux";

function Header() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [activeLink, setActiveLink] = useState("all");
  const [isCartOpen, setCartOpen] = useState(false);
  const cart = useSelector((state) => state.cart);

  const handleLinkClick = (category) => {
    // event.preventDefault();
    // console.log(`Active link set to: ${category}`);
    setActiveLink(category);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  // console.log(data);

  return (
    <>
      <header>
        <nav>
          {data.categories.map((category) => {
            return (
              <Link
                key={category.name}
                to={`/${category.name}`}
                className={`cat ${
                  activeLink === category.name ? "active" : ""
                }`}
                data-testid={`${
                  activeLink === category.name
                    ? "active-category-link"
                    : "category-link"
                }`}
                onClick={(event) => handleLinkClick(category.name, event)}
              >
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </Link>
            );
          })}
        </nav>
        <button
          className={`cart ${cart.length === 0 ? "disabled" : ""}`}
          data-testid="cart-btn"
          onClick={toggleCart}
        >
          🛒
          {cart.length > 0 && (
            <span className="cart-badge">
              {cart.reduce((total, product) => total + product.quantity, 0)}
            </span>
          )}
        </button>
      </header>
      <CartOverlay isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
}

export default Header;