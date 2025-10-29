import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setItemInMyCity, setShopInMyCity } from "../redux/userSlice";

function useGetItemByCity() {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);

  useEffect(() => {
    // Don't fetch if no city selected
    if (!currentCity){
      dispatch(setItemInMyCity([]));
      return;
    }  
    const fetchItems = async () => {
      try {
        // URL encode the city name to handle spaces properly
        const encodedCity = encodeURIComponent(currentCity);
        const result = await axios.get(
          `${serverUrl}/api/item/get-item-by-city/${encodedCity}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setItemInMyCity(result.data.items));
        console.log(result.data.items);
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("Error fetching items by city:", error);
          setError(error.response?.data?.message || "Failed to fetch items");
        }
        console.log(error);
        dispatch(setItemInMyCity([]));
        
      }
    };
    fetchItems();
  }, [currentCity]);
}

export default useGetItemByCity;
