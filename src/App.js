import { Navbar, Button, Link as NextUILink } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Layout } from "./components/Layout/Layout";
import { Button as btn } from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import "./index.css";
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const linkStyle = {
    color: "#343a40", // Set your desired text color
    textDecoration: "none", // Remove the default underline
    marginRight: "10px", // Add some spacing between links
    borderBottom: "1px solid gray", // Add a thin bottom border
    display: "block",
    paddingTop: "15px",
    paddingBottom: "15px",
    fontSize: "20px",
  };

  const MyButton = {
    color: "white",
    backgroundColor: "#94596d",
    fontFamily: "Open Sans",
  };

  const grayButton = {
    color: "#F8F1F8",
    backgroundColor: "#94596d",
    fontFamily: "Open Sans",
  };
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Retrieve the login status from local storage on component mount.
  useEffect(() => {
    document.body.style.backgroundColor = "#F8F1F8";
    // Retrieve the login status from local storage on component mount.
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const parsedLoginStatus = JSON.parse(true);
    setIsLoggedIn(true);

    // Get the last visited route from local storage and redirect if logged in.
    // if (parsedLoginStatus) {
    //   const lastVisitedRoute = localStorage.getItem("lastVisitedRoute");
    //   if (lastVisitedRoute) {
    //     window.location.replace(lastVisitedRoute);
    //   }
    // }
  }, []);

  const handleSignUpClick = () => {
    setShowSignUpForm(true); // Toggle the sign-up form display
  };
  const handleSignInClick = () => {
    setShowSignUpForm(false); // Toggle the sign-up form display
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
        <Navbar
          css={{
            $$navbarBlurBackgroundColor: "#BE92A2",
          }}
          isBordered
          variant="sticky"
          style={{ zIndex: 999 }}
        >
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title> </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{ backgroundColor: "white" }}>
              <div>
                <Link to="/consultation" style={linkStyle}>
                  Consultation
                </Link>{" "}
              </div>
              <div>
                {" "}
                <Link to="/modification" style={linkStyle}>
                  Gestion
                </Link>{" "}
              </div>
              <div>
                {" "}
                <Link to="/statistique" style={linkStyle}>
                  Statistique
                </Link>
              </div>
            </Offcanvas.Body>
          </Offcanvas>

          {!isLoggedIn && (
            <Navbar.Content>
              <Button
                auto
                light
                css={{ color: "white" }}
                onPress={handleSignInClick}
              >
                Log In
              </Button>

              <Button auto style={MyButton} onPress={handleSignUpClick}>
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

          {/* {isLoggedIn && (
            <Navbar.Collapse >
              {collapseItems.map((item, index) => (
                <Navbar.CollapseItem >
                  <NextUILink  color="warning" href={item.url}>{item.name}</NextUILink>
                  {console.log("item.url:",item.url)}
                </Navbar.CollapseItem>
              ))}
            </Navbar.Collapse>
          )} */}

          {
            <Navbar.Collapse>
              <Navbar.CollapseItem>
                <Link to="/consultation">Consultation</Link>
                <Link to="/modification">Gestion</Link>
                <Link to="/statistique">Statistique</Link>
              </Navbar.CollapseItem>
            </Navbar.Collapse>
          }
        </Navbar>

        {isLoggedIn ? (
          <Sidebar>
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
              {/*when no other routes are matched go to : */}
              <Route path="/">
                {isLoggedIn ? (
                  <Redirect to="/consultation" />
                ) : (
                  <Redirect to="/auth" />
                )}
              </Route>
            </Switch>
          </Sidebar>
        ): <Switch>
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
        {/*when no other routes are matched go to : */}
        <Route path="/">
          {isLoggedIn ? (
            <Redirect to="/consultation" />
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>
      </Switch>
        
        
        
        }
      </Layout>
    </Router>
  );
}

const MenuIcon = ({ fill, size, height, width, label, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill={fill}>
        <path d="M3 11h18v2H3z" />
        <path d="M3 6h18v2H3z" />
        <path d="M3 16h18v2H3z" />
      </g>
    </svg>
  );
};
