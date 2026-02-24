import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/AdminLayout";
import Home from "./pages/Home";
import SurveyForm from "./pages/SurveyForm";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <div className="public-layout">
                <Navbar />
                <div className="container">
                  <Home />
                </div>
                <Footer />
              </div>
            }
          />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/survey"
            element={
              <div className="public-layout">
                <Navbar />
                <div className="container">
                  <SurveyForm />
                </div>
                <Footer />
              </div>
            }
          />

          <Route
            path="/login"
            element={
              <div className="public-layout">
                <Navbar />
                <div className="container">
                  <Login />
                </div>
                <Footer />
              </div>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
