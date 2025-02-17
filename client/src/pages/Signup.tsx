import { useState, type FormEvent, type ChangeEvent } from "react";

import Auth from "../utils/auth";
import { signup } from "../api/authAPI";
import type { UserSignup } from "../interfaces/UserSignup";

const Signup = () => {
  const [signupData, setSignupData] = useState<UserSignup>({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await signup(signupData);
      if (data && data.token) {
        Auth.login(data.token);
      } else {
        throw new Error("Invalid signup response");
      }
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="form-container">
      <form className="form signup-form" onSubmit={handleSubmit}>
        <h1 className="h1__log__text">
          SIGN<span className="h1__up__text">UP</span>
        </h1>
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            value={signupData.username || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={signupData.email || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={signupData.password || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
