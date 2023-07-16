import { Navbar, Button, Link as NextUILink } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Layout } from "./components/Layout/Layout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ConsultationPage from "./pages/ConsultationPage";
import ModificationPage from "./pages/ModificationPage";
import Statistique from "./pages/Statistique";
import ProtectedRoute from "./ProtectedRoute";
//import "./components/Auth/AuthForm.module.css";

export default function App() {
  const orangeButton = {
    color: "white",
    backgroundColor: "rgb(255, 171 ,108 )",
    fontFamily: "Open Sans",
  };

  const grayButton = {
    color: "rgb(52, 58 ,64)",
    backgroundColor: "rgb(52, 58 ,64,0.2)",
    fontFamily: "Open Sans",
  };
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //console.log(isLoggedIn);
  // Retrieve the login status from local storage on component mount.
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const parsedLoginStatus = JSON.parse(storedLoginStatus);
    setIsLoggedIn(parsedLoginStatus);
  }, []);

  const handleSignUpClick = () => {
    setShowSignUpForm(true); // Toggle the sign-up form display
  };

  const collapseItems = [
    { name: "Consultation", url: "/consultation" },
    { name: "Modification", url: "/modification" },
    { name: "Statistique", url: "/statistique" },
  ];

  const handleLogout = () => {
    // Set login status to false in local storage and state
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Layout>
        <Navbar isBordered variant="sticky" style={{ zIndex: 999 }}>
          {isLoggedIn && (
            <Navbar.Brand>
              <Navbar.Toggle aria-label="toggle navigation" />
            </Navbar.Brand>
          )}
          {!isLoggedIn && (
            <Navbar.Content>
              <NextUILink color="inherit" as={Link} to="/auth">
                Login
              </NextUILink>

              <Button auto style={orangeButton} onPress={handleSignUpClick}>
                Sign Up
              </Button>
            </Navbar.Content>
          )}
          {isLoggedIn && (
            <Navbar.Content>
              <Button
                color="black"
                auto
                style={grayButton}
                onClick={handleLogout}
              >
                <b> Logout </b>
              </Button>
            </Navbar.Content>
          )}

          {isLoggedIn && (
            <Navbar.Collapse>
              {collapseItems.map((item, index) => (
                <Navbar.CollapseItem key={index}>
                  <NextUILink href={item.url}>{item.name}</NextUILink>
                </Navbar.CollapseItem>
              ))}
            </Navbar.Collapse>
          )}
        </Navbar>

        <Switch>
          <Route path="/auth">
            <AuthPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              showSignUpForm={showSignUpForm}
            />
          </Route>
          <ProtectedRoute
            path="/consultation"
            component={ConsultationPage}
            isLoggedIn={isLoggedIn}
          />
          <ProtectedRoute
            path="/modification"
            component={ModificationPage}
            isLoggedIn={isLoggedIn}
          />
          <ProtectedRoute
            path="/statistique"
            component={Statistique}
            isLoggedIn={isLoggedIn}
          />
          {/*when so other routes are matched go to : */}
          <Route path="/">
            {isLoggedIn ? (
              <Redirect to="/consultation" />
            ) : (
              <Redirect to="/auth" />
            )}
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}
