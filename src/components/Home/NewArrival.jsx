import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { Await, Link, useLoaderData } from 'react-router-dom';
import LoadingSpinner from '../global/LoadingSpinner.jsx';
import ProductCard from '../global/ProductCard.jsx';
import ReactPaginate from 'react-paginate';
import { Suspense } from 'react';
import {apiClient} from '../../utils/apiClient.js';

export const NewArrivalLoader = async () => {
  // Let the API handle the filtering, sorting, and limiting
  const productsPromise = apiClient.get('/products?categories_like=New%20Arrival&_limit=4&_sort=id&_order=desc');

  return {
    products: productsPromise,
  };
};

const NewArrival = () => {
const { products } = useLoaderData();


  return (
    <section id="new" className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            New Arrivals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest collection of trendy fashion items
          </p>
        </div>

        {/* Products Grid */}
        <Suspense fallback={<LoadingSpinner />}>
          <Await resolve={products}>
            {(resolvedProducts) => {

              return (
                <>
                  <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
                    {resolvedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                </>
              );
            }}
          </Await>
        </Suspense>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-primary hover:scale-105 transition-all"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
