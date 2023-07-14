import { Navbar, Button, Link as NextUILink } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Layout } from "./components/Layout/Layout";
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ConsultationPage from "./pages/ConsultationPage";
import ModificationPage from "./pages/ModificationPage";
import Statistique from "./pages/Statistique";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //console.log(isLoggedIn);
  // Retrieve the login status from local storage on component mount.
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoginStatus === "true");
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
              <Navbar.Item as={Link} to="/auth">
                <Button auto flat onClick={handleSignUpClick}>
                  Sign Up
                </Button>
              </Navbar.Item>
            </Navbar.Content>
          ) }
          {isLoggedIn && (
            <Navbar.Content>
              <Button light color="primary" auto onPress={handleLogout}>  
                Logout
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
          ) }

        </Navbar>

        <Switch>
          <Route path="/auth">
            <AuthPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} showSignUpForm={showSignUpForm} />
          </Route>
          <ProtectedRoute path="/consultation" component={ConsultationPage} isLoggedIn={isLoggedIn} />
          <ProtectedRoute path="/modification" component={ModificationPage} isLoggedIn={isLoggedIn} />
          <ProtectedRoute path="/statistique" component={Statistique} isLoggedIn={isLoggedIn} />
          {/*when so other routes are matched go to : */}
          <Route path="/">
            {isLoggedIn ? <Redirect to="/consultation" /> : <Redirect to="/auth" />}
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}
