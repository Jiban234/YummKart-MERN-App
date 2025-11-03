import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";
import { setMyOrders } from "../redux/userSlice";

function useGetMyOrders() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    // Only fetch if user is authenticated
    if (!userData) {
      dispatch(setMyShopData(null));
      return;
    }
    const fetchOrders = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/order/my-orders`, {
          withCredentials: true,
        });
        if (result.data.success) {
          dispatch(setMyOrders(result.data.orders));
        }
        console.log(result.data.orders)
      } catch (error) {
        dispatch(setMyOrders([]));
      }
    };
    fetchOrders();
  }, [userData]);
}

export default useGetMyOrders;
