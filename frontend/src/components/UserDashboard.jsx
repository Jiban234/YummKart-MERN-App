// import { categories } from "../category";
// import CategoryCard from "./CategoryCard";
// import Navbar from "./Navbar";
// import { FaCircleChevronLeft } from "react-icons/fa6";
// import { FaCircleChevronRight, FaFilter, FaXmark } from "react-icons/fa6";
// import { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import FoodCard from "./FoodCard";
// import { useNavigate } from "react-router-dom";


// const UserDashboard = () => {
//   const { currentCity, shopInMyCity, itemInMyCity } = useSelector(
//     (state) => state.user
//   );
//   const categoryScrollRef = useRef(null);
//   const shopScrollRef = useRef(null);
//   const navigate = useNavigate();

//   const [showCategoryRefLeftButton, setShowCategoryRefLeftButton] =
//     useState(false);
//   const [showCategoryRefRightButton, setShowCategoryRefRightButton] =
//     useState(false);
//   const [showShopRefLeftButton, setShowShopRefLeftButton] = useState(false);
//   const [showShopRefRightButton, setShowShopRefRightButton] = useState(false);

//   // Filter states
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedShops, setSelectedShops] = useState([]);
//   const [filteredItems, setFilteredItems] = useState(itemInMyCity);

//   // Filter logic
//   useEffect(() => {
//     let result = itemInMyCity;

//     // If no filters selected, show all
//     if (selectedCategories.length === 0 && selectedShops.length === 0) {
//       setFilteredItems(itemInMyCity);
//       return;
//     }

//     // Apply category filter
//     if (selectedCategories.length > 0) {
//       result = result.filter((item) =>
//         selectedCategories.includes(item.category)
//       );
//     }

//     // Apply shop filter
//     if (selectedShops.length > 0) {
//       result = result.filter((item) => selectedShops.includes(item.shop._id));
//     }

//     setFilteredItems(result);
//   }, [selectedCategories, selectedShops, itemInMyCity]);

//   // Category click handler
//   const handleCategoryClick = (category) => {
//     if (category === "All") {
//       setSelectedCategories([]);
//     } else {
//       setSelectedCategories((prev) => {
//         if (prev.includes(category)) {
//           return prev.filter((c) => c !== category);
//         } else {
//           return [...prev, category];
//         }
//       });
//     }
//   };

//   // Shop click handler
//   const handleShopClick = (shopId) => {
//     setSelectedShops((prev) => {
//       if (prev.includes(shopId)) {
//         return prev.filter((s) => s !== shopId);
//       } else {
//         return [...prev, shopId];
//       }
//     });
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSelectedCategories([]);
//     setSelectedShops([]);
//   };

//   // Active filter count
//   const activeFilterCount = selectedCategories.length + selectedShops.length;

//   const updateButton = (ref, setLeftButton, setRightButton) => {
//     const element = ref.current;
//     if (element) {
//       setLeftButton(element.scrollLeft > 0);
//       setRightButton(
//         element.scrollLeft + element.clientWidth < element.scrollWidth
//       );
//     }
//   };

//   const scrollHandler = (ref, direction) => {
//     if (ref.current) {
//       const scrollAmount = 300;
//       ref.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   useEffect(() => {
//     const cateElement = categoryScrollRef?.current;
//     const shopElement = shopScrollRef?.current;

//     updateButton(
//       categoryScrollRef,
//       setShowCategoryRefLeftButton,
//       setShowCategoryRefRightButton
//     );
//     updateButton(
//       shopScrollRef,
//       setShowShopRefLeftButton,
//       setShowShopRefRightButton
//     );

//     const handleScroll = () => {
//       updateButton(
//         categoryScrollRef,
//         setShowCategoryRefLeftButton,
//         setShowCategoryRefRightButton
//       );
//       updateButton(
//         shopScrollRef,
//         setShowShopRefLeftButton,
//         setShowShopRefRightButton
//       );
//     };

//     if (cateElement) cateElement.addEventListener("scroll", handleScroll);
//     if (shopElement) shopElement.addEventListener("scroll", handleScroll);

//     return () => {
//       if (cateElement) cateElement.removeEventListener("scroll", handleScroll);
//       if (shopElement) shopElement.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       updateButton(
//         categoryScrollRef,
//         setShowCategoryRefLeftButton,
//         setShowCategoryRefRightButton
//       );
//       updateButton(
//         shopScrollRef,
//         setShowShopRefLeftButton,
//         setShowShopRefRightButton
//       );
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto pb-10">
//       {/* Navbar placeholder */}
//       <Navbar />

//       {/* Filter Status Bar */}
//       {activeFilterCount > 0 && (
//         <div className="w-full max-w-6xl px-[10px]">
//           <div className="bg-white border-2 border-[#ff4d2d] rounded-xl p-4 flex items-center justify-between shadow-lg">
//             <div className="flex items-center gap-3">
//               <FaFilter className="text-[#ff4d2d] text-xl" />
//               <span className="font-semibold text-gray-700">
//                 {activeFilterCount} Active Filter
//                 {activeFilterCount > 1 ? "s" : ""}
//               </span>
//               <div className="flex gap-2 flex-wrap">
//                 {selectedCategories.map((cat) => (
//                   <span
//                     key={cat}
//                     className="bg-[#ff4d2d] text-white px-3 py-1 rounded-full text-sm font-medium"
//                   >
//                     {cat}
//                   </span>
//                 ))}
//                 {selectedShops.map((shopId) => {
//                   const shop = shopInMyCity.find((s) => s._id === shopId);
//                   return (
//                     <span
//                       key={shopId}
//                       className="bg-[#ff4d2d] text-white px-3 py-1 rounded-full text-sm font-medium"
//                     >
//                       {shop?.name}
//                     </span>
//                   );
//                 })}
//               </div>
//             </div>
//             <button
//               onClick={clearAllFilters}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
//             >
//               <FaXmark />
//               Clear All
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Category Section */}
//       <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
//         <h1 className="text-gray-800 text-2xl sm:text-3xl">
//           Inspiration for your first order
//         </h1>
//         <div className="w-full relative">
//           {showCategoryRefLeftButton && (
//             <button
//               onClick={() => scrollHandler(categoryScrollRef, "left")}
//               className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 transition-all"
//             >
//               <FaCircleChevronLeft />
//             </button>
//           )}

//           <div
//             ref={categoryScrollRef}
//             className="w-full flex overflow-x-auto gap-4 pb-2 scrollbar-hide"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           >
//             {categories?.map((cat, index) => (
//               <CategoryCard
//                 key={index}
//                 name={cat.category}
//                 image={cat.image}
//                 onClick={() => handleCategoryClick(cat.category)}
//                 isActive={
//                   cat.category === "All"
//                     ? selectedCategories.length === 0
//                     : selectedCategories.includes(cat.category)
//                 }
//               />
//             ))}
//           </div>

//           {showCategoryRefRightButton && (
//             <button
//               onClick={() => scrollHandler(categoryScrollRef, "right")}
//               className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 transition-all"
//             >
//               <FaCircleChevronRight />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Shop Section */}
//       {/* <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
//         <h1 className="text-gray-800 text-2xl sm:text-3xl">
//           Best Restaurants in {currentCity}
//         </h1>
//         <div className="w-full relative">
//           {showShopRefLeftButton && (
//             <button
//               onClick={() => scrollHandler(shopScrollRef, "left")}
//               className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 transition-all"
//             >
//               <FaCircleChevronLeft />
//             </button>
//           )}

//           <div
//             ref={shopScrollRef}
//             className="w-full flex overflow-x-auto gap-4 pb-2 scrollbar-hide"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             {shopInMyCity?.map((shop, index) => (
//               <CategoryCard
//                 key={index}
//                 name={shop.name}
//                 image={shop.image}
//                 onClick={() => handleShopClick(shop._id)}
//                 isActive={selectedShops.includes(shop._id)}
//               />
//             ))}
//           </div>

//           {showShopRefRightButton && (
//             <button
//               onClick={() => scrollHandler(shopScrollRef, "right")}
//               className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 transition-all"
//             >
//               <FaCircleChevronRight />
//             </button>
//           )}
//         </div>
//       </div> */}

//       <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
//         <h1 className="text-gray-800 text-2xl sm:text-3xl">
//           Best Restaurants in {currentCity}
//         </h1>
//         <div className="w-full relative">
//           {showShopRefLeftButton && (
//             <button
//               onClick={() => scrollHandler(shopScrollRef, "left")}
//               className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 transition-all"
//             >
//               <FaCircleChevronLeft />
//             </button>
//           )}

//           <div
//             ref={shopScrollRef}
//             className="w-full flex overflow-x-auto gap-4 pb-2 scrollbar-hide"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           >
//             {shopInMyCity?.map((shop, index) => (
//               <CategoryCard
//                 key={index}
//                 name={shop.name}
//                 image={shop.image}
//                 onClick={() => handleShopClick(shop._id)}
//                 isActive={selectedShops.includes(shop._id)}
//                 showMenuButton={true}
//                 onMenuClick={() => navigate(`/shop/${shop._id}`)}
//               />
//             ))}
//           </div>

//           {showShopRefRightButton && (
//             <button
//               onClick={() => scrollHandler(shopScrollRef, "right")}
//               className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 transition-all"
//             >
//               <FaCircleChevronRight />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Food Items Section */}
//       <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
//         <div className="flex items-center justify-between w-full">
//           <h1 className="text-gray-800 text-2xl sm:text-3xl">
//             {activeFilterCount > 0
//               ? "Filtered Results"
//               : "Suggested Food Items"}
//           </h1>
//           <span className="text-gray-600 font-medium">
//             {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}{" "}
//             found
//           </span>
//         </div>
//         {filteredItems.length > 0 ? (
//           <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center">
//             {filteredItems.map((item, index) => (
//               <FoodCard key={item._id || index} data={item} />
//             ))}
//           </div>
//         ) : (
//           <div className="w-full flex flex-col items-center justify-center py-20">
//             <div className="text-6xl mb-4">🍽️</div>
//             <h2 className="text-2xl font-semibold text-gray-700 mb-2">
//               No items found
//             </h2>
//             <p className="text-gray-500 mb-4">Try adjusting your filters</p>
//             <button
//               onClick={clearAllFilters}
//               className="bg-[#ff4d2d] hover:bg-[#e63e1f] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
//             >
//               Clear All Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;





import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import Navbar from "./Navbar";
import { FaCircleChevronLeft, FaCircleChevronRight, FaFilter, FaXmark } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FoodCard from "./FoodCard";
import { useNavigate } from "react-router-dom";
import { clearSearch } from "../redux/userSlice";

const UserDashboard = () => {
  const { 
    currentCity, 
    shopInMyCity, 
    itemInMyCity,
    searchQuery,
    searchedShops,
    searchedItems,
    isSearching
  } = useSelector((state) => state.user);
  
  const categoryScrollRef = useRef(null);
  const shopScrollRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCategoryRefLeftButton, setShowCategoryRefLeftButton] = useState(false);
  const [showCategoryRefRightButton, setShowCategoryRefRightButton] = useState(false);
  const [showShopRefLeftButton, setShowShopRefLeftButton] = useState(false);
  const [showShopRefRightButton, setShowShopRefRightButton] = useState(false);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);
  const [filteredItems, setFilteredItems] = useState(itemInMyCity);
  const [displayShops, setDisplayShops] = useState(shopInMyCity);

  // Determine if we're in search mode
  const isSearchMode = searchQuery.trim() !== "";

  // Filter logic - works with both normal view and search results
  useEffect(() => {
    // Use search results if searching, otherwise use all items
    let baseItems = isSearchMode ? searchedItems : itemInMyCity;
    let baseShops = isSearchMode ? searchedShops : shopInMyCity;
    
    let resultItems = baseItems;
    let resultShops = baseShops;

    // Apply category filter
    if (selectedCategories.length > 0) {
      resultItems = resultItems?.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    // Apply shop filter
    if (selectedShops.length > 0) {
      resultItems = resultItems?.filter((item) => 
        selectedShops.includes(item.shop._id)
      );
      resultShops = resultShops?.filter((shop) =>
        selectedShops.includes(shop._id)
      );
    }

    setFilteredItems(resultItems || []);
    setDisplayShops(resultShops || []);
  }, [selectedCategories, selectedShops, itemInMyCity, shopInMyCity, searchedItems, searchedShops, isSearchMode]);

  // Clear filters when search changes
  useEffect(() => {
    setSelectedCategories([]);
    setSelectedShops([]);
  }, [searchQuery]);

  // Category click handler
  const handleCategoryClick = (category) => {
    if (category === "All") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) => {
        if (prev.includes(category)) {
          return prev.filter((c) => c !== category);
        } else {
          return [...prev, category];
        }
      });
    }
  };

  // Shop click handler
  const handleShopClick = (shopId) => {
    setSelectedShops((prev) => {
      if (prev.includes(shopId)) {
        return prev.filter((s) => s !== shopId);
      } else {
        return [...prev, shopId];
      }
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedShops([]);
  };

  // Clear search and filters
  const clearSearchAndFilters = () => {
    dispatch(clearSearch());
    clearAllFilters();
  };

  // Active filter count
  const activeFilterCount = selectedCategories.length + selectedShops.length;

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth
      );
    }
  };

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const cateElement = categoryScrollRef?.current;
    const shopElement = shopScrollRef?.current;

    updateButton(
      categoryScrollRef,
      setShowCategoryRefLeftButton,
      setShowCategoryRefRightButton
    );
    updateButton(
      shopScrollRef,
      setShowShopRefLeftButton,
      setShowShopRefRightButton
    );

    const handleScroll = () => {
      updateButton(
        categoryScrollRef,
        setShowCategoryRefLeftButton,
        setShowCategoryRefRightButton
      );
      updateButton(
        shopScrollRef,
        setShowShopRefLeftButton,
        setShowShopRefRightButton
      );
    };

    if (cateElement) cateElement.addEventListener("scroll", handleScroll);
    if (shopElement) shopElement.addEventListener("scroll", handleScroll);

    return () => {
      if (cateElement) cateElement.removeEventListener("scroll", handleScroll);
      if (shopElement) shopElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      updateButton(
        categoryScrollRef,
        setShowCategoryRefLeftButton,
        setShowCategoryRefRightButton
      );
      updateButton(
        shopScrollRef,
        setShowShopRefLeftButton,
        setShowShopRefRightButton
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto pb-10">
      <Navbar />

      {/* Search/Filter Status Bar */}
      {(activeFilterCount > 0 || isSearchMode) && (
        <div className="w-full max-w-6xl px-[10px] mt-[80px]">
          <div className="bg-white border-2 border-[#ff4d2d] rounded-xl p-4 flex items-center justify-between shadow-lg flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <FaFilter className="text-[#ff4d2d] text-xl" />
              <span className="font-semibold text-gray-700">
                {isSearchMode ? "Search Results" : `${activeFilterCount} Active Filter${activeFilterCount > 1 ? "s" : ""}`}
              </span>
              <div className="flex gap-2 flex-wrap">
                {isSearchMode && (
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    "{searchQuery}"
                  </span>
                )}
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="bg-[#ff4d2d] text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {cat}
                  </span>
                ))}
                {selectedShops.map((shopId) => {
                  const shop = (isSearchMode ? searchedShops : shopInMyCity)?.find((s) => s._id === shopId);
                  return (
                    <span
                      key={shopId}
                      className="bg-[#ff4d2d] text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {shop?.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <button
              onClick={isSearchMode ? clearSearchAndFilters : clearAllFilters}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <FaXmark />
              {isSearchMode ? "Clear Search" : "Clear All"}
            </button>
          </div>
        </div>
      )}

      {/* Category Section - Only show when not searching */}
      {!isSearchMode && (
        <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px] mt-[80px]">
          <h1 className="text-gray-800 text-2xl sm:text-3xl">
            Inspiration for your first order
          </h1>
          <div className="w-full relative">
            {showCategoryRefLeftButton && (
              <button
                onClick={() => scrollHandler(categoryScrollRef, "left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 transition-all"
              >
                <FaCircleChevronLeft />
              </button>
            )}

            <div
              ref={categoryScrollRef}
              className="w-full flex overflow-x-auto gap-4 pb-2 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories?.map((cat, index) => (
                <CategoryCard
                  key={index}
                  name={cat.category}
                  image={cat.image}
                  onClick={() => handleCategoryClick(cat.category)}
                  isActive={
                    cat.category === "All"
                      ? selectedCategories.length === 0
                      : selectedCategories.includes(cat.category)
                  }
                />
              ))}
            </div>

            {showCategoryRefRightButton && (
              <button
                onClick={() => scrollHandler(categoryScrollRef, "right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 transition-all"
              >
                <FaCircleChevronRight />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Shop Section */}
      <div className={`w-full max-w-6xl flex flex-col gap-5 items-start p-[10px] ${!isSearchMode ? '' : 'mt-[80px]'}`}>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-gray-800 text-2xl sm:text-3xl">
            {isSearchMode 
              ? `Matching Restaurants (${displayShops?.length || 0})`
              : `Best Restaurants in ${currentCity}`
            }
          </h1>
        </div>
        
        {isSearching ? (
          <div className="w-full flex justify-center py-10">
            <div className="text-xl text-gray-600">Searching...</div>
          </div>
        ) : displayShops?.length > 0 ? (
          <div className="w-full relative">
            {showShopRefLeftButton && (
              <button
                onClick={() => scrollHandler(shopScrollRef, "left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 transition-all"
              >
                <FaCircleChevronLeft />
              </button>
            )}

            <div
              ref={shopScrollRef}
              className="w-full flex overflow-x-auto gap-4 pb-2 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {displayShops?.map((shop, index) => (
                <CategoryCard
                  key={index}
                  name={shop.name}
                  image={shop.image}
                  onClick={() => handleShopClick(shop._id)}
                  isActive={selectedShops.includes(shop._id)}
                  showMenuButton={true}
                  onMenuClick={() => navigate(`/shop/${shop._id}`)}
                />
              ))}
            </div>

            {showShopRefRightButton && (
              <button
                onClick={() => scrollHandler(shopScrollRef, "right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 transition-all"
              >
                <FaCircleChevronRight />
              </button>
            )}
          </div>
        ) : isSearchMode ? (
          <div className="w-full flex flex-col items-center justify-center py-10 bg-white rounded-xl border-2 border-gray-200">
            <div className="text-4xl mb-2">🏪</div>
            <p className="text-gray-500">No restaurants match "{searchQuery}"</p>
          </div>
        ) : null}
      </div>

      {/* Food Items Section */}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-gray-800 text-2xl sm:text-3xl">
            {isSearchMode
              ? "Matching Items"
              : activeFilterCount > 0
              ? "Filtered Results"
              : "Suggested Food Items"}
          </h1>
          <span className="text-gray-600 font-medium">
            {filteredItems?.length || 0} item{filteredItems?.length !== 1 ? "s" : ""} found
          </span>
        </div>
        
        {isSearching ? (
          <div className="w-full flex justify-center py-20">
            <div className="text-xl text-gray-600">Searching for items...</div>
          </div>
        ) : filteredItems?.length > 0 ? (
          <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center">
            {filteredItems.map((item, index) => (
              <FoodCard key={item._id || index} data={item} />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No items found
            </h2>
            <p className="text-gray-500 mb-4">
              {isSearchMode
                ? `No results for "${searchQuery}"`
                : "Try adjusting your filters"}
            </p>
            <button
              onClick={isSearchMode ? clearSearchAndFilters : clearAllFilters}
              className="bg-[#ff4d2d] hover:bg-[#e63e1f] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              {isSearchMode ? "Clear Search" : "Clear All Filters"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;