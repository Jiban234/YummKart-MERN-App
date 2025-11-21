// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     userData: null,
//     currentCity: null,
//     currentState: null,
//     currentAddress: null,
//     shopInMyCity: null,
//     itemInMyCity: null,
//     cartItems: [],
//     totalQuantity: 0, // Total number of items (not unique items)
//     myOrders: [],
//   },
//   reducers: {
//     setUserData: (state, action) => {
//       state.userData = action.payload;
//     },
//     setCurrentCity: (state, action) => {
//       state.currentCity = action.payload;
//     },
//     setCurrentState: (state, action) => {
//       state.currentState = action.payload;
//     },
//     setCurrentAddress: (state, action) => {
//       state.currentAddress = action.payload;
//     },
//     setShopInMyCity: (state, action) => {
//       state.shopInMyCity = action.payload;
//     },
//     setItemInMyCity: (state, action) => {
//       state.itemInMyCity = action.payload;
//     },
//     addToCart: (state, action) => {
//       const cartItem = action.payload;
//       const existingItem = state.cartItems.find((i) => i.id === cartItem.id);

//       if (existingItem) {
//         // Update quantity (can be +1 or -1)
//         existingItem.quantity += cartItem.quantity;

//         // Remove item if quantity becomes 0
//         if (existingItem.quantity <= 0) {
//           state.cartItems = state.cartItems.filter((i) => i.id !== cartItem.id);
//         }
//       } else {
//         // Add new item (only if quantity > 0)
//         if (cartItem.quantity > 0) {
//           state.cartItems.push(cartItem);
//         }
//       }

//       // Calculate total quantity of all items
//       state.totalQuantity = state.cartItems.reduce(
//         (sum, item) => sum + item.quantity,
//         0
//       );
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
//       state.totalQuantity = state.cartItems.reduce(
//         (sum, item) => sum + item.quantity,
//         0
//       );
//     },
//     clearCart: (state) => {
//       state.cartItems = [];
//       state.totalQuantity = 0;
//     },

//     setMyOrders: (state, action) => {
//       state.myOrders = action.payload;
//     },
//     addMyOrders: (state, action) => {
//       state.myOrders = [action.payload, ...state.myOrders];
//     },
//     // updateStatus: (state, action) => {
//     //   const { orderId, shopId, status } = action.payload;
//     //   const order = state.myOrders.find(
//     //     (o) => o._id.toString() === orderId.toString()
//     //   );

//     //   if (order) {
//     //     if (
//     //       order.shopOrders &&
//     //       order.shopOrders.shop._id.toString() === shopId.toString()
//     //     ) {
//     //       order.shopOrders.status = status;
//     //     }
//     //   }
//     // },

//     updateStatus: (state, action) => {
//       const { orderId, shopId, status } = action.payload;

//       const order = state.myOrders?.find(
//         (o) => o._id.toString() === orderId.toString()
//       );

//       if (order && Array.isArray(order.shopOrders)) {
//         // const shopOrder = order.shopOrders.find(
//         //   (so) => so.shop._id.toString() === shopId.toString()
//         // );

//         const shopOrder = order.shopOrders.find((so) => {
//           if (!so.shop) return false;
//           return (
//             (so.shop._id?.toString?.() || so.shop.toString?.()) ===
//             shopId.toString()
//           );
//         });

//         if (shopOrder) {
//           shopOrder.status = status;
//         }
//       }
//     },
//   },
// });

// export const {
//   setUserData,
//   setCurrentCity,
//   setCurrentState,
//   setCurrentAddress,
//   setShopInMyCity,
//   setItemInMyCity,
//   addToCart,
//   removeFromCart,
//   clearCart,
//   setMyOrders,
//   addMyOrders,
//   updateStatus,
// } = userSlice.actions;
// export default userSlice.reducer;





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
    totalQuantity: 0,
    myOrders: [],
    // Search state
    searchQuery: "",
    searchedShops: [],
    searchedItems: [],
    isSearching: false,
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
    
    // Search reducers
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchedShops: (state, action) => {
      state.searchedShops = action.payload;
    },
    setSearchedItems: (state, action) => {
      state.searchedItems = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = "";
      state.searchedShops = [];
      state.searchedItems = [];
      state.isSearching = false;
    },

    addToCart: (state, action) => {
      const cartItem = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === cartItem.id);

      if (existingItem) {
        existingItem.quantity += cartItem.quantity;

        if (existingItem.quantity <= 0) {
          state.cartItems = state.cartItems.filter((i) => i.id !== cartItem.id);
        }
      } else {
        if (cartItem.quantity > 0) {
          state.cartItems.push(cartItem);
        }
      }

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
    addMyOrders: (state, action) => {
      state.myOrders = [action.payload, ...state.myOrders];
    },

    updateStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;

      const order = state.myOrders?.find(
        (o) => o._id.toString() === orderId.toString()
      );

      if (order && Array.isArray(order.shopOrders)) {
        const shopOrder = order.shopOrders.find((so) => {
          if (!so.shop) return false;
          return (
            (so.shop._id?.toString?.() || so.shop.toString?.()) ===
            shopId.toString()
          );
        });

        if (shopOrder) {
          shopOrder.status = status;
        }
      }
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
  setSearchQuery,
  setSearchedShops,
  setSearchedItems,
  setIsSearching,
  clearSearch,
  addToCart,
  removeFromCart,
  clearCart,
  setMyOrders,
  addMyOrders,
  updateStatus,
} = userSlice.actions;

export default userSlice.reducer;