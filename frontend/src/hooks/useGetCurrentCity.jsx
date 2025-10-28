import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";

const useGetCurrentCity = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const apiKey = import.meta.env.VITE_GEOAPI_KEY;
  useEffect(() => {
    // If geolocation not supported
    // navigator from javascript

    // Get user's coordinates
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
      );

      dispatch(setCurrentCity(response?.data?.results[0].city));
      dispatch(setCurrentState(response?.data?.results[0].state));
      dispatch(
        setCurrentAddress(
          response?.data?.results[0].address_line1 ||
            response?.data?.results[0].address_line2
        )
      );
    });
  }, [userData]);
};

export default useGetCurrentCity;
