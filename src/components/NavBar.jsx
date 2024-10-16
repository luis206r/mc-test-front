import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const logout = () => {
    axios
      .post(
        "http://localhost:3001/api/users/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };
  return <button onClick={logout}>Logout</button>;
};

export default NavBar;
