import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuth } from "../state/authSlice";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Users from "./Users";
import Consumptions from "./Consumptions";
import Items from "./Items";
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

  const isAdminOrEditorCat =
    auth.user.roles.includes("editorCat") || auth.user.roles.includes("admin");
  const isAdminOrEditorAmb =
    auth.user.roles.includes("editorAmb") || auth.user.roles.includes("admin");
  return (
    <div className="w-full flex">
      <Accordion>
        <AccordionItem key="1" aria-label="Users" title="Usuarios">
          {<Users />}
        </AccordionItem>
        {isAdminOrEditorAmb && (
          <AccordionItem key="2" aria-label="Consumptions" title="Consumos">
            {<Consumptions />}
          </AccordionItem>
        )}
        {isAdminOrEditorCat && (
          <AccordionItem key="3" aria-label="Items" title="Items">
            {<Items />}
          </AccordionItem>
        )}
      </Accordion>
    </div>
  ); // Si el usuario tiene el rol adecuado, renderizar el componente
};

export default ProtectedRoute;
