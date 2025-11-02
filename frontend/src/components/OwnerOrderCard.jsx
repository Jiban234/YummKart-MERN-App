import React, { useState } from "react";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "../App";
import { useSelector } from "react-redux";

const OwnerOrderCard = ({ data }) => {
  const { userData } = useSelector((state) => state.user);
  const [statuses, setStatuses] = useState({});

  // Filter to show only the shop orders that belong to this owner
  const myShopOrders = data.shopOrders.filter(
    (shopOrder) => shopOrder.owner._id === userData._id
  );

  // If no shop orders belong to this owner, don't render the card
  if (myShopOrders.length === 0) return null;

  const handleStatusChange = async (shopOrderId, newStatus) => {
    try {
      const result = await axios.patch(
        `${serverUrl}/api/order/update-status`,
        {
          orderId: data._id,
          shopOrderId,
          status: newStatus,
        },
        { withCredentials: true }
      );

      if (result.data.success) {
        setStatuses((prev) => ({ ...prev, [shopOrderId]: newStatus }));
      }
    } catch (error) {
      console.error("Status update error:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const getStatusColor = (orderStatus) => {
    switch (orderStatus) {
      case "pending":
        return "text-blue-600";
      case "preparing":
        return "text-yellow-600";
      case "out of delivery":
        return "text-purple-600";
      case "delivered":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      {/* Customer Info Header */}
      <div className="px-6 py-5 bg-gray-50 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {data.user.name}
        </h2>

        <div className="space-y-2 text-gray-700">
          <div className="flex items-center gap-2">
            <MdEmail className="text-gray-500" size={18} />
            <span className="text-sm">{data.user.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaPhone className="text-gray-500" size={16} />
            <span className="text-sm">{data.user.mobile}</span>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" size={16} />
            <p className="text-sm text-gray-700">{data.deliveryAddress.text}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-6">
            Lat: {data.deliveryAddress.latitude}, Lon: {data.deliveryAddress.longitude}
          </p>
        </div>
      </div>

      {/* Shop Orders - Only show owner's shop orders */}
      <div className="px-6 py-5">
        {myShopOrders.map((shopOrder) => (
          <div key={shopOrder._id} className="space-y-4">
            {/* Items in Card Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shopOrder.shopOrderItems.map((orderItem) => (
                <div
                  key={orderItem._id}
                  className="border-2 border-gray-300 rounded-xl p-3 flex flex-col"
                >
                  {/* Item Image - with null check */}
                  {orderItem.item?.image ? (
                    <img
                      src={orderItem.item.image}
                      alt={orderItem.name}
                      className="w-full h-36 object-cover rounded-lg mb-3"
                    />
                  ) : (
                    <div className="w-full h-36 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}

                  {/* Item Details */}
                  <h4 className="font-bold text-gray-800 mb-1">
                    {orderItem.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Qty: {orderItem.quantity} x ₹{orderItem.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Status & Total Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-200">
              {/* Status Dropdown */}
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">status:</span>
                <select
                  value={statuses[shopOrder._id] || shopOrder.status}
                  onChange={(e) => handleStatusChange(shopOrder._id, e.target.value)}
                  className={`${getStatusColor(
                    statuses[shopOrder._id] || shopOrder.status
                  )} font-semibold border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer capitalize`}
                >
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="out of delivery">Out Of Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              {/* Total */}
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">
                  Total: ₹{shopOrder.subtotal}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerOrderCard;