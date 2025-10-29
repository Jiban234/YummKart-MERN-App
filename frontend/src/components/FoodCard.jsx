import React, { useState } from "react";
import { FaStar, FaPlus, FaMinus, FaRegStar } from "react-icons/fa6";
import { FaLeaf, FaDrumstickBite } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";

const FoodCard = ({ data }) => {
  const [quantity, setQuantity] = useState(0);

  // renderStars - Fixed: Added key prop
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i}>
          {i <= rating ? (
            <FaStar className="text-yellow-500 text-lg" />
          ) : (
            <FaRegStar className="text-yellow-500 text-lg" />
          )}
        </span>
      );
    }
    return stars;
  };

  // handlers
  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity(Math.max(0, quantity - 1));
  };

//   const handleAddToCart = () => {
    
//   };

  return (
    <div className="w-[250px] bg-white border-2 border-[#ff4d2d] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
        {/* Veg/Non-Veg Indicator */}
        <div className="absolute top-3 left-3 bg-white rounded-full p-1 shadow">
          {data.foodType === "veg" ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-lg" />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {data.name}
        </h3>

        {/* Shop Name (optional) */}
        <p className="text-xs text-gray-500 mt-1 truncate">
          {data.shop?.name || "Restaurant"}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {renderStars(Math.round(data.rating?.average || 0))}
          <span className="text-sm text-gray-700 font-medium ml-1">
            ({data.rating?.count || 0})
          </span>
        </div>

        {/* Price and Add Button */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-800">₹{data.price}</span>

          {quantity === 0 ? (
            <button
              onClick={() => setQuantity(1)}
              className="bg-[#ff4d2d] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#e63e1f] transition-all duration-200 hover:scale-105 flex items-center gap-2 shadow-md"
            >
              <FaPlus className="w-3 h-3" />
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-[#ff4d2d] rounded-lg px-2 py-1.5 shadow-md">
                <button
                  onClick={handleQuantityDecrease}
                  className="text-white hover:bg-[#e63e1f] rounded p-1.5 transition-all duration-200 hover:scale-110"
                >
                  <FaMinus className="w-3 h-3" />
                </button>
                <span className="text-white font-semibold w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleQuantityIncrease}
                  className="text-white hover:bg-[#e63e1f] rounded p-1.5 transition-all duration-200 hover:scale-110"
                >
                  <FaPlus className="w-3 h-3" />
                </button>
              </div>

              {/* Cart Button */}
              <button
                // onClick={handleAddToCart}
                className="relative bg-green-600 hover:bg-green-700 text-white rounded-lg p-2.5 transition-all duration-200 hover:scale-110 shadow-md group"
                title="Add to cart"
              >
                <LuShoppingCart className="w-5 h-5" />

                {/* Animated pulse on hover */}
                <span className="absolute inset-0 rounded-lg bg-green-400 opacity-0 group-hover:opacity-30 group-hover:animate-ping"></span>

                {/* Badge showing if item is in cart */}
                {/* {cartItem && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    ✓
                  </span>
                )} */}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;