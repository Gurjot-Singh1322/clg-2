import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import AuthContainer from "../Components/auth/AuthContainer";
import AuthCard from "../Components/auth/AuthCard";
import AuthInput from "../Components/auth/AuthInput";
import AuthButton from "../Components/auth/AuthButton";
import AuthSwitch from "../Components/auth/AuthSwitch";
import { BASE_URL } from "../utils/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ MOVED HERE

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.status === 200 || res.status === 201) {
        login(data.user, data.token); 
        navigate("/", { replace: true });
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error",err);
    }
  };

  return (
    <AuthContainer>
      <AuthCard title="Register">

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleRegister}>
          <AuthInput
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <AuthButton text="Register" />
        </form>

        <AuthSwitch
          text="Already have an account?"
          linkText="Login"
          to="/login"
        />

      </AuthCard>
    </AuthContainer>
  );
};

export default Register;