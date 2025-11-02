import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaPlus, FaMinus, FaRegStar } from "react-icons/fa6";
import { FaLeaf, FaDrumstickBite } from "react-icons/fa";
import { addToCart } from "../redux/userSlice";

const FoodCard = ({ data }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);

  // Find if this item already exists in cart
  const existingCartItem = cartItems.find((item) => item.id === data._id);
  const [quantity, setQuantity] = useState(existingCartItem?.quantity || 0);

  // Sync quantity with cart when cart changes
  useEffect(() => {
    if (existingCartItem) {
      setQuantity(existingCartItem.quantity);
    } else {
      setQuantity(0);
    }
  }, [existingCartItem]);

  // renderStars
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

  // Handlers - Automatically update cart on quantity change
  const handleQuantityIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    
    dispatch(
      addToCart({
        id: data._id,
        name: data.name,
        price: data.price,
        image: data.image,
        shop: data.shop,
        quantity: 1, // Add 1 to existing quantity
        foodType: data.foodType,
      })
    );
  };

  const handleQuantityDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      dispatch(
        addToCart({
          id: data._id,
          name: data.name,
          price: data.price,
          image: data.image,
          shop: data.shop,
          quantity: -1, // Subtract 1 from existing quantity
          foodType: data.foodType,
        })
      );
    }
  };

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
        <div className="absolute top-3 left-3 bg-white rounded-full p-1.5 shadow-md">
          {data.foodType === "veg" ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-lg" />
          )}
        </div>

        {/* Quantity Badge on Image */}
        {quantity > 0 && (
          <div className="absolute top-3 right-3 bg-[#ff4d2d] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg animate-bounce">
            {quantity}  
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {data.name}
          </h3>

          {/* Shop Name */}
          <p className="text-xs font-bold text-gray-500 mt-1 truncate">
            {data.shop?.name || "Restaurant"}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {renderStars(Math.round(data.rating?.average || 0))}
            <span className="text-sm text-gray-700 font-medium ml-1">
              ({data.rating?.count || 0})
            </span>
          </div>
        </div>

        {/* Price and Add Button */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-800">₹{data.price}</span>

          {quantity === 0 ? (
            <button
              onClick={handleQuantityIncrease}
              className="bg-[#ff4d2d] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#e63e1f] transition-all duration-200 hover:scale-105 flex items-center gap-2 shadow-md"
            >
              <FaPlus className="w-3 h-3" />
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-[#ff4d2d] rounded-lg px-3 py-2 shadow-md">
              <button
                onClick={handleQuantityDecrease}
                className="text-white hover:bg-[#e63e1f] rounded p-1.5 transition-all duration-200 hover:scale-110"
              >
                <FaMinus className="w-3 h-3" />
              </button>
              <span className="text-white font-semibold w-8 text-center text-lg">
                {quantity}
              </span>
              <button
                onClick={handleQuantityIncrease}
                className="text-white hover:bg-[#e63e1f] rounded p-1.5 transition-all duration-200 hover:scale-110"
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;