import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = ({ logged }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!logged) {
      navigate("/login");
    } else {
      setLoading(false);
      if (auth.user.roles.includes("admin")) navigate("/admin");
      else if (auth.user.roles.includes("editorCat")) navigate("/editorCat");
      else if (auth.user.roles.includes("editorAmb")) navigate("/editorAmb");
    }
  }, [logged]);
  if (loading) return <div>Loading...</div>;
  return <div>Home</div>;
};

export default Home;
