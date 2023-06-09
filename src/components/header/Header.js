import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../../redux/auth/authSlice";
import { logoutUser } from "../../services/authService";


const Header = () => {
const dispatch=useDispatch()
const navigate=useNavigate()

const name=useSelector((state)=>state.auth.name)

  const logout = async () => {
    await logoutUser();
   dispatch(SET_LOGIN(false))
   navigate('/')
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">{name}</span>
        </h3>
        <button onClick={logout} className="--btn --btn-danger">
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;