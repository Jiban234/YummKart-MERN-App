// import { FaLocationDot } from "react-icons/fa6";
// import { IoIosSearch } from "react-icons/io";
// import { FiShoppingCart } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { RxCross2 } from "react-icons/rx";
// import { serverUrl } from "../App";
// import { setUserData } from "../redux/userSlice";
// import { LuPlus } from "react-icons/lu";
// import { TbReceiptRupee } from "react-icons/tb";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { userData, currentCity, cartItems, totalQuantity } = useSelector(
//     (state) => state.user
//   );
//   const { myShopData } = useSelector((state) => state.owner);
//   const [showPopUp, setShowPopUp] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogOut = async () => {
//     try {
//       const result = await axios.get(`${serverUrl}/api/auth/signout`, {
//         withCredentials: true,
//       });
//       dispatch(setUserData(null));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
//       {/* Logo */}

//       {/* for small devices */}
//       {showSearch && userData.role === "user" && (
//         <div className="w-[90%]  h-[70px] bg-white shadow-xl rounded-lg flex fixed items-center gap-[20px] px-4 top-[80px] left-[5%] md:hidden">
//           {/* City */}
//           <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
//             <FaLocationDot size={25} className="text-[#ff4d2d]" />
//             <div className="w-[80%] truncate text-gray-600">{currentCity}</div>
//           </div>
//           {/* Search */}
//           <div className="w-[80%] flex items-center gap-[10px]">
//             <IoIosSearch size={25} className="text-[#ff4d2d]" />
//             <input
//               type="text"
//               placeholder="search delicious food..."
//               className="px-[10px] text-gray-700 outline-0 w-full "
//             />
//           </div>
//         </div>
//       )}

//       {/* larger devices */}

//       <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">YummKart</h1>
//       {userData.role === "user" && (
//         // searchbar
//         <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg hidden md:flex items-center gap-[20px] px-4">
//           {/* City */}
//           <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
//             <FaLocationDot size={25} className="text-[#ff4d2d]" />
//             <div className="w-[80%] truncate text-gray-600">{currentCity}</div>
//           </div>
//           {/* Search */}
//           <div className="w-[80%] flex items-center gap-[10px]">
//             <IoIosSearch size={25} className="text-[#ff4d2d]" />
//             <input
//               type="text"
//               placeholder="search delicious food..."
//               className="px-[10px] text-gray-700 outline-0 w-full "
//             />
//           </div>
//         </div>
//       )}

//       {/* for smaller devices */}
//       <div className="flex items-center gap-4">
//         {userData.role === "user" &&
//           (showSearch ? (
//             <RxCross2
//               size={25}
//               className="text-[#ff4d2d] md:hidden"
//               onClick={() => setShowSearch(false)}
//             />
//           ) : (
//             <IoIosSearch
//               size={25}
//               className="text-[#ff4d2d] md:hidden"
//               onClick={() => setShowSearch(true)}
//             />
//           ))}

//         {/* Add Item div - for owner  & Cart and My Orders div- for user*/}
//         {userData.role === "owner" ? (
//           <div className="flex justify-center gap-2">
//             {/* "Add Shop Item" button will only be visible if myShopData exists */}
//             {myShopData && (
//               <>
//                 <button
//                   onClick={() => navigate("/add-item")}
//                   className="hidden md:flex items-center gap-1 bg-[#ff4d2d]/10 text-[#ff4d2d] p-2 rounded-full font-medium hover:bg-[#ff4d2d]/20 shadow-md transition-all duration-200"
//                 >
//                   <LuPlus size={18} />
//                   <span>Add Food Items</span>
//                 </button>

//                 <button
//                   onClick={() => navigate("/add-item")}
//                   className="md:hidden flex items-center  bg-[#ff4d2d]/10 text-[#ff4d2d] p-2 rounded-full font-medium hover:bg-[#ff4d2d]/20 shadow-md transition-all duration-200"
//                 >
//                   <LuPlus size={18} />
//                 </button>
//               </>
//             )}

//             {/* for pending orders - for owner*/}
//             <div
//               onClick={() => navigate("/my-orders")}
//               className="flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium"
//             >
//               <TbReceiptRupee size={20} />
//               <span className="hidden md:block">Pending Orders </span>
//               <span className="absolute -right-2 -top-2 text-xs font-bold text-white rounded-full bg-[#ff4d2d] px-[6px] py-[1px]">
//                 0
//               </span>
//             </div>
//           </div>
//         ) : (
//           <div className="flex gap-2">
//             {userData.role === "user" && (
//               <div
//                 className="relative cursor-pointer flex items-center justify-center"
//                 onClick={() => navigate("/cart")}
//               >
//                 <FiShoppingCart size={28} className="text-[#ff4d2d]" />
//                 <span className="absolute -right-2 -top-2 text-xs font-bold text-white rounded-full bg-[#ff4d2d] px-[6px] py-[1px]">
//                   {totalQuantity}
//                 </span>
//               </div>
//             )}

//             <button
//               className="hidden md:block px-4 py-2 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium hover:bg-[#ff4d2d]/20 transition-all duration-200 cursor-pointer"
//               onClick={() => navigate("/my-orders")}
//             >
//               My Orders
//             </button>
//           </div>
//         )}

//         {/* profile logo */}
//         <div
//           className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-semibold text-lg uppercase border border-[#ff4d2d]/20 cursor-pointer hover:bg-[#ff4d2d]/20 shadow-md transition-all duration-200"
//           onClick={() => setShowPopUp((prev) => !prev)}
//         >
//           {userData?.fullName?.slice(0, 1)}
//         </div>

//         {/* pop up */}
//         {showPopUp && (
//           <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl p-[20px] flex flex-col gap-[10px] z-[9999] rounded-lg ">
//             <div className="text-[17px] font-semibold">{userData.fullName}</div>
//             {userData.role === "user" && (
//               <div
//                 className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer"
//                 onClick={() => navigate("/my-orders")}
//               >
//                 My Orders
//               </div>
//             )}

//             <div
//               className="text-[#ff4d2d] font-semibold cursor-pointer"
//               onClick={handleLogOut}
//             >
//               Log Out
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;




import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { serverUrl } from "../App";
import { setUserData, setSearchQuery, setSearchedShops, setSearchedItems, setIsSearching, clearSearch } from "../redux/userSlice";
import { LuPlus } from "react-icons/lu";
import { TbReceiptRupee } from "react-icons/tb";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { userData, currentCity, cartItems, totalQuantity, searchQuery } = useSelector(
    (state) => state.user
  );
  const { myShopData } = useSelector((state) => state.owner);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Sync local search with Redux
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Clear search when navigating away from home page
  useEffect(() => {
    if (location.pathname !== "/") {
      handleClearSearch();
    }
  }, [location.pathname]);

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  // Handle search with debouncing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (localSearchQuery.trim() !== "") {
        handleSearch(localSearchQuery);
      } else {
        handleClearSearch();
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [localSearchQuery]);

  const handleSearch = async (query) => {
    if (!query.trim() || !currentCity) return;

    try {
      dispatch(setIsSearching(true));
      const response = await axios.get(
        `${serverUrl}/api/search?query=${encodeURIComponent(query)}&city=${encodeURIComponent(currentCity)}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setSearchQuery(query));
        dispatch(setSearchedShops(response.data.shops || []));
        dispatch(setSearchedItems(response.data.items || []));
        
        // Navigate to home if not already there
        if (location.pathname !== "/") {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      dispatch(setIsSearching(false));
    }
  };

  const handleClearSearch = () => {
    setLocalSearchQuery("");
    dispatch(clearSearch());
  };

  const handleSearchInputChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      {/* for small devices */}
      {showSearch && userData.role === "user" && (
        <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg flex fixed items-center gap-[20px] px-4 top-[80px] left-[5%] md:hidden">
          {/* City */}
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{currentCity}</div>
          </div>
          {/* Search */}
          <div className="w-[80%] flex items-center gap-[10px] relative">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="px-[10px] text-gray-700 outline-0 w-full"
              value={localSearchQuery}
              onChange={handleSearchInputChange}
            />
            {localSearchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 text-gray-400 hover:text-[#ff4d2d]"
              >
                <RxCross2 size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Logo */}
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d] cursor-pointer" onClick={() => navigate("/")}>
        YummKart
      </h1>

      {/* larger devices */}
      {userData.role === "user" && (
        <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg hidden md:flex items-center gap-[20px] px-4">
          {/* City */}
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{currentCity}</div>
          </div>
          {/* Search */}
          <div className="w-[80%] flex items-center gap-[10px] relative">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="px-[10px] text-gray-700 outline-0 w-full"
              value={localSearchQuery}
              onChange={handleSearchInputChange}
            />
            {localSearchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 text-gray-400 hover:text-[#ff4d2d] transition-colors"
              >
                <RxCross2 size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* for smaller devices */}
      <div className="flex items-center gap-4">
        {userData.role === "user" &&
          (showSearch ? (
            <RxCross2
              size={25}
              className="text-[#ff4d2d] md:hidden cursor-pointer"
              onClick={() => {
                setShowSearch(false);
                handleClearSearch();
              }}
            />
          ) : (
            <IoIosSearch
              size={25}
              className="text-[#ff4d2d] md:hidden cursor-pointer"
              onClick={() => setShowSearch(true)}
            />
          ))}

        {/* Add Item div - for owner & Cart and My Orders div - for user */}
        {userData.role === "owner" ? (
          <div className="flex justify-center gap-2">
            {myShopData && (
              <>
                <button
                  onClick={() => navigate("/add-item")}
                  className="hidden md:flex items-center gap-1 bg-[#ff4d2d]/10 text-[#ff4d2d] p-2 rounded-full font-medium hover:bg-[#ff4d2d]/20 shadow-md transition-all duration-200"
                >
                  <LuPlus size={18} />
                  <span>Add Food Items</span>
                </button>

                <button
                  onClick={() => navigate("/add-item")}
                  className="md:hidden flex items-center bg-[#ff4d2d]/10 text-[#ff4d2d] p-2 rounded-full font-medium hover:bg-[#ff4d2d]/20 shadow-md transition-all duration-200"
                >
                  <LuPlus size={18} />
                </button>
              </>
            )}

            <div
              onClick={() => navigate("/my-orders")}
              className="flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium"
            >
              <TbReceiptRupee size={20} />
              <span className="hidden md:block">Pending Orders</span>
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white rounded-full bg-[#ff4d2d] px-[6px] py-[1px]">
                0
              </span>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            {userData.role === "user" && (
              <div
                className="relative cursor-pointer flex items-center justify-center"
                onClick={() => navigate("/cart")}
              >
                <FiShoppingCart size={28} className="text-[#ff4d2d]" />
                <span className="absolute -right-2 -top-2 text-xs font-bold text-white rounded-full bg-[#ff4d2d] px-[6px] py-[1px]">
                  {totalQuantity}
                </span>
              </div>
            )}

            <button
              className="hidden md:block px-4 py-2 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium hover:bg-[#ff4d2d]/20 transition-all duration-200 cursor-pointer"
              onClick={() => navigate("/my-orders")}
            >
              My Orders
            </button>
          </div>
        )}

        {/* profile logo */}
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-semibold text-lg uppercase border border-[#ff4d2d]/20 cursor-pointer hover:bg-[#ff4d2d]/20 shadow-md transition-all duration-200"
          onClick={() => setShowPopUp((prev) => !prev)}
        >
          {userData?.fullName?.slice(0, 1)}
        </div>

        {/* pop up */}
        {showPopUp && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl p-[20px] flex flex-col gap-[10px] z-[9999] rounded-lg">
            <div className="text-[17px] font-semibold">{userData.fullName}</div>
            {userData.role === "user" && (
              <div
                className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer"
                onClick={() => navigate("/my-orders")}
              >
                My Orders
              </div>
            )}

            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleLogOut}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;