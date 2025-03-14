import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image1 from "../../assets/front/login.png"; 
import Image2 from "../../assets/front/signup.png";
import styles from "./Login.module.css"; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import axiosInstance from "../../axiosInstance";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post("/api/auth/login", { email, password }).then((res)=>{
      if(res.data.token){
        sessionStorage.setItem('logintoken',res.data.token);
        navigate('/');
      } else {
        navigate('/login');
      }
    }).catch((err)=>{
      alert('Invalid Login');
    })
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/register", { username, email, password });
      // Handle successful registration (e.g., save token, redirect)
      navigate("/login");
    } catch (error) {
      console.error("Sign up error", error);
    }
  };

  return (
    <div className={`${styles.container} ${isSignUp ? styles["sign-up-mode"] : ""}`}>
      <div className={styles["forms-container"]}>
        <div className={styles["signin-signup"]}>
          {/* Sign In Form */}
          <form onSubmit={handleLogin} className={styles["sign-in-form"]}>
            <h2 className={styles.title}>Sign in</h2>
            <div className={styles["input-field"]}>
              <i className="fas fa-user"></i>
              <input type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <input type="submit" value="Login" className={`${styles.btn} ${styles.solid}`} />
            
            <p className={styles["social-text"]}>Or Sign in with social platforms</p>
            <div className={styles["social-media"]}>
              <a href="#" className={styles["social-icon"]}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className={styles["social-icon"]}><i className="fab fa-twitter"></i></a>
              <a href="#" className={styles["social-icon"]}><i className="fab fa-google"></i></a>
              <a href="#" className={styles["social-icon"]}><i className="fab fa-linkedin-in"></i></a>
            </div>

            {/* ✅ Forgot Password Link (Moved Below Social Icons) */}
            <p className={styles["forgot-password"]}>
              <Link to="/Forgot">Forgot Password?</Link>
            </p>
          </form>

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className={styles["sign-up-form"]}>
            <h2 className={styles.title}>Sign up</h2>
            <div className={styles["input-field"]}>
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <input type="submit" className={styles.btn} value="Sign up" />
          </form>
        </div>
      </div>

      {/* Panels Section */}
      <div className={styles["panels-container"]}>
        <div className={`${styles.panel} ${styles["left-panel"]}`}>
          <div className={styles.content}>
            <h3>New here?</h3>
            <p>Join us today and explore great opportunities!</p>
            <button className={`${styles.btn} ${styles.transparent}`} onClick={() => setIsSignUp(true)}>
              Sign up
            </button>
          </div>
          <img src={Image1} className={styles.image} alt="Sign Up Illustration" />
        </div>
        <div className={`${styles.panel} ${styles["right-panel"]}`}>
          <div className={styles.content}>
            <h3>One of us?</h3>
            <p>Welcome back! Sign in to continue.</p>
            <button className={`${styles.btn} ${styles.transparent}`} onClick={() => setIsSignUp(false)}>
              Sign in
            </button>
          </div>
          <img src={Image2} className={styles.image} alt="Sign In Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
