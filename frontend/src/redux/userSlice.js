import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    currentCity: null,
    currentState: null,
    currentAddress: null,
    shopInMyCity: null,
    itemInMyCity: null,
    cartItems: [],
    totalQuantity: 0, // Total number of items (not unique items)
    myOrders: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setShopInMyCity: (state, action) => {
      state.shopInMyCity = action.payload;
    },
    setItemInMyCity: (state, action) => {
      state.itemInMyCity = action.payload;
    },
    addToCart: (state, action) => {
      const cartItem = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === cartItem.id);

      if (existingItem) {
        // Update quantity (can be +1 or -1)
        existingItem.quantity += cartItem.quantity;

        // Remove item if quantity becomes 0
        if (existingItem.quantity <= 0) {
          state.cartItems = state.cartItems.filter((i) => i.id !== cartItem.id);
        }
      } else {
        // Add new item (only if quantity > 0)
        if (cartItem.quantity > 0) {
          state.cartItems.push(cartItem);
        }
      }

      // Calculate total quantity of all items
      state.totalQuantity = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      state.totalQuantity = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
    },

    setMyOrders: (state, action) => {
      state.myOrders = action.payload;
    },
  },
});

export const {
  setUserData,
  setCurrentCity,
  setCurrentState,
  setCurrentAddress,
  setShopInMyCity,
  setItemInMyCity,
  addToCart,
  removeFromCart,
  clearCart,
  setMyOrders
} = userSlice.actions;
export default userSlice.reducer;
