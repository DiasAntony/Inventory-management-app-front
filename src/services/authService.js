import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// register user
export const registerUser = async (userData) => {
  try {
    //parameters api endpoint and what you wannna post this api,help post the json data
    const response = await axios.post(
      `${BACKEND_URL}/api/users/register`,
      userData,
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      toast.success("User Register Successfully");
    }
    // this response.data goes to register component data == then the reponse have serveral property like data,status,statustext,header... but we need just a data for that component
    // response.data only show whatever we give a response to this endpoint in backend {backend response only come frontend}
    return response.data;
  } catch (error) {
    // response error came from what we set backend that and more error also come to frontend
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// login User

export const loginUser = async (userData) => {
  try {
    //parameters api endpoint and what you wannna post this api,help post the json data
    const response = await axios.post(
      `${BACKEND_URL}/api/users/login`,
      userData
    );
    if (response.statusText === "OK") {
      toast.success("User login Successfully");
    }
    return response.data;
    //   console.log(response)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// logout user

export const logoutUser = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/logout`);
    if (response.statusText === "OK") {
      toast.success("User logout Successfully");
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// forgot password
export const forgotPassword = async (userData) => {
  try {
    //parameters api endpoint and what you wannna post this api
    const response = await axios.post(
      `${BACKEND_URL}/api/users/forgotPassword`,
      userData
    );
    if (response.statusText === "OK") {
      // this data.message from backend this api success res.jeson({message:"email send successfully"})
      toast.success(response.data.message);
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// reset password

export const resetPassword = async (userData, resetToken) => {
  try {
    //parameters api endpoint and what you wannna post this api
    const response = await axios.put(
      `${BACKEND_URL}/api/users/resetPassword/${resetToken}`,
      userData
    );
    if (response.statusText === "OK") {
      // this data.message from backend this api success res.jeson({message:"email send successfully"})
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// login status

export const getLoginStatus = async () => {
  try {
    //parameters api endpoint and what you wannna post this api
    const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
    if (response.statusText === "OK") {
      // this data.message from backend this api success res.jeson({message:"email send successfully"})
      toast.success(response.data.message);
    }
    // boolean value
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};


// get user  profile

export const getUser = async () => {
  try {
    //parameters api endpoint and what you wannna post this api
    const response = await axios.get(`${BACKEND_URL}/api/users/getuser`);
    if (response.statusText === "OK") {
      // this data.message from backend this api success res.jeson({message:"email send successfully"})
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// upadte User
export const updateUser = async (formData) => {
  try {
    //parameters api endpoint and what you wannna post this api
    const response = await axios.patch(`${BACKEND_URL}/api/users/updateuser`,formData);
    if (response.statusText === "OK") {
      // this data.message from backend this api success res.jeson({message:"email send successfully"})
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// upadte Password
export const changePass = async (formData) => {
  try {
    //parameters api endpoint and what you wannna post this api
    const response = await axios.patch(`${BACKEND_URL}/api/users/changepassword`,formData);
    if (response.statusText === "OK") {
      // this data.message from backend this api success res.jeson({message:"email send successfully"})
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};