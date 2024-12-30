import { useDispatch } from "react-redux";
import ProductAttribute from "./ProductAttribute";
import { addToCart } from "../features/slices/cart-slice";

function ProductInfo({ productDetail, setProductDetail }) {
  // This function to check if all attributes have a selected item
  const canAddToCart = productDetail.attributes.every((attribute) =>
    attribute.items.some((item) => item.selected)
  );
  const dispatch = useDispatch();

  return (
    <div className="product-info">
      <h1>{productDetail.name}</h1>
      <div className="attributes">
        {productDetail.attributes.map((attribute) => {
          return (
            <div
              className="attribute"
              key={attribute.id}
              data-testid={`product-attribute-${attribute.name
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
            >
              <ProductAttribute
                attribute={attribute}
                productDetail={productDetail}
                setProductDetail={setProductDetail}
              />
            </div>
          );
        })}
      </div>

      <h2 style={{ fontSize: "25px", fontWeight: "bold" }}>
        Price:
        <br />
        {`${productDetail.prices[0].currency.symbol}${productDetail.prices[0].amount}`}
      </h2>

      {productDetail.inStock && (
        <button
          data-testid="add-to-cart"
          className="add-to-cart"
          disabled={!canAddToCart} // Disable the button if not all attributes are selected
          style={{
            backgroundColor: canAddToCart ? "#4caf50" : "#83AF84", // Visual feedback
            cursor: canAddToCart ? "pointer" : "not-allowed",
          }}
          onClick={() => {
            const updatedProduct = {
              ...productDetail,
              quantity: 1,
              attributes: productDetail.attributes.map((attribute) => ({
                ...attribute,
                items: attribute.items.map((item) => ({
                  ...item,
                })),
              })),
            };
            // console.log(updatedProduct);
            dispatch(addToCart(updatedProduct));
          }}
        >
          ADD TO CART
        </button>
      )}
      <p data-testid="product-description">
        {productDetail.description || "Description not available"}
      </p>
    </div>
  );
}

export default ProductInfo;
