// import { Navigate, Route, Routes } from "react-router-dom";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import ForgotPassword from "./pages/ForgotPassword";
// import useGetCurrentUser from "./hooks/useGetCurrentUser";
// import { useDispatch, useSelector } from "react-redux";
// import Home from "./pages/Home";
// import useGetCurrentCity from "./hooks/useGetCurrentCity";
// import useGetMyShop from "./hooks/useGetMyShop";
// import CreateEditShop from "./pages/CreateEditShop";
// import AddItem from "./pages/AddItem";
// import EditItem from "./pages/EditItem";
// import useGetShopByCity from "./hooks/useGetShopByCity";
// import useGetItemByCity from "./hooks/useGetItemByCity";
// import CartPage from "./pages/CartPage";
// import CheckOut from "./pages/CheckOut";
// import OrderPlaced from "./pages/OrderPlaced";
// import MyOrders from "./pages/MyOrders";
// import useGetMyOrders from "./hooks/useGetMyOrders";
// import useUpdateLocation from "./hooks/useUpdateLocation";
// import TrackOrderPage from "./pages/TrackOrderPage";
// import ShopMenu from "./pages/ShopMenu";
// import { setSocket } from "./redux/userSlice";
// import { useEffect } from "react";
// import { io } from "socket.io-client";

// export const serverUrl = "http://localhost:8000";
// const App = () => {
//   const { userData } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   useGetCurrentUser();
//   useUpdateLocation();
//   useGetCurrentCity();
//   useGetMyShop();
//   useGetShopByCity();
//   useGetItemByCity();
//   useGetMyOrders();
//   useEffect(() => {
//     const socketInstance = io(serverUrl, {
//       withCredentials: true,
//     });
//     dispatch(setSocket(socketInstance));
//     socketInstance.on("connect", () => {
//       if (userData) {
//         socketInstance.emit("identity", { userId: userData._id });
//       }
//     });

//     return ()=>{
//       socketInstance.disconnect()
//     }
//   }, [userData?._id]);

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={userData ? <Home /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/signup"
//         element={!userData ? <SignUp /> : <Navigate to={"/"} />}
//       />
//       <Route
//         path="/signin"
//         element={!userData ? <SignIn /> : <Navigate to={"/"} />}
//       />
//       <Route
//         path="/forgot-password"
//         element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
//       />
//       <Route
//         path="/create-edit-shop"
//         element={userData ? <CreateEditShop /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/add-item"
//         element={userData ? <AddItem /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/edit-item/:itemId"
//         element={userData ? <EditItem /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/cart"
//         element={userData ? <CartPage /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/checkout"
//         element={userData ? <CheckOut /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/order-placed"
//         element={userData ? <OrderPlaced /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/my-orders"
//         element={userData ? <MyOrders /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/track-order/:orderId"
//         element={userData ? <TrackOrderPage /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/shop/:shopId"
//         element={userData ? <ShopMenu /> : <Navigate to={"/signin"} />}
//       />
//     </Routes>
//   );
// };

// export default App;









import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCurrentCity from "./hooks/useGetCurrentCity";
import useGetMyShop from "./hooks/useGetMyShop";
import CreateEditShop from "./pages/CreateEditShop";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import useGetShopByCity from "./hooks/useGetShopByCity";
import useGetItemByCity from "./hooks/useGetItemByCity";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import OrderPlaced from "./pages/OrderPlaced";
import MyOrders from "./pages/MyOrders";
import useGetMyOrders from "./hooks/useGetMyOrders";
import useUpdateLocation from "./hooks/useUpdateLocation";
import TrackOrderPage from "./pages/TrackOrderPage";
import ShopMenu from "./pages/ShopMenu";
import { setSocket } from "./redux/userSlice";
import { useEffect, useRef } from "react"; // ✅ CHANGE 2: Added useRef
import { io } from "socket.io-client";

export const serverUrl = "http://localhost:8000";

const App = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const socketRef = useRef(null); // ✅ CHANGE 3: Added useRef to track socket instance

  useGetCurrentUser();
  useUpdateLocation();
  useGetCurrentCity();
  useGetMyShop();
  useGetShopByCity();
  useGetItemByCity();
  useGetMyOrders();

  useEffect(() => {
    // ✅ CHANGE 4: Check if user is logged in
    if (!userData?._id) {
      // User logged out - disconnect socket
      if (socketRef.current) {
        console.log("🔌 Disconnecting socket - user logged out");
        socketRef.current.disconnect();
        socketRef.current = null;
        dispatch(setSocket(null));
      }
      return;
    }

    // ✅ CHANGE 5: Only create socket if it doesn't exist
    if (!socketRef.current) {
      console.log("🔌 Creating new socket connection");
      const socketInstance = io(serverUrl, {
        withCredentials: true,
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      socketRef.current = socketInstance;
      dispatch(setSocket(socketInstance));

      // ✅ CHANGE 6: Better connection handlers
      socketInstance.on("connect", () => {
        console.log("✅ Connected to socket server:", socketInstance.id);
        socketInstance.emit("identity", { userId: userData._id });
      });

      socketInstance.on("disconnect", (reason) => {
        console.log("❌ Disconnected from socket server:", reason);
      });

      socketInstance.on("connect_error", (error) => {
        console.error("❌ Socket connection error:", error);
      });

      socketInstance.on("reconnect", (attemptNumber) => {
        console.log(`🔄 Reconnected after ${attemptNumber} attempts`);
        socketInstance.emit("identity", { userId: userData._id });
      });
    }

    // ✅ CHANGE 7: Cleanup only on unmount, not on userData change
    return () => {
      if (socketRef.current) {
        console.log("🧹 Cleaning up socket on unmount");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [userData?._id, dispatch]); // ✅ CHANGE 8: Added dispatch to dependencies

  return (
    <Routes>
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />
      <Route
        path="/create-edit-shop"
        element={userData ? <CreateEditShop /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/add-item"
        element={userData ? <AddItem /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/edit-item/:itemId"
        element={userData ? <EditItem /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/cart"
        element={userData ? <CartPage /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/checkout"
        element={userData ? <CheckOut /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/order-placed"
        element={userData ? <OrderPlaced /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/my-orders"
        element={userData ? <MyOrders /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/track-order/:orderId"
        element={userData ? <TrackOrderPage /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/shop/:shopId"
        element={userData ? <ShopMenu /> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
};

export default App;