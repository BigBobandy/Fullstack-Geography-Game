import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AuthSuccess from "./components/Auth/AuthSuccess";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";

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
