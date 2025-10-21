import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../redux/userSlice";

const useGetCurrentLocation = () => {
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

      dispatch(setLocation(response?.data?.results[0].city));
    });
  }, [userData]);
};

export default useGetCurrentLocation;
