// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { serverUrl } from "../App";
// import axios from "axios";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import DeliveryBoyTracking from "../components/DeliveryBoyTracking";

// const TrackOrderPage = () => {
//   const { orderId } = useParams();
//   const [currentOrder, setCurrentOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const handleGetOrder = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${serverUrl}/api/order/get-order-by-id/${orderId}`,
//         {
//           withCredentials: true,
//         }
//       );
//       console.log(response.data.order);
//       setCurrentOrder(response.data.order);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleGetOrder();
//   }, [orderId]);

//   // Helper function to check if delivery boy has valid location
//   const hasValidLocation = (deliveryBoy) => {
//     return (
//       deliveryBoy?.location?.coordinates &&
//       Array.isArray(deliveryBoy.location.coordinates) &&
//       deliveryBoy.location.coordinates.length === 2
//     );
//   };

//   // Status badge component
//   const StatusBadge = ({ status }) => {
//     const statusConfig = {
//       pending: { color: "bg-yellow-100 text-yellow-700", label: "Pending" },
//       preparing: { color: "bg-blue-100 text-blue-700", label: "Preparing" },
//       "out of delivery": { color: "bg-purple-100 text-purple-700", label: "Out for Delivery" },
//       delivered: { color: "bg-green-100 text-green-700", label: "Delivered" },
//     };

//     const config = statusConfig[status] || statusConfig.pending;

//     return (
//       <span className={`px-3 py-1 rounded-full text-sm font-semibold ${config.color}`}>
//         {config.label}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
//         <div className="text-xl font-semibold text-gray-600">Loading order details...</div>
//       </div>
//     );
//   }

//   if (!currentOrder) {
//     return (
//       <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
//         <div className="text-xl font-semibold text-gray-600">Order not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f5f5f5] p-4 md:p-6">
//       {/* Header + Content wrapper */}
//       <div className="w-full max-w-[900px] mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
//         {/* Header with Back Arrow */}
//         <div className="flex items-center gap-4 mb-2">
//           <div
//             className="cursor-pointer hover:scale-110 transition-transform"
//             onClick={() => navigate("/my-orders")}
//           >
//             <IoIosArrowRoundBack size={40} className="text-[#ff4d2d]" />
//           </div>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//             Track Order
//           </h1>
//         </div>

//         {/* Order Summary */}
//         <div className="bg-orange-50 p-4 rounded-xl">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm text-gray-600">Order ID</p>
//               <p className="font-mono text-sm font-semibold">{currentOrder._id}</p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-gray-600">Total Amount</p>
//               <p className="text-2xl font-bold text-orange-600">₹{currentOrder.totalAmount}</p>
//             </div>
//           </div>
//         </div>

//         {/* Mapping of different orders */}
//         {currentOrder?.shopOrders?.map((shopOrder, index) => (
//           <div
//             className="bg-white p-6 rounded-2xl shadow-md border border-orange-100 space-y-4"
//             key={index}
//           >
//             {/* Shop Header */}
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-xl font-bold text-orange-500">
//                   {shopOrder.shop.name}
//                 </p>
//                 <StatusBadge status={shopOrder.status} />
//               </div>
//             </div>

//             {/* Order Items */}
//             <div className="space-y-2">
//               <p className="font-semibold text-gray-700">
//                 <span className="text-gray-500">Items: </span>
//                 {shopOrder.shopOrderItems.map((i) => i.name).join(", ")}
//               </p>
//               <p className="font-semibold text-gray-700">
//                 <span className="text-gray-500">Subtotal: </span>₹{shopOrder.subtotal}
//               </p>
//               <p className="font-semibold text-gray-700">
//                 <span className="text-gray-500">Delivery Address: </span>
//                 {currentOrder.deliveryAddress.text}
//               </p>
//             </div>

//             {/* Delivery boy details */}
//             {shopOrder.status !== "delivered" ? (
//               <div className="bg-gray-50 p-4 rounded-xl space-y-2">
//                 <h2 className="font-bold text-gray-800 text-lg">Delivery Boy Details</h2>
//                 {shopOrder.assignedDeliveryBoy ? (
//                   <div className="space-y-1">
//                     <p className="text-gray-700">
//                       <span className="font-semibold">Name: </span>
//                       {shopOrder.assignedDeliveryBoy.fullName}
//                     </p>
//                     <p className="text-gray-700">
//                       <span className="font-semibold">Contact No: </span>
//                       {shopOrder.assignedDeliveryBoy.mobile}
//                     </p>
//                   </div>
//                 ) : (
//                   <p className="text-gray-600 italic">Delivery Boy is not assigned yet</p>
//                 )}
//               </div>
//             ) : (
//               <div className="bg-green-50 p-4 rounded-xl">
//                 <p className="text-green-700 font-bold text-lg flex items-center gap-2">
//                   ✅ Delivered Successfully
//                 </p>
//               </div>
//             )}

//             {/* Map Tracking */}
//             {shopOrder.assignedDeliveryBoy &&
//              hasValidLocation(shopOrder.assignedDeliveryBoy) && 
//              shopOrder.status !== "delivered" && (
//               <div className="space-y-2">
//                 <h3 className="font-bold text-gray-800 text-lg">Live Tracking</h3>
//                 <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
//                   <DeliveryBoyTracking
//                     data={{
//                       deliveryBoyLocation: {
//                         lat: shopOrder.assignedDeliveryBoy.location.coordinates[1],
//                         lon: shopOrder.assignedDeliveryBoy.location.coordinates[0],
//                       },
//                       customerLocation: {
//                         lat: currentOrder.deliveryAddress.latitude,
//                         lon: currentOrder.deliveryAddress.longitude,
//                       },
//                     }}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Show message if delivery boy assigned but no location */}
//             {shopOrder.assignedDeliveryBoy && 
//              !hasValidLocation(shopOrder.assignedDeliveryBoy) && 
//              shopOrder.status !== "delivered" && (
//               <div className="bg-yellow-50 p-4 rounded-xl">
//                 <p className="text-yellow-700 text-sm">
//                   📍 Delivery boy location is not available yet
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrackOrderPage;










// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { serverUrl } from "../App";
// import axios from "axios";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import DeliveryBoyTracking from "../components/DeliveryBoyTracking";
// import { useDispatch } from "react-redux";
// import { updateStatus } from "../redux/userSlice";
// import { useSocket } from "../hooks/useSocket";

// const TrackOrderPage = () => {
//   const { orderId } = useParams();
//   const [currentOrder, setCurrentOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleGetOrder = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${serverUrl}/api/order/get-order-by-id/${orderId}`,
//         {
//           withCredentials: true,
//         }
//       );
//       console.log(response.data.order);
//       setCurrentOrder(response.data.order);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleGetOrder();
//   }, [orderId]);

//   // ✅ Using custom hook for order status updates
//   const handleOrderStatusChanged = useCallback(
//     (data) => {
//       console.log("📊 Order status update received:", data);

//       // Only update if it's for the current order
//       if (data.orderId === orderId) {
//         // Update Redux store
//         dispatch(
//           updateStatus({
//             orderId: data.orderId,
//             shopId: data.shopId,
//             status: data.status,
//           })
//         );

//         // Update local state
//         setCurrentOrder((prevOrder) => {
//           if (!prevOrder) return prevOrder;

//           return {
//             ...prevOrder,
//             shopOrders: prevOrder.shopOrders.map((shopOrder) => {
//               if (
//                 shopOrder.shop._id.toString() === data.shopId.toString() ||
//                 shopOrder.shop.toString() === data.shopId.toString()
//               ) {
//                 return { ...shopOrder, status: data.status };
//               }
//               return shopOrder;
//             }),
//           };
//         });

//         // Show notification
//         if ("Notification" in window && Notification.permission === "granted") {
//           new Notification("Order Status Updated", {
//             body: `Your order status is now: ${data.status}`,
//           });
//         }
//       }
//     },
//     [orderId, dispatch]
//   );

//   // ✅ Using custom hook for delivery location updates
//   const handleDeliveryLocationUpdate = useCallback(
//     (data) => {
//       console.log("📍 Delivery location update:", data);

//       // Update delivery boy location in current order
//       setCurrentOrder((prevOrder) => {
//         if (!prevOrder) return prevOrder;

//         return {
//           ...prevOrder,
//           shopOrders: prevOrder.shopOrders.map((shopOrder) => {
//             if (
//               shopOrder.assignedDeliveryBoy?._id.toString() ===
//               data.userId.toString()
//             ) {
//               return {
//                 ...shopOrder,
//                 assignedDeliveryBoy: {
//                   ...shopOrder.assignedDeliveryBoy,
//                   location: {
//                     type: "Point",
//                     coordinates: data.coordinates,
//                   },
//                 },
//               };
//             }
//             return shopOrder;
//           }),
//         };
//       });
//     },
//     []
//   );

//   // Listen to socket events using custom hook
//   useSocket("orderStatusChanged", handleOrderStatusChanged);
//   useSocket("deliveryLocationUpdated", handleDeliveryLocationUpdate);

//   // Helper function to check if delivery boy has valid location
//   const hasValidLocation = (deliveryBoy) => {
//     return (
//       deliveryBoy?.location?.coordinates &&
//       Array.isArray(deliveryBoy.location.coordinates) &&
//       deliveryBoy.location.coordinates.length === 2
//     );
//   };

//   // Status badge component
//   const StatusBadge = ({ status }) => {
//     const statusConfig = {
//       pending: { color: "bg-yellow-100 text-yellow-700", label: "Pending" },
//       preparing: { color: "bg-blue-100 text-blue-700", label: "Preparing" },
//       "out of delivery": {
//         color: "bg-purple-100 text-purple-700",
//         label: "Out for Delivery",
//       },
//       delivered: { color: "bg-green-100 text-green-700", label: "Delivered" },
//     };

//     const config = statusConfig[status] || statusConfig.pending;

//     return (
//       <span
//         className={`px-3 py-1 rounded-full text-sm font-semibold ${config.color}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
//         <div className="text-xl font-semibold text-gray-600">
//           Loading order details...
//         </div>
//       </div>
//     );
//   }

//   if (!currentOrder) {
//     return (
//       <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
//         <div className="text-xl font-semibold text-gray-600">
//           Order not found
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f5f5f5] p-4 md:p-6">
//       {/* Header + Content wrapper */}
//       <div className="w-full max-w-[900px] mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
//         {/* Header with Back Arrow */}
//         <div className="flex items-center gap-4 mb-2">
//           <div
//             className="cursor-pointer hover:scale-110 transition-transform"
//             onClick={() => navigate("/my-orders")}
//           >
//             <IoIosArrowRoundBack size={40} className="text-[#ff4d2d]" />
//           </div>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//             Track Order
//           </h1>
//         </div>

//         {/* Order Summary */}
//         <div className="bg-orange-50 p-4 rounded-xl">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm text-gray-600">Order ID</p>
//               <p className="font-mono text-sm font-semibold">
//                 {currentOrder._id}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-gray-600">Total Amount</p>
//               <p className="text-2xl font-bold text-orange-600">
//                 ₹{currentOrder.totalAmount}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Mapping of different orders */}
//         {currentOrder?.shopOrders?.map((shopOrder, index) => (
//           <div
//             className="bg-white p-6 rounded-2xl shadow-md border border-orange-100 space-y-4"
//             key={shopOrder._id || index}
//           >
//             {/* Shop Header */}
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-xl font-bold text-orange-500">
//                   {shopOrder.shop.name}
//                 </p>
//                 <StatusBadge status={shopOrder.status} />
//               </div>
//             </div>

//             {/* Order Items */}
//             <div className="space-y-2">
//               <p className="font-semibold text-gray-700">
//                 <span className="text-gray-500">Items: </span>
//                 {shopOrder.shopOrderItems.map((i) => i.name).join(", ")}
//               </p>
//               <p className="font-semibold text-gray-700">
//                 <span className="text-gray-500">Subtotal: </span>₹
//                 {shopOrder.subtotal}
//               </p>
//               <p className="font-semibold text-gray-700">
//                 <span className="text-gray-500">Delivery Address: </span>
//                 {currentOrder.deliveryAddress.text}
//               </p>
//             </div>

//             {/* Delivery boy details */}
//             {shopOrder.status !== "delivered" ? (
//               <div className="bg-gray-50 p-4 rounded-xl space-y-2">
//                 <h2 className="font-bold text-gray-800 text-lg">
//                   Delivery Boy Details
//                 </h2>
//                 {shopOrder.assignedDeliveryBoy ? (
//                   <div className="space-y-1">
//                     <p className="text-gray-700">
//                       <span className="font-semibold">Name: </span>
//                       {shopOrder.assignedDeliveryBoy.fullName}
//                     </p>
//                     <p className="text-gray-700">
//                       <span className="font-semibold">Contact No: </span>
//                       {shopOrder.assignedDeliveryBoy.mobile}
//                     </p>
//                   </div>
//                 ) : (
//                   <p className="text-gray-600 italic">
//                     Delivery Boy is not assigned yet
//                   </p>
//                 )}
//               </div>
//             ) : (
//               <div className="bg-green-50 p-4 rounded-xl">
//                 <p className="text-green-700 font-bold text-lg flex items-center gap-2">
//                   ✅ Delivered Successfully
//                 </p>
//               </div>
//             )}

//             {/* Map Tracking */}
//             {shopOrder.assignedDeliveryBoy &&
//               hasValidLocation(shopOrder.assignedDeliveryBoy) &&
//               shopOrder.status !== "delivered" && (
//                 <div className="space-y-2">
//                   <h3 className="font-bold text-gray-800 text-lg">
//                     Live Tracking
//                   </h3>
//                   <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
//                     <DeliveryBoyTracking
//                       data={{
//                         deliveryBoyLocation: {
//                           lat: shopOrder.assignedDeliveryBoy.location
//                             .coordinates[1],
//                           lon: shopOrder.assignedDeliveryBoy.location
//                             .coordinates[0],
//                         },
//                         customerLocation: {
//                           lat: currentOrder.deliveryAddress.latitude,
//                           lon: currentOrder.deliveryAddress.longitude,
//                         },
//                       }}
//                     />
//                   </div>
//                 </div>
//               )}

//             {/* Show message if delivery boy assigned but no location */}
//             {shopOrder.assignedDeliveryBoy &&
//               !hasValidLocation(shopOrder.assignedDeliveryBoy) &&
//               shopOrder.status !== "delivered" && (
//                 <div className="bg-yellow-50 p-4 rounded-xl">
//                   <p className="text-yellow-700 text-sm">
//                     📍 Delivery boy location is not available yet
//                   </p>
//                 </div>
//               )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrackOrderPage;







import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { IoIosArrowRoundBack } from "react-icons/io";
import DeliveryBoyTracking from "../components/DeliveryBoyTracking";
import { useDispatch } from "react-redux";
import { updateStatus } from "../redux/userSlice";
import { useSocket } from "../hooks/useSocket"; // ✅ CHANGE 2: Import custom hook

const TrackOrderPage = () => {
  const { orderId } = useParams();
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGetOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${serverUrl}/api/order/get-order-by-id/${orderId}`,
        { withCredentials: true }
      );
      console.log(response.data.order);
      setCurrentOrder(response.data.order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetOrder();
  }, [orderId]);

  // ✅ CHANGE 3: Socket listener for real-time status updates
  const handleOrderStatusChanged = useCallback(
    (data) => {
      console.log("📊 Order status update received:", data);

      // Only update if it's for the current order
      if (data.orderId === orderId) {
        console.log(`✅ Updating status for order ${orderId} to ${data.status}`);

        // Update Redux store
        dispatch(
          updateStatus({
            orderId: data.orderId,
            shopId: data.shopId,
            status: data.status,
          })
        );

        // ✅ CHANGE 4: Update local state for immediate UI update
        setCurrentOrder((prevOrder) => {
          if (!prevOrder) return prevOrder;

          return {
            ...prevOrder,
            shopOrders: prevOrder.shopOrders.map((shopOrder) => {
              // Match by shop ID (handle both populated and non-populated)
              const shopIdMatch =
                (shopOrder.shop._id?.toString() === data.shopId.toString()) ||
                (shopOrder.shop.toString() === data.shopId.toString());

              if (shopIdMatch) {
                console.log(`✅ Found matching shop order, updating status`);
                return {
                  ...shopOrder,
                  status: data.status,
                  // Update delivery boy info if provided
                  ...(data.shopOrder?.assignedDeliveryBoy && {
                    assignedDeliveryBoy: data.shopOrder.assignedDeliveryBoy,
                  }),
                };
              }
              return shopOrder;
            }),
          };
        });

        // ✅ CHANGE 5: Show browser notification
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("Order Status Updated", {
            body: `Your order status is now: ${data.status}`,
            icon: "/logo.png",
          });
        }
      }
    },
    [orderId, dispatch]
  );

  // ✅ CHANGE 6: Listen to socket event using custom hook
  useSocket("orderStatusChanged", handleOrderStatusChanged);

  // Helper function to check if delivery boy has valid location
  const hasValidLocation = (deliveryBoy) => {
    return (
      deliveryBoy?.location?.coordinates &&
      Array.isArray(deliveryBoy.location.coordinates) &&
      deliveryBoy.location.coordinates.length === 2
    );
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-700", label: "Pending" },
      preparing: { color: "bg-blue-100 text-blue-700", label: "Preparing" },
      "out of delivery": {
        color: "bg-purple-100 text-purple-700",
        label: "Out for Delivery",
      },
      delivered: { color: "bg-green-100 text-green-700", label: "Delivered" },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          Loading order details...
        </div>
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Order not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-4 md:p-6">
      <div className="w-full max-w-[900px] mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
        {/* Header with Back Arrow */}
        <div className="flex items-center gap-4 mb-2">
          <div
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() => navigate("/my-orders")}
          >
            <IoIosArrowRoundBack size={40} className="text-[#ff4d2d]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Track Order
          </h1>
        </div>

        {/* Order Summary */}
        <div className="bg-orange-50 p-4 rounded-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-mono text-sm font-semibold">{currentOrder._id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-orange-600">
                ₹{currentOrder.totalAmount}
              </p>
            </div>
          </div>
        </div>

        {/* Mapping of different orders */}
        {currentOrder?.shopOrders?.map((shopOrder, index) => (
          <div
            className="bg-white p-6 rounded-2xl shadow-md border border-orange-100 space-y-4"
            key={shopOrder._id || index}
          >
            {/* Shop Header */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xl font-bold text-orange-500">
                  {shopOrder.shop.name}
                </p>
                <StatusBadge status={shopOrder.status} />
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-2">
              <p className="font-semibold text-gray-700">
                <span className="text-gray-500">Items: </span>
                {shopOrder.shopOrderItems.map((i) => i.name).join(", ")}
              </p>
              <p className="font-semibold text-gray-700">
                <span className="text-gray-500">Subtotal: </span>₹
                {shopOrder.subtotal}
              </p>
              <p className="font-semibold text-gray-700">
                <span className="text-gray-500">Delivery Address: </span>
                {currentOrder.deliveryAddress.text}
              </p>
            </div>

            {/* Delivery boy details */}
            {shopOrder.status !== "delivered" ? (
              <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                <h2 className="font-bold text-gray-800 text-lg">
                  Delivery Boy Details
                </h2>
                {shopOrder.assignedDeliveryBoy ? (
                  <div className="space-y-1">
                    <p className="text-gray-700">
                      <span className="font-semibold">Name: </span>
                      {shopOrder.assignedDeliveryBoy.fullName}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Contact No: </span>
                      {shopOrder.assignedDeliveryBoy.mobile}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600 italic">
                    Delivery Boy is not assigned yet
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-green-700 font-bold text-lg flex items-center gap-2">
                  ✅ Delivered Successfully
                </p>
              </div>
            )}

            {/* Map Tracking */}
            {shopOrder.assignedDeliveryBoy &&
              hasValidLocation(shopOrder.assignedDeliveryBoy) &&
              shopOrder.status !== "delivered" && (
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-800 text-lg">Live Tracking</h3>
                  <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
                    <DeliveryBoyTracking
                      data={{
                        deliveryBoyLocation: {
                          lat: shopOrder.assignedDeliveryBoy.location.coordinates[1],
                          lon: shopOrder.assignedDeliveryBoy.location.coordinates[0],
                        },
                        customerLocation: {
                          lat: currentOrder.deliveryAddress.latitude,
                          lon: currentOrder.deliveryAddress.longitude,
                        },
                      }}
                    />
                  </div>
                </div>
              )}

            {/* Show message if delivery boy assigned but no location */}
            {shopOrder.assignedDeliveryBoy &&
              !hasValidLocation(shopOrder.assignedDeliveryBoy) &&
              shopOrder.status !== "delivered" && (
                <div className="bg-yellow-50 p-4 rounded-xl">
                  <p className="text-yellow-700 text-sm">
                    📍 Delivery boy location is not available yet
                  </p>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrderPage;