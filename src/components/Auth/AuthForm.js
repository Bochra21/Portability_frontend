import { useState } from "react";
import axios from "axios";
import classes from "./AuthForm.module.css";
import { Redirect } from "react-router-dom";

const signupUrl = "http://localhost:8080/api/auth/signup";
const signinUrl = "http://localhost:8080/api/auth/signin";

const AuthForm = () => {
  //The state of the form is : Login
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const signupHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(signupUrl, {
        email: email,
        password: password,
      });

      // setIsLoggedIn(true);
      setIsLogin(true);
    } catch (error) {
      console.log("Sign up error:", error);
    }
  };

  const signinHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(signinUrl, {
        email: email,
        password: password,
      });

      setIsLoggedIn(true);
    } catch (error) {
      console.log("Sign in error:", error);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={isLogin ? signinHandler : signupHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={classes.actions}>
          <button type="submit" onClick={!isLogin ? signupHandler : null}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
