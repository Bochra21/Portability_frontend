import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Card, Input, Button } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import classes from "./AuthForm.module.css";

const signupUrl = "http://localhost:8080/api/auth/signup";
const signinUrl = "http://localhost:8080/api/auth/signin";

const AuthForm = ({ showSignUpForm }) => {
  //console.log(showSignUpForm); //false
 
  const [isSignUp, setIsSignUp] = useState(showSignUpForm);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const switchAuthModeHandler = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isSignUp) 
      {
        // Handle sign-up logic
        const response = await axios.post(signupUrl, {
          email: email,
          password: password,
        });

        setIsSignUp(false);
      } else {
        // Handle login logic
        const response = await axios.post(signinUrl, {
          email: email,
          password: password,
        });

        setIsLoggedIn(true);
        // Save login status in local storage
        localStorage.setItem("isLoggedIn", "true");
      }
    } catch (error) {
      console.log("Authentication error:", error);
    }
  };


  if (isLoggedIn) {
    return <Redirect to="/consultation" />;
  }
 
  return (
    <Card style={{ maxWidth: "400px" }} className={classes.auth}>
      <Card.Body onSubmit={handleSubmit} as="form" style={{ paddingTop: "30px" }}>
        <Input
          clearable
          type="email"
          labelPlaceholder="Email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Spacer y={2} />
        <Input.Password
          labelPlaceholder="Password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          visibleIcon={<UnLockIcon fill="currentColor" />}
          hiddenIcon={<LockIcon fill="currentColor" />}
        />
        <Spacer y={1} />
        <Button className={classes.button} type="submit" color="red" auto>
          {!isSignUp ? "Login" : "Create Account"}
        </Button>
        <Spacer y={1} />
        <Button
          style={{ color: "#343a40" }}
          light
          color="red"
          auto
          onClick={switchAuthModeHandler}
        >
          {!isSignUp ? "Create new account" : "Login with existing account"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AuthForm;



 const UnLockIcon = ({
  fill,
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      data-name="Iconly/Curved/Lock"
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g transform="translate(3.5 2)">
        <path
          d="M8.927,3.237A4.562,4.562,0,0,0,0,4.484V6.653"
          transform="translate(3.849 0.75)"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
        />
        <path
          d="M.5,0V2.221"
          transform="translate(7.91 12.156)"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
        />
        <path
          d="M7.66,0C1.915,0,0,1.568,0,6.271s1.915,6.272,7.66,6.272,7.661-1.568,7.661-6.272S13.406,0,7.66,0Z"
          transform="translate(0.75 6.824)"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
        />
      </g>
    </svg>
  );
};




const LockIcon = ({
  fill,
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      data-name="Iconly/Curved/Lock"
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path
          data-name="Stroke 1"
          d="M16.471 9.403V7.25a4.561 4.561 0 00-9.121-.016v2.169"
        />
        <path data-name="Stroke 3" d="M11.91 14.156v2.221" />
        <path
          data-name="Stroke 5"
          d="M11.91 8.824c-5.745 0-7.66 1.568-7.66 6.271s1.915 6.272 7.66 6.272 7.661-1.568 7.661-6.272-1.921-6.271-7.661-6.271z"
        />
      </g>
    </svg>
  );
};
