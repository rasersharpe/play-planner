// Importing React and ReactDOM for rendering the application
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importing global styles
import "./reset.css";
import "./styles.css";

// Importing components and pages
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";
import WishList from "./pages/WishList.tsx";
import PlayedGames from "./pages/PlayedGames.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";

// Defining the routes for the application
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/wishlist",
        element: <WishList />,
      },
      {
        path: "/played",
        element: <PlayedGames />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

// Rendering the application using ReactDOM
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
