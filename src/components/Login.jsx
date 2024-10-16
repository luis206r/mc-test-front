import React, { useState } from "react";
import { useDispatch } from "react-redux";
//import { loginSuccess } from "./authSlice"; // Importar la acción de login
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importar Axios
import { loginSuccess } from "../state/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const data = response.data;
      if (data.token) {
        localStorage.setItem("token", data.token); // Guardar el token JWT

        // Enviar acción a Redux para actualizar el estado del usuario
        dispatch(
          loginSuccess({
            user: data.user,
            token: data.token,
          })
        );

        if (data.user.roles.includes("admin")) navigate("/admin");
        else if (data.user.roles.includes("editorCat")) navigate("/editorCat");
        else if (data.user.roles.includes("editorAmb")) navigate("/editorAmb");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
