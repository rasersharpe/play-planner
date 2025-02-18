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

  // This function handles the change in the input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  // This function handles the form submission
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
    <div className="form__container">
      <form className="signup__form" onSubmit={handleSubmit}>
        <h2>SIGNUP</h2>
        <div className="form-group">
          <input
            className="form__input"
            type="text"
            name="username"
            placeholder="username"
            value={signupData.username || ""}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <input
            className="form__input"
            type="email"
            name="email"
            placeholder="email@email.com"
            value={signupData.email || ""}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <input
            className="form__input"
            type="password"
            name="password"
            placeholder="password"
            value={signupData.password || ""}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <button className="form__submit__button" type="submit">
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
