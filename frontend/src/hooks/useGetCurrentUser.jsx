import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data.user));
      } catch (error) {
        // Only log errors that aren't 401 (user not authenticated)
        if (error.response?.status !== 401) {
          console.error("Error fetching current user:", error);
          setError(error.response?.data?.message || "Failed to fetch user");
        }
        // Clear user data on error
        console.log(error);
        dispatch(setUserData(null));
      }
    };
    fetchUser();
  }, []);
}

export default useGetCurrentUser;
