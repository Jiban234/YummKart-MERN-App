import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setShopInMyCity } from "../redux/userSlice";

function useGetShopByCity() {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentCity) return; // Don't fetch if no city selected
    const fetchShops = async () => {
      try {
        // URL encode the city name to handle spaces properly
        const encodedCity = encodeURIComponent(currentCity);
        const result = await axios.get(
          `${serverUrl}/api/shop/get-shop-by-city/${encodedCity}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setShopInMyCity(result.data.shops));
      } catch (error) {
        console.log(error);
      }
    };
    fetchShops();
  }, [currentCity]);
}

export default useGetShopByCity;
