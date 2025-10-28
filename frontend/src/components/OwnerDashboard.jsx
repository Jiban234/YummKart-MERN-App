import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { FaUtensils, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OwnerItemCard from "./OwnerItemCard"; // Import the new component

const OwnerDashboard = () => {
  // Accessing shop data (myShopData) from Redux store
  const { myShopData } = useSelector((state) => state.owner);

  // useNavigate hook to navigate between pages (React Router)
  const navigate = useNavigate();
  
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fff9f6] items-center">
      {/* Global navigation bar */}
      <Navbar />
      
      {/* -------------------- CASE 1: When shop data doesn't exist -------------------- */}
      {!myShopData && (
        <div className="flex justify-center items-center p-4 sm:p-6 flex-1">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center space-y-4">
              {/* Restaurant icon inside a circular background */}
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <FaUtensils className="text-2xl text-orange-500" />
              </div>

              {/* Message shown when no restaurant is created */}
              <h2 className="text-2xl font-bold text-gray-800">
                Add Your Restaurant
              </h2>
              <p className="text-gray-600">
                Join our food delivery platform and reach thousands of hungry
                customers everyday
              </p>

              {/* Button to navigate to restaurant creation page */}
              <button
                onClick={() => navigate("/create-edit-shop")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Create Restaurant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- CASE 2: When shop data exists -------------------- */}
      {myShopData && (
        <div className="w-full max-w-6xl p-4 sm:p-6 space-y-6">
          {/* Welcome header showing restaurant name */}
          <div className="flex justify-center items-center py-6 gap-3">
            <FaUtensils className="text-2xl w-14 h-10 text-orange-500" />
            <h1 className="text-2xl md:text-2xl font-bold text-gray-800">
              Welcome to{" "}
              <span className="text-orange-500">{myShopData.name}</span>
            </h1>
          </div>

          {/* -------------------- Restaurant Card -------------------- */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl">
            <div className="flex flex-col">
              {/* Restaurant image section */}
              <div className="w-full h-64 relative">
                {myShopData.image ? (
                  // Display restaurant image if available
                  <img
                    src={myShopData.image}
                    alt={myShopData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // Fallback placeholder if image not provided
                  <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <FaUtensils className="text-6xl text-orange-500" />
                  </div>
                )}
              </div>

              {/* Restaurant details section */}
              <div className="p-6 space-y-4 relative">
                {/* Edit button positioned on top-right to allow restaurant edits */}
                <button
                  onClick={() => navigate("/create-edit-shop")}
                  className="absolute top-4 right-4 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>

                {/* Displaying restaurant info like name, address, city, state */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {myShopData.name}
                  </h2>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-start gap-2">
                      <span className="font-semibold text-gray-700 min-w-[80px]">
                        Address:
                      </span>
                      <span>{myShopData.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700 min-w-[80px]">
                        City:
                      </span>
                      <span>{myShopData.city}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700 min-w-[80px]">
                        State:
                      </span>
                      <span>{myShopData.state}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------- Menu Items Section -------------------- */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Menu Items</h2>

              {/* Show "Add Item" button only if there are already menu items */}
              {myShopData.items && myShopData.items.length > 0 && (
                <button
                  onClick={() => navigate("/add-item")}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Add Item
                </button>
              )}
            </div>

            {/* If menu items exist, render all using OwnerItemCard */}
            {myShopData.items && myShopData.items.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {myShopData.items.map((item) => (
                  <OwnerItemCard key={item._id} item={item} />
                ))}
              </div>
            ) : (
              // Fallback message when there are no items
              <div className="text-center py-1">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUtensils className="text-5xl text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No menu items yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start building your menu by adding your first dish
                </p>
                {/* Button to navigate to Add Item page */}
                <button
                  onClick={() => navigate("/add-item")}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
                >
                  Add Your First Item
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
