import { type JwtPayload, jwtDecode } from "jwt-decode";
import type { UserData } from "../interfaces/UserData";

// AuthService class to manage authentication
class AuthService {
  // Method to get the current user's profile
  getProfile = () => {
    return jwtDecode<UserData>(this.getToken());
  };

  // Method to check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Method to check if the token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  // Method to get the token from local storage
  getToken(): string {
    const loggedUser = localStorage.getItem("id_token") || "";
    return loggedUser;
  }

  // Method to log in the user
  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Method to log out the user
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

// Create an instance of the AuthService class
export default new AuthService();
