
/***********************     1   *********************** */

// import { useDispatch, useSelector } from "react-redux";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import UserOrderCard from "../components/userOrderCard";
// import OwnerOrderCard from "../components/OwnerOrderCard";
// import { useCallback, useEffect } from "react";
// import { addMyOrders } from "../redux/userSlice";
// import { useSocket } from "../hooks/useSocket";

// const MyOrders = () => {
//   const navigate = useNavigate();
//   const { userData, myOrders } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const handleNewOrder = useCallback(
//     (orderData) => {
//       console.log("📦 New order received via socket");

//       // Only process for owners
//       if (userData?.role !== "owner") return;

//       // Backend already filters and sends only relevant shop orders
//       if (!orderData.shopOrders || orderData.shopOrders.length === 0) return;

//       // Add the new order to the beginning of the list
//       dispatch(addMyOrders(orderData));

//       // Show browser notification
//       if ("Notification" in window && Notification.permission === "granted") {
//         new Notification("New Order Received! 🎉", {
//           body: `You have a new order from ${
//             orderData.user?.fullName || "a customer"
//           }`,
//           icon: "/logo.png",
//         });
//       }
//     },
//     [userData?.role, dispatch]
//   );

//   // Use custom hook for socket event
//   useSocket("newOrder", handleNewOrder);

//   // Request notification permission on mount
//   useEffect(() => {
//     if ("Notification" in window && Notification.permission === "default") {
//       Notification.requestPermission();
//     }
//   }, []);

//   return (
//     <div className="w-full min-h-screen bg-[#fff9f6] flex justify-center px-4">
//       <div className="w-full max-w-[900px] p-4">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-6">
//           <div
//             className="cursor-pointer hover:scale-110 transition-transform"
//             onClick={() => navigate("/")}
//           >
//             <IoIosArrowRoundBack size={40} className="text-[#ff4d2d]" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
//         </div>

//         {/* No orders message */}
//         {(!myOrders || myOrders.length === 0) && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">No orders yet</p>
//           </div>
//         )}

//         {/* mapping orders */}
//         <div className="space-y-6">
//           {myOrders?.map((order) =>
//             userData.role === "user" ? (
//               <UserOrderCard data={order} key={order._id} />
//             ) : userData.role === "owner" ? (
//               <OwnerOrderCard data={order} key={order._id} />
//             ) : null
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyOrders;



//***************************   2    ***************************** */

import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UserOrderCard from "../components/userOrderCard";
import OwnerOrderCard from "../components/OwnerOrderCard";
import { useCallback, useEffect } from "react";
import { addMyOrders, updateStatus } from "../redux/userSlice"; // ✅ CHANGE 1: Import updateStatus
import { useSocket } from "../hooks/useSocket";

const MyOrders = () => {
  const navigate = useNavigate();
  const { userData, myOrders } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // ✅ CHANGE 2: Handler for new orders (existing)
  const handleNewOrder = useCallback(
    (orderData) => {
      console.log("📦 New order received via socket");

      // Only process for owners
      if (userData?.role !== "owner") return;

      // Backend already filters and sends only relevant shop orders
      if (!orderData.shopOrders || orderData.shopOrders.length === 0) return;

      // Add the new order to the beginning of the list
      dispatch(addMyOrders(orderData));

      // Show browser notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("New Order Received! 🎉", {
          body: `You have a new order from ${
            orderData.user?.fullName || "a customer"
          }`,
          icon: "/logo.png",
        });
      }
    },
    [userData?.role, dispatch]
  );

  // ✅ CHANGE 3: NEW - Handler for order status updates
  const handleOrderStatusChanged = useCallback(
    (data) => {
      console.log("📊 Order status update received in MyOrders:", data);

      // Process for all users (customer sees their orders, owner sees their shop orders)
      if (!userData?._id) return;

      // Check if this order exists in myOrders
      const orderExists = myOrders?.some((order) => 
        order._id.toString() === data.orderId.toString()
      );

      if (orderExists) {
        console.log(`✅ Updating order ${data.orderId} status to ${data.status}`);

        // Update Redux store - this updates the order in myOrders array
        dispatch(updateStatus({
          orderId: data.orderId,
          shopId: data.shopId,
          status: data.status,
        }));

        // Show browser notification for customers
        if (
          userData.role === "user" &&
          "Notification" in window &&
          Notification.permission === "granted"
        ) {
          new Notification("Order Status Updated", {
            body: `Your order status is now: ${data.status}`,
            icon: "/logo.png",
          });
        }
      }
    },
    [userData, myOrders, dispatch]
  );

  // Use custom hooks for socket events
  useSocket("newOrder", handleNewOrder); // ✅ For owners receiving new orders
  useSocket("orderStatusChanged", handleOrderStatusChanged); // ✅ CHANGE 4: NEW - For status updates

  // Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex justify-center px-4">
      <div className="w-full max-w-[900px] p-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() => navigate("/")}
          >
            <IoIosArrowRoundBack size={40} className="text-[#ff4d2d]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        </div>

        {/* No orders message */}
        {(!myOrders || myOrders.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders yet</p>
          </div>
        )}

        {/* mapping orders */}
        <div className="space-y-6">
          {myOrders?.map((order) =>
            userData.role === "user" ? (
              <UserOrderCard data={order} key={order._id} />
            ) : userData.role === "owner" ? (
              <OwnerOrderCard data={order} key={order._id} />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;