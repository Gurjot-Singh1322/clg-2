import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import AuthContainer from "../Components/auth/AuthContainer";
import AuthCard from "../Components/auth/AuthCard";
import AuthInput from "../Components/auth/AuthInput";
import AuthButton from "../Components/auth/AuthButton";
import AuthSwitch from "../Components/auth/AuthSwitch";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // 🔥 IMPORTANT

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200 || res.status === 201) {

        login(data.user, data.token);

        if (data.user.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error",err);
    }
  };

  return (
    <AuthContainer>
      <AuthCard title="Login">

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          <AuthInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <AuthButton text="Login" />
        </form>

        {/* Switch */}
        <AuthSwitch
          text="Don't have an account?"
          linkText="Register"
          to="/register"
        />

      </AuthCard>
    </AuthContainer>
  );
};

export default Login;