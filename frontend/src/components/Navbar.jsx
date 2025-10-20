import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const [showPopUp,setShowPopUp] = useState(false);
  const [showSearch,setShowSearch] = useState(false);

  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      {/* Logo */}
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">YummKart</h1>
      {/* Search bar */}
      <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg hidden md:flex items-center gap-[20px] px-4">
        {/* Location */}
        <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
          <FaLocationDot size={25} className="text-[#ff4d2d]" />
          <div className="w-[80%] truncate text-gray-600">Balasore</div>
        </div>
        {/* Search */}
        <div className="w-[80%] flex items-center gap-[10px]">
          <IoIosSearch size={25} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="search delicious food..."
            className="px-[10px] text-gray-700 outline-0 w-full "
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <IoIosSearch size={25} className="text-[#ff4d2d] md:hidden" />
        {/* Cart */}
        <div className="relative cursor-pointer flex items-center justify-center">
          <FiShoppingCart size={28} className="text-[#ff4d2d]" />
          <span className="absolute -top-3 -right-3 text-[#ff4d2d] text-[15px] font-medium w-[18px] h-[18px] flex items-center justify-center rounded-full">
            0
          </span>
        </div>

        <button className="hidden md:block px-4 py-2 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium hover:bg-[#ff4d2d]/20 transition-all duration-200">
          My Orders
        </button>

        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-semibold text-lg uppercase shadow-sm border border-[#ff4d2d]/20"
        onClick={()=>setShowPopUp(prev=>!prev)}>
          {userData?.fullName?.slice(0, 1)}
        </div>
        {/* pop up */}
        {showPopUp && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] 1g:right-[25%] w-[180px] bg-white shadow-2xl rounded-x1 p-[20px] flex flex-col gap-[10px] z-[9999] rounded-lg">
            <div className="text-[17px] font-semibold">
              {userData.fullName}
            </div>
            <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">
              My Orders
            </div>
            <div className="text-[#ff4d2d] font-semibold cursor-pointer">
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
