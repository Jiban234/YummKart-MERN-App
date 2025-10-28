import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";


function useGetMyShop () {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/get-my-shop`, {
          withCredentials: true,
        });
        if (result.data.success) {
        dispatch(setMyShopData(result.data.shop));
      }
      } catch (error) {
        console.log(error);
      }
    };
    fetchShop();
  }, []);
};

export default useGetMyShop;
