import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate()
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fff9f6] items-center">
      <Navbar />
      {!myShopData && (
        <div className="flex justify-center items-center p-4 sm:p-6 flex-1">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <FaUtensils className="text-2xl text-orange-500" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                Add Your Restaurant
              </h2>
              <p className="text-gray-600">
                Join our food delivery platforn and reach thousands of hungry customers everyday
              </p>

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
    </div>
  );
};

export default OwnerDashboard;
