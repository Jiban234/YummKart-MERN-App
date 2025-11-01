import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setItemInMyCity } from "../redux/userSlice";

function useGetItemByCity() {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);

  useEffect(() => {
    // Don't fetch if no city selected
    if (!currentCity) {
      dispatch(setItemInMyCity([]));
      return;
    }

    const fetchItems = async () => {
      try {
        const encodedCity = encodeURIComponent(currentCity);
        const result = await axios.get(
          `${serverUrl}/api/item/get-item-by-city/${encodedCity}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setItemInMyCity(result.data.items));
      } catch (error) {
        // Silently handle network errors
        dispatch(setItemInMyCity([]));
      }
    };
    fetchItems();
  }, [currentCity]);
}

export default useGetItemByCity;