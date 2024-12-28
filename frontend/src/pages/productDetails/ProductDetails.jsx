import "bootstrap/dist/css/bootstrap.min.css";
import "./productDetails.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PRODUCT } from "../../graphql/queries";
import ImageGallery from "../../components/ImageGallery";
import { useEffect, useState } from "react";
import ProductInfo from "../../components/ProductInfo";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id },
  });
  const [productDetail, setProductDetail] = useState({
    gallery: [],
    name: "",
    attributes: [],
    prices: [{ amount: 0, currency: { symbol: "", label: "" } }],
    inStock: false,
    description: "",
    brand: "",
    category: "",
    id: "",
    __typename: "",
  });

  // console.log(id);

  useEffect(() => {
    if (data?.product) {
      // Add 'selected' key to the attributes' items
      const updatedProduct = {
        ...data.product,
        attributes: data.product.attributes.map((attribute) => ({
          ...attribute,
          items: attribute.items.map((item) => ({
            ...item,
            selected: false, // First item is selected; others are not
          })),
        })),
      };

      setProductDetail(updatedProduct);
    }
  }, [data]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  console.log(productDetail);

  return (
    <div
      className="product-details"
      style={{
        margin: "auto",
        padding: "150px",
        maxWidth: "1200px",
      }}
    >
      {/* Left Section: Image Thumbnails and Main Image */}
      <ImageGallery gallery={productDetail.gallery} />

      {/* Right Section: Product Details */}
      <ProductInfo
        productDetail={productDetail}
        setProductDetail={setProductDetail}
      />
    </div>
  );
};

export default ProductDetails;
