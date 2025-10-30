import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaLeaf, FaDrumstickBite } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/userSlice";

const CartItemCard = ({ data }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(
      addToCart({
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image,
        shop: data.shop,
        quantity: 1,
        foodType: data.foodType,
      })
    );
  };

  const handleDecrease = () => {
    dispatch(
      addToCart({
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image,
        shop: data.shop,
        quantity: -1,
        foodType: data.foodType,
      })
    );
  };

  const handleRemove = () => {
    dispatch(removeFromCart(data.id));
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 mb-4 border-2 border-gray-100">
      <div className="flex items-center gap-4">
        {/* Image Section */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover rounded-xl"
          />
          {/* Veg/Non-Veg Indicator */}
          <div className="absolute -top-2 -left-2 bg-white rounded-full p-1.5 shadow-md border border-gray-200">
            {data.foodType === "veg" ? (
              <FaLeaf className="text-green-600 text-sm" />
            ) : (
              <FaDrumstickBite className="text-red-600 text-sm" />
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{data.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            ₹{data.price} x {data.quantity}
          </p>
          <p className="text-lg font-bold text-gray-800 mt-1">
            ₹{data.price * data.quantity}
          </p>
        </div>

        {/* Controls Section */}
        <div className="flex items-center gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-xl px-3 py-2 shadow-sm">
            <button
              onClick={handleDecrease}
              className="text-gray-700 hover:text-[#ff4d2d] transition-colors cursor-pointer"
            >
              <FaMinus className="w-4 h-4" />
            </button>
            <span className="font-bold text-gray-800 w-8 text-center text-lg">
              {data.quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="text-gray-700 hover:text-[#ff4d2d] transition-colors cursor-pointer"
            >
              <FaPlus className="w-4 h-4" />
            </button>
          </div>

          {/* Delete Button */}
          <button
            onClick={handleRemove}
            className="bg-red-50 hover:bg-red-100 text-red-500 p-3 rounded-xl transition-all duration-200 hover:scale-105 cursor-pointer"
            title="Remove item"
          >
            <RiDeleteBin6Line className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;