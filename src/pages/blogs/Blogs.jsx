import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiHeart,
  FiSearch,
  FiX,
} from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import AnimatedPage from "../../components/global/AnimatedPage";

// Mock data - Fashion blog posts
const blogPosts = [
  {
    id: 1,
    title: "2023 FALL FASHION GUIDE: MUST-HAVE TRENDS",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    tags: ["#Trending", "#Outfits", "#FashionWeek"],
    date: "2 days ago",
    excerpt:
      "Discover the top trends dominating the fashion scene this fall...",
    views: 1245,
    likes: 342,
  },
  {
    id: 2,
    title: "10 ESSENTIAL ACCESSORIES TO ELEVATE YOUR WARDROBE",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    tags: ["#Accessories", "#StyleTips", "#Luxury"],
    date: "5 days ago",
    excerpt: "Transform any outfit with these statement accessories...",
    views: 987,
    likes: 256,
  },
  {
    id: 3,
    title: "SUSTAINABLE FASHION: BRANDS MAKING A DIFFERENCE",
    image:
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    tags: ["#Sustainable", "#EcoFriendly", "#EthicalFashion"],
    date: "1 week ago",
    excerpt: "Discover fashion brands that are changing the industry...",
    views: 1567,
    likes: 421,
  },
  {
    id: 4,
    title: "THE ULTIMATE DENIM GUIDE: FINDING YOUR PERFECT FIT",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    tags: ["#Denim", "#StyleGuide", "#FashionTips"],
    date: "2 weeks ago",
    excerpt:
      "Everything you need to know about finding jeans that fit perfectly...",
    views: 2043,
    likes: 532,
  },
  {
    id: 5,
    title: "LUXURY WATCHES: TIMELESS PIECES FOR EVERY STYLE",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    tags: ["#Luxury", "#Watches", "#Accessories"],
    date: "3 weeks ago",
    excerpt: "Explore the most coveted timepieces of the season...",
    views: 1876,
    likes: 498,
  },

  {
    id: 6,
    title: "STREET STYLE INSPIRATION FROM FASHION WEEKS",
    image:
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    tags: ["#StreetStyle", "#FashionWeek", "#Trending"],
    date: "1 month ago",
    excerpt:
      "The best street style looks from fashion capitals around the world...",
    views: 2310,
    likes: 678,
  },
  {
    id: 7,
    title: "SUSTAINABLE FASHION: BRANDS MAKING A DIFFERENCE",
    image:
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    tags: ["#Sustainable", "#EcoFriendly", "#EthicalFashion"],
    date: "3 weeks ago",
    excerpt:
      "Discover fashion brands that are leading the way in sustainability and ethical production...",
    views: 1890,
    likes: 423,
  },
  {
    id: 8,
    title: "THE ART OF LAYERING: WINTER STYLE GUIDE",
    image:
      "https://images.unsplash.com/photo-1485965373059-f07aacff3d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    tags: ["#WinterFashion", "#Layering", "#StyleGuide"],
    date: "1 month ago",
    excerpt:
      "Master the art of layering with these essential winter fashion tips and tricks...",
    views: 2450,
    likes: 567,
  },
  {
    id: 9,
    title: "VINTAGE FASHION: HOW TO SHOP AND STYLE",
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    tags: ["#Vintage", "#Thrifting", "#RetroStyle"],
    date: "2 months ago",
    excerpt:
      "A complete guide to finding and styling vintage fashion pieces like a pro...",
    views: 2100,
    likes: 489,
  },
  {
    id: 10,
    title: "LUXURY STAPLES: INVESTMENT PIECES WORTH THE SPLURGE",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    tags: ["#Luxury", "#InvestmentPieces", "#FashionEssentials"],
    date: "2 weeks ago",
    excerpt:
      "These luxury fashion pieces are worth the investment for your timeless wardrobe...",
    views: 1780,
    likes: 512,
  },
];

// Extract all unique hashtags from blog posts
const allHashtags = [...new Set(blogPosts.flatMap((post) => post.tags))];

// Get popular posts (sorted by views)
const popularPosts = [...blogPosts]
  .sort((a, b) => b.views - a.views)
  .slice(0, 3);

const Blogs = () => {
  const [activeTags, setActiveTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [likedPosts, setLikedPosts] = useState({});
  const postsPerPage = 6;

  // Toggle like for a post
  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Get like count for a post
  const getLikeCount = (postId, baseLikes) => {
    return likedPosts[postId] ? baseLikes + 1 : baseLikes;
  };

  // Filter posts based on search query and active tags
  const filteredPosts = blogPosts
    .map((post) => ({ ...post, likes: getLikeCount(post.id, post.likes) }))
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags =
        activeTags.length === 0 ||
        activeTags.some((tag) => post.tags.includes(tag));

      return matchesSearch && matchesTags;
    });

  // Pagination logic
  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);
  const offset = currentPage * postsPerPage;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to first page if current page is out of bounds after filtering
  useEffect(() => {
    if (currentPage > 0 && filteredPosts.length <= currentPage * postsPerPage) {
      setCurrentPage(0);
    }
  }, [filteredPosts.length, currentPage, postsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, activeTags]);

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllTags = () => {
    setActiveTags([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const hoverEffect = {
    scale: 1.02,
    transition: { duration: 0.2 },
  };

  return (
    <AnimatedPage>
      {/* Hero Section */}
      <motion.section
        className="relative bg-linear-to-r from-gray-900 to-gray-800 text-white py-24 md:py-36 overflow-hidden mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Fashion Insights & Trends
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Discover the latest in fashion, style tips, and industry news from
            our expert stylists.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.section>

      <motion.section
        className="mb-20 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col lg:flex-row gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Sidebar */}
            <motion.div className="lg:w-1/3 space-y-6" variants={itemVariants}>
              {/* Search */}
              <motion.div
                className="bg-white p-5 rounded-md shadow-sm border border-gray-200"
                whileHover={{
                  y: -2,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-semibold text-gray-800 text-lg mb-4">
                  Search
                </h3>
                <motion.div className="relative" whileFocus={{ scale: 1.01 }}>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors duration-200"
                  />
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </motion.div>
              </motion.div>

              {/* Active Tags */}
              <AnimatePresence>
                {activeTags.length > 0 && (
                  <motion.div
                    className="bg-white p-5 rounded-md shadow-sm border border-gray-200"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        Active Filters
                      </h3>
                      <motion.button
                        onClick={clearAllTags}
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline flex items-center"
                        whileHover={{ x: 2 }}
                      >
                        Clear all
                      </motion.button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {activeTags.map((tag, index) => (
                          <motion.button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className="px-3 py-1 text-sm font-medium text-white bg-primary/80 rounded-full hover:bg-primary transition-colors flex items-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {tag}
                            <FiX className="ml-1" size={16} />
                          </motion.button>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Popular Tags */}
              <motion.div
                className="bg-white p-5 rounded-md shadow-sm border border-gray-200"
                variants={itemVariants}
              >
                <h3 className="font-semibold text-gray-800 text-lg mb-4">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allHashtags.map((hashtag, index) => (
                    <motion.button
                      key={index}
                      onClick={() => toggleTag(hashtag)}
                      className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                        activeTags.includes(hashtag)
                          ? "bg-primary/80 text-white hover:bg-primary"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {hashtag}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Popular Posts */}
              <motion.div
                className="bg-white p-5 rounded-md shadow-sm border border-gray-200"
                variants={itemVariants}
              >
                <h3 className="font-semibold text-gray-800 text-lg mb-4">
                  Popular Blogs
                </h3>
                <div className="space-y-4">
                  {popularPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ x: 5 }}
                    >
                      <Link
                        to={`/blog/${post.id}`}
                        className="group flex items-start gap-3 hover:bg-gray-50 p-2 rounded-md transition-colors"
                      >
                        <motion.div
                          className="w-16 h-16 shrink-0 overflow-hidden rounded-md"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <div>
                          <h4 className="font-medium text-gray-700 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <span className="flex items-center">
                              <FiEye className="mr-1" size={12} /> {post.views}
                            </span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center">
                              <FiHeart className="mr-1" size={12} />{" "}
                              {post.likes}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Main Content */}
            <motion.div className="lg:w-3/4" variants={itemVariants}>
              {/* Active Tags */}
              <AnimatePresence>
                {activeTags.length > 0 && (
                  <motion.div
                    className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-100"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-sm text-gray-600">
                        Filtered by:
                      </span>
                      {activeTags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm bg-white border border-blue-200 rounded-full flex items-center gap-1 text-blue-700"
                        >
                          {tag}
                          <button
                            onClick={() => toggleTag(tag)}
                            className="text-blue-400 hover:text-blue-700 ml-1"
                            aria-label={`Remove ${tag} filter`}
                          >
                            <FiX size={16} />
                          </button>
                        </span>
                      ))}
                      <button
                        onClick={clearAllTags}
                        className="ml-2 text-sm text-blue-600 hover:underline font-medium"
                      >
                        Clear all
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {filteredPosts
                    .slice(offset, offset + postsPerPage)
                    .map((post, index) => (
                      <motion.div
                        key={post.id}
                        custom={index % 4}
                        variants={cardVariants}
                        initial="hidden"
                        animate="show"
                        whileHover="hover"
                        className="h-full"
                      >
                        <div className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 block h-full flex flex-col">
                          <motion.div
                            className="h-48 overflow-hidden"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              initial={{ scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                            />
                          </motion.div>
                          <div className="p-5 flex-1 flex flex-col">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                                  onClick={() => toggleTag(tag)}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>
                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                              <Link
                                to={`/blog/${post.id}`}
                                className="text-sm font-medium text-primary hover:underline flex items-center"
                              >
                                Read more{" "}
                                <FiArrowRight className="ml-1" size={16} />
                              </Link>
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center text-xs text-gray-500">
                                  <FiEye className="mr-1" size={14} />
                                  {post.views}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleLike(post.id);
                                  }}
                                  className={`flex items-center text-xs ${
                                    likedPosts[post.id]
                                      ? "text-red-500"
                                      : "text-gray-500"
                                  }`}
                                >
                                  <FiHeart
                                    className="mr-1"
                                    size={14}
                                    fill={
                                      likedPosts[post.id]
                                        ? "currentColor"
                                        : "none"
                                    }
                                  />
                                  {post.likes}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {pageCount > 1 && (
                <div className="mt-16">
                  <ReactPaginate
                    previousLabel={<FiChevronLeft className="h-5 w-5" />}
                    nextLabel={<FiChevronRight className="h-5 w-5" />}
                    breakLabel="..."
                    breakClassName="flex items-center justify-center"
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName="flex items-center justify-center space-x-2"
                    pageClassName="flex"
                    pageLinkClassName="px-3 py-1 rounded-md hover:bg-gray-200 cursor-pointer"
                    activeLinkClassName="bg-primary text-white hover:bg-primary cursor-pointer"
                    previousClassName="flex items-center"
                    nextClassName="flex items-center"
                    previousLinkClassName="p-1 rounded-md hover:bg-gray-100 cursor-pointer"
                    nextLinkClassName="p-1 rounded-md hover:bg-gray-100 cursor-pointer"
                    disabledClassName="opacity-50"
                    forcePage={currentPage}
                  />
                </div>
              )}

              {filteredPosts.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <p className="text-gray-500">
                    No articles found matching your criteria.
                  </p>
                  <button
                    onClick={clearAllTags}
                    className="mt-4 px-6 py-2 text-sm font-medium text-black border border-black rounded hover:bg-black hover:text-white transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </AnimatedPage>
  );
};

export default Blogs;
