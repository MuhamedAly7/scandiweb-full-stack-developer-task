import { useDispatch } from "react-redux";
import { updateProductInCart } from "../features/slices/cart-slice";

function CartProductAttribute({ attribute, cartArr, productIndex }) {
  const dispatch = useDispatch();
  return (
    <>
      <h3 className="itemname">
        {attribute.name.charAt(0).toUpperCase() + attribute.name.slice(1)}:
      </h3>
      {attribute.items.map((item) => {
        return (
          <button
            className={`${attribute.type}-cartItem ${
              item.selected && "selected"
            }`}
            key={item.id}
            style={
              attribute.type === "swatch"
                ? { backgroundColor: item.display_value }
                : {}
            }
            onClick={() => {
              const updatedProduct = {
                ...cartArr[productIndex],
                attributes: cartArr[productIndex].attributes.map((attr) => {
                  if (attr.id === attribute.id) {
                    return {
                      ...attr,
                      items: attr.items.map((uitem) => ({
                        ...uitem,
                        selected: uitem.id === item.id,
                      })),
                    };
                  }
                  return attr;
                }),
              };

              // console.log(updatedProduct);
              // setProductDetail(updatedProduct);
              dispatch(updateProductInCart({ updatedProduct, productIndex }));
            }}
            data-testid={`cart-item-attribute-${attribute.name
              .replace(/\s+/g, "-")
              .toLowerCase()}-${attribute.name
              .replace(/\s+/g, "-")
              .toLowerCase()}${item.selected ? "-selected" : ""}`}
          >
            {attribute.type === "text" && item.display_value}
          </button>
        );
      })}
    </>
  );
}

export default CartProductAttribute;
