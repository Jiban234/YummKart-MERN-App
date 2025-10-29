import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setItemInMyCity, setShopInMyCity } from "../redux/userSlice";

function useGetItemByCity() {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentCity) return; // Don't fetch if no city selected
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
        console.log(error);
      }
    };
    fetchItems();
  }, [currentCity]);
}

export default useGetItemByCity;
