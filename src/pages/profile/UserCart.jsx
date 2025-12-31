import { FiChevronRight, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../hooks/useCart';

const UserCart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const { formatPrice } = useCurrency();
  if (cartItems.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="mb-6 rounded-full bg-red-50 p-6">
          <FiShoppingBag className="h-10 w-10 text-blue-500" />
        </div>
        <h3 className="mb-3 text-2xl font-bold text-gray-900">Your Shopping Cart Is Empty</h3>
        <p className="mb-8 max-w-md text-lg text-gray-500">
          Looks like you haven't added any items to your Shopping Cart yet.
        </p>
        <Link
          to="/products"
          className="bg-primary hover:bg-primary/90 shadow-primary/20 inline-flex items-center gap-2 rounded-full px-8 py-3 font-bold text-white shadow-lg transition-all"
        >
          <FiShoppingBag className="text-xl" />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* --- LEFT SIDE: CART ITEMS --- */}
        <div className="flex-1 space-y-4">
          <div className="rounded-sm border-b border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="text-xl font-medium tracking-tight uppercase">Cart ({cartCount})</h2>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col gap-6 rounded-sm bg-white p-4 shadow-sm md:flex-row"
            >
              {/* Product Image */}
              <div className="h-24 w-24 shrink-0">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="line-clamp-2 text-sm text-gray-800 md:text-base">{item.name}</h3>
                  <div className="text-right">
                    <span className="bg-primary/20 text-primary rounded px-1 text-xs">
                      -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                    </span>
                    <p className="text-xl font-bold whitespace-nowrap">{formatPrice(item.price)}</p>
                    {item.originalPrice && (
                      <div className="flex items-center justify-end gap-2">
                        <p className="text-sm whitespace-nowrap text-gray-400 line-through">
                          {formatPrice(item.originalPrice)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-primary mb-4 text-xs">Few units left</p>

                <div className="mt-auto flex items-center justify-between gap-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-primary hover:text-primary flex items-center gap-2 text-sm font-bold uppercase transition"
                  >
                    <FiTrash2 className="text-lg" />
                    Remove
                  </button>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-primary flex h-8 w-8 items-center justify-center rounded-md text-white shadow-sm disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="text-lg font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-primary flex h-8 w-8 items-center justify-center rounded-md text-white shadow-sm"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- RIGHT SIDE: SUMMARY --- */}
        <aside className="lg:w-80">
          <div className="sticky top-18 rounded-sm bg-white p-4 shadow-sm">
            <h3 className="mb-4 border-b pb-2 text-sm font-bold text-gray-500 uppercase">
              Cart Summary
            </h3>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-gray-700">Item's total ({cartCount})</span>
              <span className="text-lg font-bold text-gray-800">{formatPrice(cartTotal)}</span>
            </div>

            <div className="mb-6 flex items-center justify-between border-t pt-4">
              <span className="font-bold text-gray-800">Subtotal</span>
              <span className="text-xl font-bold text-gray-800">{formatPrice(cartTotal)}</span>
            </div>

            <button className="bg-primary/80 hover:bg-primary w-full rounded py-3 font-bold text-white uppercase shadow-md transition-all">
              Checkout ({formatPrice(cartTotal)})
            </button>
          </div>
        </aside>
      </div>

      {/* --- RECENTLY VIEWED --- */}
      <section className="mt-12">
        <div className="flex items-center justify-between rounded-sm border-b border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium">Recently Viewed</h2>
          <Link
            to="/products"
            className="text-primary/80 flex items-center gap-1 text-sm font-bold"
          >
            See All <FiChevronRight />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 bg-white p-6 md:grid-cols-4 lg:grid-cols-6">
          {/* Map through your recently viewed items here */}
          <div className="border border-transparent p-2 transition hover:border-gray-200">
            <img
              src="/placeholder.png"
              alt="Product"
              className="mb-2 aspect-square w-full object-contain"
            />
            <p className="line-clamp-2 text-xs">Example Product Title Here...</p>
            <p className="text-sm font-bold">₦ 5,000</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserCart;
