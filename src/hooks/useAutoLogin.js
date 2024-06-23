import { useState, useEffect } from "react";
import { setUser } from "../store/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

function useAutoLogin() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function autoLoginApiCall() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_INTERNAL_API}/refresh`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          const user = {
            _id: response.data.user._id,
            email: response.data.user.email,
            username: response.data.user.username,
            auth: response.data.auth,
          };

          dispatch(setUser(user));
        }
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);
  return loading;
}

export default useAutoLogin;
