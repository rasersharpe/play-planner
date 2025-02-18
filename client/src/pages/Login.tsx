import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { login } from "../api/authAPI";
import type { UserLogin } from "../interfaces/UserLogin";

// This component handles the login process for the user
const Login = () => {
  const currentPage = useLocation().pathname;
  const navigate = useNavigate();
  // This state variable holds the login data
  const [loginData, setLoginData] = useState<UserLogin>({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState<string | null>(null);

  // This function handles the change in the input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // This function handles the form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      setLoginError("Invalid username or password.");
    }
  };

  return (
        <div className="form-container">
        <form className="form login-form" onSubmit={handleSubmit}>
          <h1 className="h1__log__text">
            LOG<span className="h1__in__text">IN</span>
          </h1>
          <div className="form-group">
            <label>Username</label>
            <input
              className="form-input"
              type="text"
              name="username"
              value={loginData.username || ""}
              onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              value={loginData.password || ""}
              onChange={handleChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
          {loginError && <p className="error-message">{loginError}</p>}
        </form>
        <div className="form-footer">
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className={currentPage === "/signup" ? "navLinkActive" : "navLink"}
            >
              Sign up here.
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Login;
