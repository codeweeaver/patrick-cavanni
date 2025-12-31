import { createContext, useEffect, useReducer } from 'react';

const WishlistContext = createContext();

const getInitialWishlist = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    items: user?.wishlist || [],
  };
};

const wishReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_WISHLIST': {
      const product = action.payload;
      const isExist = state.items.find((item) => item.id === product.id);

      if (isExist) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== product.id),
        };
      }
      return {
        ...state,
        items: [...state.items, product],
      };
    }
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'SET_WISHLIST':
      return {
        ...state,
        items: action.payload,
      };
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishReducer, null, getInitialWishlist);

  // Sync wishlist with the user object in localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (user) {
      const updatedUser = { ...user, wishlist: state.items };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      const updatedUsersList = allUsers.map((u) => (u.id === user.id ? updatedUser : u));
      localStorage.setItem('users', JSON.stringify(updatedUsersList));
    }
  }, [state.items]);

  // Sync state if localStorage changes (e.g., login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({ type: 'SET_WISHLIST', payload: user?.wishlist || [] });
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleWishlist = (product) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const isInWishlist = (productId) => {
    return state.items.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: state.items,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount: state.items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
