import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

function useGetMyShop() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    // Only fetch if user is authenticated
    if (!userData) {
      dispatch(setMyShopData(null));
      return;
    }
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/get-my-shop`, {
          withCredentials: true,
        });
        if (result.data.success) {
          dispatch(setMyShopData(result.data.shop));
        }
      } catch (error) {
        // Silently handle 401 (not authorized) and 404 (no shop found)
        if (error.response?.status !== 401 && error.response?.status !== 404) {
          console.error("Error fetching my shop:", error);
        }
        
        // If 404, user just doesn't have a shop yet - this is normal
        if (error.response?.status === 404) {
          console.log("No shop found for this user");
        }
        console.log(error);
        dispatch(setMyShopData(null));
      }
    };
    fetchShop();
  }, [userData]);
}

export default useGetMyShop;
