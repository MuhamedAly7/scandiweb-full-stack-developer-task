import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_PRODUCT_CATEGORY } from "../graphql/queries";
import CartOverlay from "./CartOverlay";
import { useSelector } from "react-redux";

function Header() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [getProductCategory, { data: productData }] =
    useLazyQuery(GET_PRODUCT_CATEGORY);
  const [activeLink, setActiveLink] = useState("all");
  const [isCartOpen, setCartOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);

    if (pathSegments[0] === "products" && pathSegments[1]) {
      const productId = pathSegments[1];
      getProductCategory({ variables: { id: productId } });
    } else if (pathSegments[0]) {
      setActiveLink(pathSegments[0]);
    } else {
      setActiveLink("all");
    }
  }, [location, getProductCategory]);

  useEffect(() => {
    if (productData && productData.product) {
      setActiveLink(productData.product.category);
    }
  }, [productData]);

  const handleLinkClick = (category) => {
    setActiveLink(category);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  useEffect(() => {
    if (!isCartOpen && cart.length > 0) {
      toggleCart();
    }
  }, [cart]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

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
                onClick={() => handleLinkClick(category.name)}
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
        <button className={`cart`} data-testid="cart-btn" onClick={toggleCart}>
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
