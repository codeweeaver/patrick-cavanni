import { useLoaderData } from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage";

export const productsLoader = async () => {
  const products = ["Blouse", "Trousers", "Dress"];
  return { products };
};

const Products = () => {
  const { products } = useLoaderData();
  console.log(products);

  return (
    <AnimatedPage>
      <section className="products-page">
        <h1>Products</h1>
        <p>
          Welcome to our Products page! Here you can explore our wide range of
          products designed to meet your needs and preferences.
        </p>
        <p>
          We offer high-quality items across various categories, ensuring that
          you find exactly what you're looking for.
        </p>
        <p>
          Browse through our selection and take advantage of special offers and
          discounts available exclusively on our Products page.
        </p>
        {products.map((prod, index) => (
          <h2 key={index}>{prod}</h2>
        ))}
      </section>
    </AnimatedPage>
  );
};

export default Products;
