import { type JwtPayload, jwtDecode } from "jwt-decode";
import type { UserData } from "../interfaces/UserData";

// AuthService class to manage authentication
class AuthService {
  // Method to get the current user's profile
  getProfile = () => {
    const token = this.getToken();
    console.log("Token in getProfile:", token); // Debugging statement
    return token ? jwtDecode<UserData>(token) : null;
  };

  // Method to check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    console.log("Token in loggedIn:", token); // Debugging statement
    return !!token && !this.isTokenExpired(token);
  }

  // Method to check if the token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("Decoded token:", decoded); // Debugging statement
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (error) {
      console.error("Error decoding token:", error); // Debugging statement
      return false;
    }
  }

  // Method to get the token from local storage
  getToken(): string {
    const loggedUser = localStorage.getItem("id_token") || "";
    console.log("Token from localStorage:", loggedUser); // Debugging statement
    return loggedUser;
  }

  // Retrieve the userId from localStorage
  getUserId() {
    const userId = localStorage.getItem("userId");
    console.log("User ID from localStorage:", userId); // Debugging statement
    return userId;
  }

  // Method to log in the user
  login(idToken: string, userId: string) {
    localStorage.setItem("id_token", idToken);
    localStorage.setItem("userId", userId);
    console.log("User ID set in localStorage:", userId); // Debugging statement
    window.location.assign("/");
  }

  // Method to log out the user
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("userId");
    window.location.assign("/");
  }
}

// Create an instance of the AuthService class
export default new AuthService();