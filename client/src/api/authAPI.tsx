import type { UserLogin } from "../interfaces/UserLogin.tsx";
import type { UserSignup } from "../interfaces/UserSignup.tsx";

// Function that handles the login process
const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("User information not retrieved, check network tab!");
    }

    return data;
  } catch (error) {
    console.log("User information not retrieved, check network tab!", error);
    return Promise.reject("Could not retrieve user information");
  }
};

const signup = async (userInfo: UserSignup) => {
  try {
    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("User information not retrieved, check network tab!");
    }

    return data;
  } catch (error) {
    console.log("User information not retrieved, check network tab!", error);
    return Promise.reject("Could not retrieve user information");
  }
};

export { login };
export { signup };
