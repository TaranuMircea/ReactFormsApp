import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".hamburger-btn")
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button - Only visible on mobile */}
      <button
        className="hamburger-btn"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span className={isOpen ? "active" : ""}></span>
        <span className={isOpen ? "active" : ""}></span>
        <span className={isOpen ? "active" : ""}></span>
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div className="sidebar-backdrop" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <RouterLink to="/" className="nav-logo" onClick={closeSidebar}>
            <img
              src="/image/logo.png"
              alt="Perlego Logo"
              className="logo-img"
            />
            <span>Perlego</span>
          </RouterLink>
          <p className="sidebar-subtitle">Admin Panel</p>
        </div>

        <nav className="sidebar-nav">
          <RouterLink
            to="/survey"
            className="sidebar-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeSidebar}
          >
            <span>Previzualizare Sondaj</span>
          </RouterLink>

          <RouterLink
            to="/"
            className="sidebar-link"
            target="_blank"
            onClick={closeSidebar}
          >
            <span>Pagină Publică</span>
          </RouterLink>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-sidebar-btn">
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
