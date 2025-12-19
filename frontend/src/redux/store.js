// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice.js";
// import ownerSlice from "./ownerSlice.js";
// import mapSlice from "./mapSlice.js";

// export const store = configureStore({
//   reducer: {
//     user: userSlice,
//     owner: ownerSlice,
//     map: mapSlice
//   },
// });



import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import ownerSlice from "./ownerSlice.js";
import mapSlice from "./mapSlice.js";

export const store = configureStore({
  reducer: {
    user: userSlice,
    owner: ownerSlice,
    map: mapSlice
  },
  // ✅ CHANGE 1: Configure middleware to ignore socket serialization warnings
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['user/setSocket'],
        // Ignore these paths in the state
        ignoredPaths: ['user.socket'],
      },
    }),
});
