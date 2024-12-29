import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  removeFromCart,
} from "../features/slices/cart-slice";
import CartProductAttribute from "./CartProductAttribute";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { PLACE_ORDER } from "../graphql/mutations";

function CartOverlay({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const cartArr = useSelector((state) => state.cart);
  const [placeOrder, { data, loading, error }] = useMutation(PLACE_ORDER);

  const handlePlaceOrder = async () => {
    const orderDetails = {
      order_details: cartArr.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        prices: {
          amount: parseFloat(item.prices[0].amount),
          currency: item.prices[0].currency
            ? {
                label: item.prices[0].currency.label || "USD",
                symbol: item.prices[0].currency.symbol || "$",
              }
            : { label: "USD", symbol: "$" },
        },
        attributes: item.attributes.map((attr) => ({
          id: attr.id,
          name: attr.name,
          type: attr.type,
          items: attr.items.map((itm) => ({
            id: itm.id,
            value: itm.value,
            selected: itm.selected,
            display_value: itm.display_value,
          })),
        })),
      })),
    };

    try {
      await placeOrder({ variables: { order: orderDetails } });
      dispatch(clearCart());
    } catch (error) {
      console.log("Error placing order:", error.graphQLErrors || error.message);
    }
  };

  useEffect(() => {
    if (isOpen && cartArr.length === 0) {
      // onClose();
    }
  }, [cartArr.length, isOpen, onClose]);

  if (!isOpen) return null;

  const total = cartArr.reduce(
    (sum, item) => sum + item.prices[0].amount * item.quantity,
    0
  );

  // console.log(cartArr);

  return (
    <div className="cart-overlay" style={{ display: "grid" }}>
      <div onClick={onClose}></div>
      <div className="cart-content" data-testid="cart-overlay">
        <h2>
          <strong>My Bag,</strong>{" "}
          {cartArr.reduce((total, product) => total + product.quantity, 0)}{" "}
          items
        </h2>
        <div className="cart-items">
          {cartArr.map((product, index) => (
            <div className="cart-item" key={index}>
              <div className="cart-item-info">
                <p>{product.name}</p>
                <strong data-testid="cart-item-amount">
                  {product.prices[0].currency.symbol}
                  {product.prices[0].amount.toFixed(2)}
                </strong>
                <div className="attributes">
                  {product.attributes.map((attribute) => (
                    <div
                      className="attribute"
                      key={attribute.id}
                      data-testid={`cart-item-attribute-${attribute.name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      <CartProductAttribute
                        attribute={attribute}
                        productCart={product}
                        cartArr={cartArr}
                        productIndex={index}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="cart-item-img">
                <div className="count-item">
                  <button
                    onClick={() => {
                      dispatch(addToCart(product));
                    }}
                    data-testid="cart-item-amount-increase"
                  >
                    +
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() => {
                      dispatch(removeFromCart(index));
                    }}
                    data-testid="cart-item-amount-decrease"
                  >
                    -
                  </button>
                </div>
                <img src={product.gallery[0]} alt={product.name} />
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total" data-testid="cart-total">
          <strong>Total:</strong> <span>${total.toFixed(2)}</span>
        </div>
        <button className="place-order" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default CartOverlay;
