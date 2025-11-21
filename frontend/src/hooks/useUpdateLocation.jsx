import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice.js";
import { setAddress, setLocation } from "../redux/mapSlice.js";
import { serverUrl } from "../App.jsx";

const useUpdateLocation = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const updateLocation = async (lat, lon) => {
      try {
        const result = await axios.post(
          `${serverUrl}/api/user/update-location`,
          { lat, lon },
          { withCredentials: true }
        );
        console.log(`Updated Location ${result.data}`);
      } catch (error) {
        console.error(
          "Update location error:",
          error.response?.data || error.message
        );
      }
    };

    navigator.geolocation.watchPosition((pos) => {
      updateLocation(pos.coords.latitude, pos.coords.longitude);
    });
  }, [userData]);
};

export default useUpdateLocation;
