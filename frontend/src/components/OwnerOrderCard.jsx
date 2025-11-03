import React, { useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { updateStatus } from "../redux/userSlice";

const OwnerOrderCard = ({ data }) => {
  const dispatch = useDispatch();

  // No need to filter - backend already returns only owner's shop orders
  // If shopOrders is empty, don't render
  if (!data.shopOrders || data.shopOrders.length === 0) return null;

  const handleStatusChange = async (orderId, shopId, newStatus) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      dispatch(updateStatus({ orderId, shopId, status: newStatus }));
    } catch (error) {
      console.error("Status update error:", error);
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
          {data.user.fullName}
        </h2>
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center gap-2">
            <MdEmail className="text-gray-500" size={18} />
            <span className="text-sm">{data.user.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-gray-500" size={16} />
            <span className="text-sm">{data.user.mobile}</span>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt
              className="text-red-500 mt-1 flex-shrink-0"
              size={16}
            />
            <p className="text-sm text-gray-700">{data.deliveryAddress.text}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-6">
            Lat: {data.deliveryAddress.latitude}, Lon:{" "}
            {data.deliveryAddress.longitude}
          </p>
        </div>
      </div>

      {/* Shop Orders - Backend already filtered to owner's shop orders */}
      <div className="px-6 py-5">
        {data.shopOrders.map((shopOrder) => (
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
              {/* Status Dropdown or Display */}
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">status:</span>
                {/* ✅ Always show status text */}
                <span
                  className={`${getStatusColor(
                    shopOrder.status
                  )} font-semibold capitalize text-lg`}
                >
                  {shopOrder.status}
                </span>
                {/* If already delivered, just show it (no dropdown) */}
                {shopOrder.status === "delivered" ? (
                  <span className="text-green-600 font-semibold capitalize">
                    Delivered
                  </span>
                ) : (
                  <select
                    defaultValue=""
                    onChange={(e) =>
                      handleStatusChange(
                        data._id,
                        shopOrder.shop._id,
                        e.target.value
                      )
                    }
                    className={`${getStatusColor(
                      shopOrder.status
                    )} font-semibold border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer capitalize`}
                  >
                    <option value="" disabled>Change Status</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="out of delivery">Out Of Delivery</option>
                    {/* Delivered option removed - owner can't mark as delivered */}
                  </select>
                )}
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
