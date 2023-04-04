import React ,{useState} from "react";
import {Link} from 'react-router-dom';
import styles from "./Auth.module.css";
import { AiOutlineMail } from "react-icons/ai";
import Card from '../../components/card/Card';
import { toast } from "react-toastify";
import { forgotPassword, validateEmail } from "../../services/authService";



const ForgotPass = () => {

  const [email, setEmail] = useState("");

const forgot=async(e)=>{
  e.preventDefault();

  if(!email){
    toast.error("Please enter email")
  }
  if(!validateEmail(email)){
    toast.error("Please enter valid email")
  }

  const userData={
    email
  }

  try {
    await forgotPassword(userData)
    setEmail('')
    toast.success("check your mail")
    
  } catch (error) {
    toast.error(error.message)
    
  }

}



  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Email
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPass;
