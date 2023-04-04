import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import Card from "../../components/card/Card";
import { TiUserAddOutline } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/auth/authSlice";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password, password2 } = formData;

  const [upperCase, setUpperCase] = useState(false);
  const [num, setNum] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [charLenth, setCharLenth] = useState(false);

  const wrongIcon = <FaTimes color="red" size={15} />;
  const crtIcon = <BsCheck2All color="green" size={15} />;

  const switchIcon = (condition) => {
    if (condition) {
      return crtIcon;
    }
    return wrongIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // check Lower and Uppercase

    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUpperCase(true);
    } else {
      setUpperCase(false);
    }
    // check from Numbers

    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }

    // check from special charecter

    if (password.match(/([!,%,&,@,#,$,.,^,*,?,_,~])/)) {
      setSpecialChar(true);
    } else {
      setSpecialChar(false);
    }

    // check for length

    if (password.length > 5) {
      setCharLenth(true);
    } else {
      setCharLenth(false);
    }
  }, [password]);

  const passwordTrue = upperCase && num && specialChar && charLenth;

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("Enter All Field");
    }
    if (!validateEmail(email)) {
      return toast.error("enter valid email!!");
    }

    if (password !== password2) {
      return toast.error("password not match!!");
    }

    const userData = {
      name,
      email,
      password,
    };

    setIsLoading(true);

    try {
      const data = await registerUser(userData);

      // console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Register</h2>

          <form onSubmit={register}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
            <Card cardClass={styles.group}>
              <ul className="form-list">
                <li>
                  <span className={styles.indicator}>
                    {/* {upperCase ? crtIcon : wrongIcon} */}
                    {switchIcon(upperCase)}
                    &nbsp; Lowercase & Uppercase
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {/* {num ? crtIcon : wrongIcon} */}
                    {switchIcon(num)}
                    &nbsp; Number (0-9)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {/* {specialChar ? crtIcon : wrongIcon} */}
                    {switchIcon(specialChar)}
                    &nbsp; Special Character(!@#%$^&*)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {/* {charLenth ? crtIcon : wrongIcon} */}
                    {switchIcon(charLenth)}
                    &nbsp; At Least 6 Character
                  </span>
                </li>
              </ul>
            </Card>
            <button
              disabled={!passwordTrue}
              type="submit"
              className="--btn --btn-primary --btn-block"
            >
              Register
            </button>
          </form>

          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; Already have an account? &nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
