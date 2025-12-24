import { createContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      const quantityToAdd = newItem.quantity || 1;

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...newItem, quantity: quantityToAdd }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Derived state
  const cartCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const cartTotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
