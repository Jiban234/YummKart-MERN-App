import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { useState } from "react";

const CreateEditShop = () => {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);  
  const { city, state } = useSelector((state) => state.owner);
  const [name,setName] = useState(myShopData.name || "");
  const [address,setAddress] = useState(myShopData?.address || "");
  const [City,setCity] = useState(myShopData?.city || city);
  const [State,setState] = useState(myShopData?.state || "");
  
  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen ">
      <div
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px]"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
      </div>

      <div
        className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border
border-orange-100"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
            <FaUtensils className="text-2xl text-[#ff4d2d]" />
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {myShopData ? "Edit Restaurant" : "Add Restaurant"}
          </div>
        </div>
        <form 
        // onSubmit={handleSubmit} 
        className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
            //   name="name"
            //   value={formData.name}
            //   onChange={handleChange}
              placeholder="Enter Restaurant Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] focus:border-transparent"
              required
            />
          </div>

          {/* Shop Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Restaurant Image
            </label>
            <input
              type="file"
              accept="image/*"
            //   onChange={handleImageChange}
            placeholder="choose file"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] focus:border-transparent text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#ff4d2d] hover:file:bg-orange-100"
            />
          </div>

          {/* Image Preview */}
          {/* {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Shop Preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )} */}

          {/* City and State Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                // name="city"
                // value={formData.city}
                // onChange={handleChange}
                placeholder="city"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                // name="state"
                // value={formData.state}
                // onChange={handleChange}
                placeholder="state"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
            //   name="address"
            //   value={formData.address}
            //   onChange={handleChange}
              placeholder="Enter address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] focus:border-transparent"
              required
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[#ff4d2d] hover:bg-[#e63e1e] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 mt-6"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditShop;
