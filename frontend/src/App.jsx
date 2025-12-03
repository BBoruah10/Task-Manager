// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      {!user && <Link to="/signup">Sign Up</Link>}
      {!user && <Link to="/signin">Sign In</Link>}
      {user && (
        <>
          <span className="welcome">Welcome, {user.fullname}</span>
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="app-container">
                  <h1 className="app-title">Task Manager</h1>
                  <TaskForm />
                  <hr className="divider" />
                  <TaskList />
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
