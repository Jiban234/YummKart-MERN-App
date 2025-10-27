import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { FaUtensils, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fff9f6] items-center">
      <Navbar />
      {/* show if myShopData is not available */}
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
                Join our food delivery platform and reach thousands of hungry
                customers everyday
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

      {/* show if myShopData is available */}
      {myShopData && (
        <div className="w-full max-w-6xl p-4 sm:p-6 space-y-6">
          {/* Welcome Message */}
          <div className="flex justify-center items-center py-6 gap-3">
            <FaUtensils className="text-2xl w-14 h-10 text-orange-500" />
            <h1 className="text-2xl md:text-2xl font-bold text-gray-800">
              Welcome to{" "}
              <span className="text-orange-500">{myShopData.name}</span>
            </h1>
          </div>

          {/* Restaurant Card */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl">
            <div className="flex flex-col">
              {/* Restaurant Image */}
              <div className="w-full h-64 relative">
                {myShopData.image ? (
                  <img
                    src={myShopData.image}
                    alt={myShopData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <FaUtensils className="text-6xl text-orange-500" />
                  </div>
                )}
              </div>

              {/* Restaurant Details */}
              <div className="p-6 space-y-4 relative">
                {/* Edit Button */}
                <button
                  onClick={() => navigate("/create-edit-shop")}
                  className="absolute top-4 right-4 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>

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


          {/*  */}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
