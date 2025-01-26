import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
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
  const { productId } = useParams();

  useEffect(() => {
    const currentPath = location.pathname;

    // Check if the current route is the product details page
    if (currentPath.startsWith("/products/")) {
      // Fetch the product category using the productId
      getProductCategory({ variables: { id: productId } });
    } else {
      // Otherwise, set the active category based on the URL
      const currentCategory = currentPath.slice(1) || "all";
      setActiveLink(currentCategory);
    }
  }, [location, productId, getProductCategory]);

  useEffect(() => {
    // If the product category is fetched, set it as the active category
    if (productData?.product?.category) {
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
