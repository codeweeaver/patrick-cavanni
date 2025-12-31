import { createContext, useEffect, useReducer } from 'react';

const CartContext = createContext();

const getInitialCart = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    items: user?.cart || [],
  };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      const quantityToAdd = newItem.quantity || 1;

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + quantityToAdd } : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...newItem, quantity: quantityToAdd }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, null, getInitialCart);

  // Sync cart with the user object in localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (user) {
      // 1. Update the current session user object
      const updatedUser = { ...user, cart: state.items };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // 2. Update this user in the global users array (database mock)
      const updatedUsersList = allUsers.map((u) => (u.id === user.id ? updatedUser : u));
      localStorage.setItem('users', JSON.stringify(updatedUsersList));
    }
  }, [state.items]);

  // Listen for login/logout to reset cart state
  useEffect(() => {
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({ type: 'SET_CART', payload: user?.cart || [] });
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addToCart = (item) => {
    // Safety check: Ensure item is a valid product with an ID, not a click event
    if (!item?.id || item?.nativeEvent) {
      console.error(
        'Invalid item passed to addToCart. Ensure you are using () => addToCart(product)',
      );
      return;
    }
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Derived state
  const cartCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
