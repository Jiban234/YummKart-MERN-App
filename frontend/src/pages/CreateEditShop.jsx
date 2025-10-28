import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/ownerSlice";
import { ClipLoader } from "react-spinners";

const CreateEditShop = () => {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState(myShopData?.name || "");
  const [address, setAddress] = useState(myShopData?.address || currentAddress);
  const [cityValue, setCityValue] = useState(myShopData?.city || currentCity);
  const [stateValue, setStateValue] = useState(
    myShopData?.state || currentState
  );
  const [frontEndImage, setFrontEndImage] = useState(myShopData?.image || null);
  const [backEndImage, setBackEndImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", cityValue);
      formData.append("state", stateValue);
      formData.append("address", address);

      // Only append image if a new one was selected
      if (backEndImage) {
        formData.append("image", backEndImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/shop/create-edit-shop`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Update Redux store with the shop data from response
      dispatch(setMyShopData(result.data.shop));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBackEndImage(file);
    setFrontEndImage(URL.createObjectURL(file));
  };

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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onChange={handleImageChange}
              placeholder="choose file"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] focus:border-transparent text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#ff4d2d] hover:file:bg-orange-100"
            />
          </div>

          {/* Image Preview */}
          {frontEndImage && (
            <div className="mt-4">
              <img
                src={frontEndImage}
                alt="Restaurant Preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}

          {/* City and State Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                // name="city"
                value={cityValue}
                onChange={(e) => setCityValue(e.target.value)}
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
                value={stateValue}
                onChange={(e) => setStateValue(e.target.value)}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] focus:border-transparent"
              required
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[#ff4d2d] hover:bg-[#e63e1e] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 mt-6"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditShop;
