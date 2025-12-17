import React from "react";
import { useNavigate } from "react-router-dom";

const UserOrderCard = ({ data }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
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
      {/* Order Header */}
      <div className="px-6 py-4 flex justify-between items-start border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            order #{data._id.slice(-6)}
          </h2>
          <p className="text-sm text-gray-600">
            Date: {formatDate(data.createdAt)}
          </p>
        </div>
        <div className="text-right flex flex-col items-end gap-1">
  {data.paymentMethod === "online" ? (
    <>
      <p className="text-sm text-gray-600 uppercase font-semibold">
        Payment Method: Online
      </p>

      <span
        className={`px-2 py-0.5 rounded-full text-xs font-semibold
          ${
            data.payment
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
      >
        {data.payment ? "Paid" : "Unpaid"}
      </span>
    </>
  ) : (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
      COD
    </span>
  )}
</div>

      </div>

      {/* Shop Orders */}
      <div className="px-6 py-4 space-y-6">
        {data.shopOrders.map((shopOrder,index) => (
          <div key={index} className="space-y-4 bg-amber-50 p-5">
            {/* Shop Name */}
            <h3 className="text-xl font-bold text-gray-800">
              {shopOrder.shop.name}
            </h3>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {shopOrder.shopOrderItems.map((orderItem,index) => (
                <div
                  key={index}
                  className="border-2 border-gray-300 rounded-xl p-3 flex flex-col items-center"
                >
                  {/* Item Image */}
                  <img
                    src={orderItem.item.image}
                    alt={orderItem.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />

                  {/* Item Details */}
                  <h4 className="font-bold text-gray-800 text-center mb-1">
                    {orderItem.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Qty: {orderItem.quantity} x ₹{orderItem.price}
                  </p>
                </div>
              ))}
            </div>

            
  {/* Divider before subtotal */}
  <hr className="border-t border-gray-500 my-4" />

            {/* Subtotal & Status */}
            <div className="flex justify-between items-center pt-2 pb-2">
              <p className="text-lg font-bold text-gray-800">
                Subtotal: {shopOrder.subtotal}
              </p>
              <p className={`font-semibold ${getStatusColor(shopOrder.status)}`}>
                {shopOrder.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      
  {/* Divider before subtotal */}
  <hr className="border-t border-gray-500 my-4" />
      

      {/* Footer - Total & Track Button */}
      <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
        <p className="text-xl font-bold text-gray-800">
          Total: ₹{data.totalAmount}
        </p>
        <button
        onClick={()=>navigate(`/track-order/${data._id}`)} 
        className="bg-[#ff4d2d] hover:bg-[#e64526] text-white font-semibold px-8 py-2.5 rounded-lg transition-colors">
          Track Order
        </button>
      </div>
    </div>
  );
};

export default UserOrderCard;