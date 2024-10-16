import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginSuccess } from "../state/authSlice";
import { Button, Input } from "@nextui-org/react";

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

  // Función que maneja la detección de la tecla Enter
  const keyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(); // Ejecutar la función de inicio de sesión
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="max-w-[400px] w-full bg-[#c9cbcf] p-6 rounded-[20px] flex  flex-col justify-center">
        <div className="flex justify-center mt-6 mb-6">
          <h1>Login</h1>
        </div>
        <div className=" flex p-4 flex-col w-full">
          <Input
            className="mb-2"
            type="email"
            value={email}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6"
            onKeyDown={(e) => keyPress(e)} // Detectar la tecla Enter
          />
          <Button className="bg-[#1594d3] text-white" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
