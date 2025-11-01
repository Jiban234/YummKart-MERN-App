import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setShopInMyCity } from "../redux/userSlice";

function useGetShopByCity() {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);

  useEffect(() => {
    // Don't fetch if no city selected
    if (!currentCity) {
      dispatch(setShopInMyCity([]));
      return;
    }

    const fetchShops = async () => {
      try {
        const encodedCity = encodeURIComponent(currentCity);
        const result = await axios.get(
          `${serverUrl}/api/shop/get-shop-by-city/${encodedCity}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setShopInMyCity(result.data.shops));
      } catch (error) {
        // Silently handle network errors
        dispatch(setShopInMyCity([]));
      }
    };
    fetchShops();
  }, [currentCity]);
}

export default useGetShopByCity;
