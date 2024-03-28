import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AuthSuccess from "./components/Auth/AuthSuccess";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import Home from "./components/Pages/Home.jsx";
import Login from "./components/Pages/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
