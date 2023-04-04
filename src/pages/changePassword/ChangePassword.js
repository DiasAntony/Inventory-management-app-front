import React from "react";
import "./ChangePassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../components/card/Card";
import { changePass } from "../../services/authService";



const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newpassword: "",
    confirmPassword: "",
  });

  const { oldPassword, newpassword, confirmPassword } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changePassword=async(e)=>{
    e.preventDefault();

    if(!oldPassword && !newpassword && !confirmPassword){
      toast.error("Enter all Inputs!!")
    }

    if(newpassword !== confirmPassword){
      toast.error("New Passwords doesn't match.!!")
    }

    const formdata={
      oldPassword,
      newpassword
    }

    const data= await changePass(formdata)

    navigate('/profile')

  }

  return (
    <div className="change-password">
      <Card cardClass={"password-card"}>
        <h3>Change Password</h3>
        <form onSubmit={changePassword} className="--form-control">
          <input
            type="password"
            placeholder="Old Password"
            required
            name="oldPassword"
            value={oldPassword}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="New Password"
            required
            name="newpassword"
            value={newpassword}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
          />
          <button type="submit" className="--btn --btn-primary">
            Change Password
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
