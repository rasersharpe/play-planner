// Importing Outlet for nested routing
import { Outlet } from "react-router-dom";

// Importing components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="main__container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
