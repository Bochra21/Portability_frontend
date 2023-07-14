import AuthForm from "../components/Auth/AuthForm";

const AuthPage = ({ showSignUpForm, isLoggedIn, setIsLoggedIn }) => {
  return <AuthForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} showSignUpForm={showSignUpForm}  />;
};

export default AuthPage;
