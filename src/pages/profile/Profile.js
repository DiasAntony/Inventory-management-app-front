import React, { useEffect, useState } from "react";
import "./Profile.css";
import useRedirect from "../../hooks/useRedirect";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/authService";
import { SET_NAME, SET_USER } from "../../redux/auth/authSlice";
import Card from "../../components/card/Card";
import { SpinnerImg } from "../../components/loader/Loader";
import { Link } from "react-router-dom";

const Profile = () => {
  useRedirect("/login");

  const dispatch = useDispatch();
//   user from redux
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      // console.log(data);
    //   user from useState
      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImg />}
      <>
      {/* useState =>profile */}
        {!isLoading && profile === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={user?.photo} alt="profilepic" />
            </span>
            <span className="profile-data">
              <p>
                {/* here we used redux data */}
                <b>Name : </b> {user?.name}
              </p>
              <p>
                <b>Email : </b> {user?.email}
              </p>
              <p>
                <b>Phone : </b> {user?.phone}
              </p>
              <p>
                <b>Bio : </b> {user?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
