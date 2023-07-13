import { Navbar, Button, Link as NextUILink } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Layout } from "./components/Layout/Layout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ConsultationPage from "./pages/ConsultationPage";
import ModificationPage from "./pages/ModificationPage";
import Statistique from "./pages/Statistique";

export default function App() {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <Router>
      <Layout>
        <Navbar isBordered variant="sticky" style={{ zIndex: 999 }}>
          {isLoggedIn ? (
            <Navbar.Brand>
              <Navbar.Toggle aria-label="toggle navigation" />
            </Navbar.Brand>
          ) : (
            <div></div>
          )}
          {!isLoggedIn ? (
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
          ) : (
            <div></div>
          )}
          {isLoggedIn ? (
            <Navbar.Collapse>
              {collapseItems.map((item, index) => (
                <Navbar.CollapseItem key={index}>
                  <NextUILink href={item.url}>{item.name}</NextUILink>
                </Navbar.CollapseItem>
              ))}
            </Navbar.Collapse>
          ) : (
            <div></div>
          )}
        </Navbar>

        <Switch>
         
          <Route path="/auth">
          <AuthPage
          showSignUpForm={showSignUpForm}
          />
         
          </Route>
          <Route path="/consultation" component={ConsultationPage} />
          <Route path="/modification" component={ModificationPage} />
          <Route path="/statistique" component={Statistique} />
        </Switch>
      </Layout>
    </Router>
  );
}
