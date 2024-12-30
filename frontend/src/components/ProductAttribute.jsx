function ProductAttribute({ attribute, productDetail, setProductDetail }) {
  return (
    <>
      <h3>
        {attribute.name.charAt(0).toUpperCase() + attribute.name.slice(1)}:
      </h3>
      {attribute.items.map((item) => {
        return (
          <button
            data-testid={`product-attribute-${item.value
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
            className={`${attribute.type} ${item.selected && "selected"}`}
            key={item.id}
            style={
              attribute.type === "swatch"
                ? { backgroundColor: item.display_value }
                : {}
            }
            onClick={() => {
              const updatedProduct = {
                ...productDetail,
                attributes: productDetail.attributes.map((attr) => {
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

              setProductDetail(updatedProduct);
            }}
          >
            {attribute.type === "text" && item.display_value}
          </button>
        );
      })}
    </>
  );
}

export default ProductAttribute;
