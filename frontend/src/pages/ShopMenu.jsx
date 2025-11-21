import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";

const ShopMenu = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleShop = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${serverUrl}/api/item/get-items-by-shop/${shopId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data)
      setShop(response.data.shop);
      setItems(response.data.items);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleShop();
  }, [shopId]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#fff9f6]">
        <div className="text-2xl font-semibold text-[#ff4d2d]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-[#fff9f6] overflow-y-auto pb-10">
      <Navbar />

      {/* Shop Header with Background Image */}
      <div className="w-full max-w-6xl relative">
        <div className="w-full h-[300px] relative rounded-2xl overflow-hidden shadow-xl">
          <img
            src={shop?.image}
            alt={shop?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          >
            <FaArrowLeft className="text-xl" />
          </button>

          {/* Shop Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{shop?.name}</h1>
            <div className="flex items-center gap-2 text-lg">
              <FaMapMarkerAlt />
              <span>{shop?.city}, {shop?.state}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px] mt-8">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-gray-800 text-2xl sm:text-3xl flex items-center gap-3">
            🍽️ Our Menu
          </h1>
          <span className="text-gray-600 font-medium">
            {items?.length} item{items?.length !== 1 ? 's' : ''} available
          </span>
        </div>

        {items?.length > 0 ? (
          <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center">
            {items.map((item, index) => (
              <FoodCard key={item._id || index} data={item} />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No items available</h2>
            <p className="text-gray-500 mb-4">This restaurant hasn't added any items yet</p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#ff4d2d] hover:bg-[#e63e1f] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Browse Other Restaurants
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopMenu;