import { useState } from "react";
import { BrowserRouter as Router } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppRoutes } from "./app/routes/AppRoutes";

export default function App() {

  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <AppRoutes
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <ToastContainer />
    </Router>
  );
}
