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
        if (error.response?.status !== 401) {
          console.error("Error fetching shops by city:", error);
          setError(error.response?.data?.message || "Failed to fetch shops");
        }
        console.log(error);
        dispatch(setShopInMyCity([]));
      }
    };
    fetchShops();
  }, [currentCity]);
}

export default useGetShopByCity;
