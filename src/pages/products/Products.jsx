import { Suspense, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  Await,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import AnimatedPage from "../../components/global/AnimatedPage";
import ErrorBoundary from "../../components/global/ErrorBoundary";
import LoadingSpinner from "../../components/global/LoadingSpinner";
import ProductCard from "../../components/global/ProductCard";

export const productsLoader = async () => {
  const productsPromise = fetch("http://localhost:3000/products")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    })
    .catch((err) => {
      throw new Response(`Failed to fetch products: ${err}`, { status: 500 });
    });

  const categoriesPromise = fetch("http://localhost:3000/categories")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch catagories");
      return res.json();
    })
    .catch((err) => {
      throw new Response(`Failed to fetch catagories: ${err}`, { status: 500 });
    });

  return { products: productsPromise, categories: categoriesPromise };
};

const Products = () => {
  const { products, categories } = useLoaderData();
  const navigate = useNavigate();

  // --- Filter State ---
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9; // Number of items per page

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    if (selectedGender !== "All") params.set("gender", selectedGender);
    if (selectedSizes.length > 0) params.set("sizes", selectedSizes.join(","));
    if (minRating > 0) params.set("minRating", minRating);
    if (searchTerm) params.set("search", searchTerm);
    if (currentPage > 0) params.set("page", currentPage + 1);

    setSearchParams(params);
  }, [
    selectedCategory,
    selectedGender,
    selectedSizes,
    minRating,
    searchTerm,
    currentPage,
    setSearchParams,
  ]);

  // Handle page change
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    window.scrollTo(0, 0);
  };

  // Toggle size handler
  const handleSizeChange = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  return (
    <AnimatedPage>
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8 py-16 bg-gray-50 min-h-screen">
          {/* --- SIDEBAR FILTERS --- */}
          <aside className="lg:w-72 bg-white p-6 rounded-2xl shadow-sm h-fit space-y-8">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-xl">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-3 pr-12 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-black"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Category</h3>
              <select
                className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-black"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <Suspense fallback={<option>Loading categories...</option>}>
                  <Await
                    resolve={categories}
                    errorElement={<option>Error loading categories</option>}
                  >
                    {(resolvedCategories) => (
                      <>
                        {resolvedCategories.map((category) => (
                          <option key={category.name} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </>
                    )}
                  </Await>
                </Suspense>
              </select>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Gender</h3>
              <div className="space-y-2">
                {["All", "Men", "Women", "Unisex"].map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="gender"
                      checked={selectedGender === g}
                      onChange={() => setSelectedGender(g)}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="text-gray-600 group-hover:text-black transition">
                      {g}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-4 py-2 rounded-lg border text-sm transition ${
                      selectedSizes.includes(size)
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900">Rating</h3>
                {minRating > 0 && (
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                    {minRating}+ ★
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() =>
                      setMinRating(rating === minRating ? 0 : rating)
                    }
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition ${
                      minRating === rating
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                        minRating >= rating
                          ? "bg-primary border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {minRating >= rating && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </span>
                    <span>
                      {rating === 0
                        ? "Any rating"
                        : `${rating}+ ${"★".repeat(rating)}${"☆".repeat(
                            5 - rating
                          )}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedGender("All");
                setSelectedSizes([]);
                setMinRating(0);
                setSearchTerm("");
                setCurrentPage(0);
              }}
              className="w-full py-3 text-sm font-medium text-gray-500 hover:text-red-500 transition underline"
            >
              Clear All Filters
            </button>
          </aside>

          {/* --- MAIN PRODUCT AREA --- */}
          <main className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
              <Await resolve={products} errorElement={<ErrorBoundary />}>
                {(resolvedProducts) => {
                  // --- COMPLEX FILTERING LOGIC ---
                  const filtered = resolvedProducts.filter((p) => {
                    // Handle case where product might not have categories array
                    const productCategories = Array.isArray(p.categories)
                      ? p.categories
                      : [];

                    // Search term matching (case-insensitive)
                    const searchMatch =
                      searchTerm === "" ||
                      (typeof p.name === "string" &&
                        p.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())) ||
                      (typeof p.description === "string" &&
                        p.description
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()));

                    const catMatch =
                      selectedCategory === "All" ||
                      productCategories.includes(selectedCategory);

                    const genderMatch =
                      selectedGender === "All" ||
                      (typeof p.gender === "string" &&
                        p.gender.toLowerCase() ===
                          selectedGender.toLowerCase());

                    const sizeMatch =
                      selectedSizes.length === 0 ||
                      (Array.isArray(p.sizes) &&
                        selectedSizes.some((s) => p.sizes.includes(s)));

                    // Handle rating filter - convert both to numbers and compare
                    const ratingMatch =
                      minRating === 0 ||
                      (typeof p.rating === "number" &&
                        typeof minRating === "number" &&
                        Number(p.rating) >= Number(minRating));

                    return (
                      searchMatch &&
                      catMatch &&
                      genderMatch &&
                      sizeMatch &&
                      ratingMatch
                    );
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400">
                          No products match your current filters.
                        </p>
                      </div>
                    );
                  }

                  // Calculate pagination
                  const pageCount = Math.ceil(filtered.length / itemsPerPage);
                  const offset = currentPage * itemsPerPage;
                  const currentItems = filtered.slice(
                    offset,
                    offset + itemsPerPage
                  );

                  return (
                    <>
                      <div className="mb-4 text-sm text-gray-500">
                        Showing {offset + 1}-
                        {Math.min(offset + itemsPerPage, filtered.length)} of{" "}
                        {filtered.length} products
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                        {currentItems.map((product) => (
                          <ProductCard
                            key={product.id}
                            title={product.name}
                            image={product.image[0]}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            rating={product.rating}
                            inStock={product.inStock}
                            onViewDetails={() =>
                              navigate(`/products/${product.id}`)
                            }
                          />
                        ))}
                      </div>

                      {pageCount > 1 && (
                        <div className="flex justify-center mt-8">
                          <ReactPaginate
                            previousLabel={
                              <span className="px-3 py-1 border rounded-l-md border-gray-300 hover:bg-gray-50 cursor-pointer">
                                &larr; Previous
                              </span>
                            }
                            nextLabel={
                              <span className="px-3 py-1 border rounded-r-md border-gray-300 hover:bg-gray-50 cursor-pointer">
                                Next &rarr;
                              </span>
                            }
                            breakLabel={
                              <span className="px-3 py-1 border-t border-b border-gray-300 cursor-pointer">
                                ...
                              </span>
                            }
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName="flex items-center space-x-1"
                            pageClassName="hidden sm:block"
                            pageLinkClassName="px-3 py-1 border border-gray-300 hover:bg-gray-50 cursor-pointer"
                            activeLinkClassName="bg-black text-white border-black cursor-pointer"
                            breakLinkClassName="px-3 py-1 border border-gray-300 hover:bg-gray-50 hidden sm:block cursor-pointer"
                            disabledClassName="opacity-50 cursor-not-allowed"
                            forcePage={currentPage}
                          />
                        </div>
                      )}
                    </>
                  );
                }}
              </Await>
            </Suspense>
          </main>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Products;
