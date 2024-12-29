import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../graphql/queries";
import CartOverlay from "./CartOverlay";
import { useSelector } from "react-redux";

function Header() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [activeLink, setActiveLink] = useState("all");
  const [isCartOpen, setCartOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

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
        <img
          src="https://cdn-icons-png.freepik.com/256/12635/12635071.png?semt=ais_hybrid"
          alt="reload"
          onClick={() => {
            setActiveLink("all");
            navigate("/all");
          }}
        />
        <button
          className={`cart`}
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
