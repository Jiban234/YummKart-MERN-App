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
        dispatch(setMyShopData(null));
      }
    };
    fetchShop();
  }, [userData]);
}

export default useGetMyShop;
