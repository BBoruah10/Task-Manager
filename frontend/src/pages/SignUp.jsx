// src/pages/SignUp.jsx
import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await signup(form);
      navigate("/"); // go to main app
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          err.message ||
          "Signup failed"
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full name"
          value={form.fullname}
          onChange={(e) => setForm({ ...form, fullname: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit" disabled={busy}>
          {busy ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
