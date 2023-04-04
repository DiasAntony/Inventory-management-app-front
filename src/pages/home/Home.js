import React from "react";
import "./Home.css";
import { MdOutlineInventory } from "react-icons/md";
import { Link } from "react-router-dom";
import Heroimg from "../../assets/inv-img.png"
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/hiddenLinks";

const Home = () => {
  return (
    <div className="home">
      {/* Nav section */}
      <nav className="container --flex-between">
        <div className="logo">
          <MdOutlineInventory size={35} />
        </div>
        <ul className="home-links">
          <ShowOnLogout>
          <li>
            <Link to="/register">Register</Link>
          </li>
          </ShowOnLogout>
          <ShowOnLogout>
          <li>
            <button className="--btn --btn-primary">
              <Link to="/login">Login</Link>
            </button>
          </li>
          </ShowOnLogout>
          <ShowOnLogin>
          <li>
            <button className="--btn --btn-primary">
              <Link to="/dashboard">Dashboard</Link>
            </button>
          </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* Hero section */}
      <section className="hero-container hero">
        <div className="hero-text">
          <h2>Inventory & Stock Management Solution</h2>
          <p>
            Inventory System Control and manage products in the warehouse in
            real time and integrate to make it easier to develop your business.
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/freetrial">Free Trial 1 month</Link>
            </button>
          </div>
          <div className="free --flex-start">
            <NumberText num="14K" text="Brand Owners" />
            <NumberText num="23K" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div>
        </div>
        <div className="hero-image">
          <img src={Heroimg} alt="hero" />
        </div>
      </section>
    </div>
  );
};

const NumberText=({num,text})=>{
  return(
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  )
}

export default Home;
