import { useEffect, useState } from 'react';
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiGrid,
  FiList,
  FiSearch,
  FiX,
} from 'react-icons/fi'; // Added for icons
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import AnimatedPage from '../../components/global/AnimatedPage';
import LoadingSpinner from '../../components/global/LoadingSpinner';
import ProductCard from '../../components/global/ProductCard';
import ProductListItem from '../../components/global/ProductListItem';
import { useCurrency } from '../../context/CurrencyContext';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { formatPrice } = useCurrency();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Filter State ---
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Any');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'Any');
  const [selectedGender, setSelectedGender] = useState(searchParams.get('gender') || 'Any');
  const [selectedSize, setSelectedSize] = useState(searchParams.get('size') || 'Any');
  const [minRating, setMinRating] = useState(searchParams.get('rating') || 'Any');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || 'Any');
  const [currentPage, setCurrentPage] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const isFiltered =
    searchTerm !== '' ||
    selectedCategory !== 'Any' ||
    selectedBrand !== 'Any' ||
    selectedGender !== 'Any' ||
    selectedSize !== 'Any' ||
    minRating !== 'Any' ||
    maxPrice !== 'Any';

  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsRes, categoriesRes, brandsRes] = await Promise.allSettled([
          fetch('http://localhost:3000/products').then((res) => res.json()),
          fetch('http://localhost:3000/categories').then((res) => res.json()),
          fetch('http://localhost:3000/brands').then((res) => res.json()),
        ]);

        if (productsRes.status === 'fulfilled') setProducts(productsRes.value);
        else console.error('Failed to load products');

        if (categoriesRes.status === 'fulfilled') setCategories(categoriesRes.value);
        else setCategories([]);

        if (brandsRes.status === 'fulfilled') setBrands(brandsRes.value);
        else setBrands(['nike', 'adidas', 'puma']);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    selectedGender,
    selectedSize,
    minRating,
    maxPrice,
  ]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory !== 'Any') params.set('category', selectedCategory);
    if (selectedBrand !== 'Any') params.set('brand', selectedBrand);
    if (selectedGender !== 'Any') params.set('gender', selectedGender);
    if (selectedSize !== 'Any') params.set('size', selectedSize);
    if (minRating !== 'Any') params.set('rating', minRating);
    if (maxPrice !== 'Any') params.set('maxPrice', maxPrice);
    if (currentPage > 0) params.set('page', currentPage + 1);
    setSearchParams(params);
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    selectedGender,
    selectedSize,
    minRating,
    maxPrice,
    currentPage,
    setSearchParams,
  ]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    window.scrollTo(0, 0);
  };

  return (
    <AnimatedPage>
      <div className="bg-accent/2 min-h-screen pb-20">
        {/* --- ANILIST STYLE FILTER BAR --- */}
        <div className="container pt-8">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* --- SIDEBAR FILTER --- */}
            <aside
              className={`scrollbar-hide fixed inset-y-0 left-0 z-50 w-72 transform overflow-y-auto bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out md:shadow-none lg:static lg:z-0 lg:h-[calc(100vh-120px)] lg:w-64 lg:translate-x-0 lg:rounded-md ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="mb-6 flex items-center justify-between md:hidden">
                <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-500">
                  <FiX size={24} />
                </button>
              </div>

              {isFiltered && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Any');
                    setSelectedBrand('Any');
                    setSelectedGender('Any');
                    setSelectedSize('Any');
                    setMinRating('Any');
                    setMaxPrice('Any');
                    setIsSidebarOpen(false);
                  }}
                  className="text-accent border-accent/80 animate-in fade-in zoom-in mb-3 ml-auto flex cursor-pointer items-center justify-center gap-2 rounded-full border px-2 py-1 text-xs shadow-sm transition-colors duration-200"
                >
                  Clear All <FiX />
                </button>
              )}

              <div className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                    Search
                  </label>
                  <div className="group relative">
                    <FiSearch className="group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="focus:ring-primary/20 w-full rounded-md border-none bg-gray-50 py-2.5 pr-4 pl-10 text-sm shadow-sm transition-all focus:ring-2 md:bg-[#FBFBFB]"
                      placeholder="Enter name..."
                    />
                  </div>
                </div>

                {/* Categories */}
                <FilterDropdown
                  label="Category"
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  options={categories}
                />

                {/* Brands */}
                <FilterDropdown
                  label="Brand"
                  value={selectedBrand}
                  onChange={setSelectedBrand}
                  options={brands}
                />

                {/* Gender */}
                <FilterDropdown
                  label="Gender"
                  value={selectedGender}
                  onChange={setSelectedGender}
                  options={['men', 'women', 'unisex']}
                />

                {/* Size */}
                <FilterDropdown
                  label="Size"
                  value={selectedSize}
                  onChange={setSelectedSize}
                  options={[
                    'XS',
                    'S',
                    'M',
                    'L',
                    'XL',
                    'XXL',
                    'One Size',
                    '28',
                    '30',
                    '32',
                    '34',
                    '36',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                  ]}
                />

                {/* Rating */}
                <FilterDropdown
                  label="Rating"
                  value={minRating}
                  onChange={setMinRating}
                  options={['4', '3', '2', '1']}
                  prefix="★ "
                />

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                    Max Price: {maxPrice === 'Any' ? formatPrice(1000) : formatPrice(maxPrice)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={maxPrice === 'Any' ? 1000 : maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="accent-primary h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                  />
                </div>
              </div>
            </aside>

            {/* --- PRODUCT GRID --- */}
            <div className="container my-10">
              {/* Mobile Filter Header */}
              <div className="mb-10 flex items-center justify-between md:hidden">
                <h1 className="text-xl font-bold text-gray-700 uppercase">Store</h1>
                <button
                  onClick={() => setIsSidebarOpen((prev) => !prev)}
                  className="bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm"
                >
                  <FiFilter /> Filters
                </button>
              </div>

              {isLoading ? (
                <LoadingSpinner />
              ) : (
                (() => {
                  const filtered = products.filter((p) => {
                    const searchMatch =
                      !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase());
                    const catMatch = selectedCategory === 'Any' || p.category === selectedCategory;
                    const brandMatch = selectedBrand === 'Any' || p.brand === selectedBrand;
                    const genderMatch = selectedGender === 'Any' || p.gender === selectedGender;
                    const sizeMatch =
                      selectedSize === 'Any' || (p.sizes && p.sizes.includes(selectedSize));
                    const ratingMatch = minRating === 'Any' || p.rating >= Number(minRating);
                    const priceMatch = maxPrice === 'Any' || Number(p.price) <= Number(maxPrice);
                    return (
                      searchMatch &&
                      catMatch &&
                      brandMatch &&
                      genderMatch &&
                      sizeMatch &&
                      ratingMatch &&
                      priceMatch
                    );
                  });

                  if (filtered.length === 0) return <NoResults />;

                  const offset = currentPage * itemsPerPage;
                  const currentItems = filtered.slice(offset, offset + itemsPerPage);

                  return (
                    <>
                      {/* toolbar */}
                      <div className="mb-8 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800">
                          All Products ({currentItems.length})
                        </h2>

                        <div className="flex items-center gap-2 rounded-xl bg-gray-100 p-1">
                          <button
                            onClick={() => setViewMode('list')}
                            className={`rounded-lg p-2 transition-all ${viewMode === 'list' ? 'text-primary bg-white shadow-sm' : 'text-gray-400'}`}
                          >
                            <FiList size={20} />
                          </button>
                          <button
                            onClick={() => setViewMode('grid')}
                            className={`rounded-lg p-2 transition-all ${viewMode === 'grid' ? 'text-primary bg-white shadow-sm' : 'text-gray-400'}`}
                          >
                            <FiGrid size={20} />
                          </button>
                        </div>
                      </div>
                      {/* all products */}
                      <div
                        className={
                          viewMode === 'grid'
                            ? 'grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3'
                            : 'flex flex-col gap-4'
                        }
                      >
                        {currentItems.map((product) =>
                          viewMode === 'grid' ? (
                            <ProductCard key={product.id} product={product} />
                          ) : (
                            <ProductListItem key={product.id} product={product} />
                          ),
                        )}
                      </div>
                      <div className="mt-12 flex cursor-pointer justify-center">
                        <ReactPaginate
                          pageCount={Math.ceil(filtered.length / itemsPerPage)}
                          onPageChange={handlePageClick}
                          containerClassName="flex gap-2 items-center"
                          activeLinkClassName="!bg-primary !text-white"
                          pageLinkClassName="w-10 h-10 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-50 transition"
                          previousLinkClassName="w-10 h-10 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-50 transition"
                          nextLinkClassName="w-10 h-10 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-50 transition"
                          disabledLinkClassName="opacity-50 cursor-not-allowed"
                          previousLabel={<FiChevronLeft />}
                          nextLabel={<FiChevronRight />}
                          forcePage={currentPage}
                        />
                      </div>
                    </>
                  );
                })()
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

// --- Helper Components ---

const FilterDropdown = ({ label, value, onChange, options, prefix = '' }) => (
  <div className="space-y-2">
    <label className="ml-1 text-xs font-bold tracking-wider text-gray-500 uppercase">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus:ring-primary/20 w-full cursor-pointer appearance-none rounded-md border-none bg-[#FBFBFB] px-4 py-2.5 text-sm shadow-sm focus:ring-2"
      >
        <option value="Any">Any</option>
        {options.map((opt, index) => (
          <option key={opt.name || opt || index} value={opt.name || opt}>
            {prefix}
            {opt.name || opt}
          </option>
        ))}
      </select>
      <FiChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
    </div>
  </div>
);

const NoResults = () => (
  <div className="rounded-xl border border-gray-100 bg-white py-20 text-center shadow-sm">
    <FiFilter className="mx-auto mb-4 text-4xl text-gray-200" />
    <p className="font-medium text-gray-500">No products match your current filters.</p>
  </div>
);

export default Products;
