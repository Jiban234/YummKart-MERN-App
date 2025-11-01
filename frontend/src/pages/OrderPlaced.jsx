import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const OrderPlaced = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F3] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full animate-fadeIn">

        {/* Animated Success Icon */}
        <FaCircleCheck
          className="text-green-500 mx-auto mb-6 animate-pop"
          size={80}
        />

        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Order Placed!
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed">
          Thank you for your purchase. Your order is being prepared.
          Track your order status in the <span className="font-medium">"My Orders"</span> section.
        </p>

        <button className="mt-7 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-all duration-300"
        onClick={()=>navigate("/my-orders")}>
          Back to my orders
        </button>
      </div>
    </div>
  );
};

export default OrderPlaced;
