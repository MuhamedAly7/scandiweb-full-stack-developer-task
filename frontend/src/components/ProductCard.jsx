import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/slices/cart-slice";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`product ${product.inStock ? "" : "out-of-stock"}`}
        data-testid={`product-${product.name
          .replace(/\s+/g, "-")
          .toLowerCase()}`}
      >
        <img
          src={`${product.gallery[0]}`}
          alt={`${product.name}`}
          onClick={() => {
            // const props = { id: product.id };
            navigate(`/products/${product.id}`);
          }}
        />
        <div className="details">
          <h3>{product.name}</h3>
          <div className="price">{`${product.prices[0].currency.symbol}${product.prices[0].amount}`}</div>

          {product.inStock && (
            <button
              className="cart-button"
              onClick={() => {
                const updatedProduct = {
                  ...product,
                  quantity: 1,
                  attributes: product.attributes.map((attribute) => ({
                    ...attribute,
                    items: attribute.items.map((item, index) => ({
                      ...item,
                      selected: index === 0, // First item is selected; others are not
                    })),
                  })),
                };
                dispatch(addToCart(updatedProduct));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width="30"
                height="30"
              >
                <path
                  d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                  fill="white"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
