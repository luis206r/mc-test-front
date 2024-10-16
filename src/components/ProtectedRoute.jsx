import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuth } from "../state/authSlice";
//import { selectAuth } from "./authSlice"; // Selector para obtener el estado de auth

const ProtectedRoute = ({ children, allowedRoles }) => {
  const auth = useSelector((state) => state.auth);

  const { user, isAuthenticated } = useSelector(selectAuth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirigir a login si no está autenticado
  }

  if (!auth.user.roles.includes(allowedRoles[0])) {
    return <Navigate to="/unauthorized" />; // Redirigir si no tiene permisos
  }

  return children; // Si el usuario tiene el rol adecuado, renderizar el componente
};

export default ProtectedRoute;
