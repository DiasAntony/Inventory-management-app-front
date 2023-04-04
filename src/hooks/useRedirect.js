// when user came back after token expire the user will redirect to login page

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoginStatus } from "../services/authService";
import { toast } from "react-toastify";
import { SET_LOGIN } from "../redux/auth/authSlice";

const useRedirect = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectLoggedoutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast.info("session expired, please login to continue..");
        navigate(path)
        return
      }
    };
    redirectLoggedoutUser()
  },[navigate,dispatch,path]);
};

export default useRedirect;
