import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import Navbar from "./Navbar";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";

const UserDashboard = () => {
  const { currentCity, shopInMyCity, itemInMyCity } = useSelector((state) => state.user);
  const categoryScrollRef = useRef(null);
  const shopScrollRef = useRef(null);
  const [showCategoryRefLeftButton, setShowCategoryRefLeftButton] =
    useState(false);
  const [showCategoryRefRightButton, setShowCategoryRefRightButton] =
    useState(false);
  const [showShopRefLeftButton, setShowShopRefLeftButton] = useState(false);
  const [showShopRefRightButton, setShowShopRefRightButton] = useState(false);

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

    // Initial check to show/hide buttons on mount
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

    if (cateElement) {
      cateElement.addEventListener("scroll", handleScroll);
    }
    if (shopElement) {
      shopElement.addEventListener("scroll", handleScroll);
    }

    // Cleanup function to remove event listener
    return () => {
      if (cateElement) {
        cateElement.removeEventListener("scroll", handleScroll);
      }
      if (shopElement) {
        shopElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []); // Empty dependency array is correct

  // Handle window resize to update buttons
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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Navbar />

      {/* select category div */}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
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
            className="w-full flex overflow-x-auto gap-4 pb-2"
          >
            {categories?.map((cat, index) => (
              <CategoryCard key={index} name={cat.category} image={cat.image} />
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

      {/* select shop div */}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Best Restaurants in {currentCity}
        </h1>
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
            className="w-full flex overflow-x-auto gap-4 pb-2"
          >
            {shopInMyCity?.map((shop, index) => (
              <CategoryCard key={index} name={shop.name} image={shop.image} />
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
      </div>

      {/* select food-item div */}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Suggested Food Items
        </h1>
        <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center">
          {itemInMyCity?.map((item, index)=>(
            <FoodCard key={item._id || index} data={item}/>
          ))}
        </div>
      </div>


    </div>
  );
};

export default UserDashboard;
