import { useNavigate, useParams } from "react-router-dom";
import "./products.css";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries";
import ProductCard from "../../components/ProductCard";
import { useEffect } from "react";

function Products() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { category: category ?? "all" },
  });

  useEffect(() => {
    if (!category) {
      navigate("/all");
    }
  }, [category, navigate]);

  // if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  // console.log(category, data);

  return (
    <>
      <h1>
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : "All"}
      </h1>
      <div className="products">
        {data.products.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
    </>
  );
}

export default Products;
