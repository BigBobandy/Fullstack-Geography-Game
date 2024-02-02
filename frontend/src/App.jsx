import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AuthSuccess from "./components/Auth/AuthSuccess";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";

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
