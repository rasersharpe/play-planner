import { useState, type FormEvent, type ChangeEvent } from "react";
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
  
    const userData = {
      username: signupData.username,
      email: signupData.email,
      password: signupData.password,
    };
  
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      // Log the raw response to check its content
      const responseBody = await response.json();
      console.log("Response Body:", responseBody);  // This is important for debugging
  
      // Check if the response is successful
      if (!response.ok) {
        // Log error data if the response is not ok
        console.log("Error response:", responseBody);
        throw new Error(responseBody.message || 'Error during signup');
      }
  
      // If response is OK, process the data
      console.log('Signup successful', responseBody);
  
      // Handle successful signup (e.g., redirect or show message)
    } catch (error) {
      console.error('Signup failed', error);
      if (error instanceof Error) {
        setSignupError('Signup failed: ' + error.message); // Show error message to the user
      } else {
        setSignupError('Signup failed: An unknown error occurred'); // Handle unknown error type
      }
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
function setSignupError(_arg0: string) {
  throw new Error("Function not implemented.");
}

