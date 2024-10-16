import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import UnauthorizedPage from './components/UnauthorizedPage';
import Home from './components/Home';
import { useDispatch } from 'react-redux';
import Consumptions from './components/Consumptions';
import Items from './components/Items';
import axios from 'axios';
import { loginSuccess } from './state/authSlice';
import Users from './components/Users';
import NavBar from './components/NavBar';
import "./App.css";

const MainApp = () => {
  const dispatch = useDispatch();
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Ahora se usa correctamente dentro del Router

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/me", { withCredentials: true })
      .then((res) => {
        console.log("actualizando home...");
        if (res.data.user == null) {
          throw new Error("No user data found");
        } else {
          dispatch(
            loginSuccess({
              user: res.data.user,
              token: res.data.token,
            })
          );
          setLogged(true);
          console.log("usuario logeado");
        }
      })
      .catch((err) => {
        console.log("usuario no logeado");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='app'>
      {/* Mostrar la Navbar solo si la ruta no es "/login" */}
      {location.pathname !== '/login' && <NavBar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']} />
          }
        />

        <Route
          path="/editorCat"
          element={
            <ProtectedRoute allowedRoles={['editorCat']} />
          }
        />

        <Route
          path="/editorAmb"
          element={
            <ProtectedRoute allowedRoles={['editorAmb']} />
          }
        />

        <Route path="/" element={<Home logged={logged} />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <MainApp />
    </Router>
  );
};

export default App;
