import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; // Importar ProtectedRoute
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

const App = () => {

  const dispatch = useDispatch();
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  //const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/me", { withCredentials: true })
      .then((res) => {
        console.log("actualizando home...")
        console.log(res.data);
        if (res.data.user == null)
          throw new Error("No user data found");
        else {
          dispatch(
            loginSuccess({
              user: res.data.user,
              token: res.data.token,
            })
          );
          setLogged(true);
          console.log("usuario logeado")
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("usuario no logeado")
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>
  else return (
    <Router>
      {window.location.pathname !== '/login' && <NavBar />}
      <Routes>


        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Ruta protegida para el rol de administrador */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Users />
              <Consumptions />
              <Items />
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida para usuarios regulares */}
        <Route
          path="/editorCat"
          element={
            <ProtectedRoute allowedRoles={['editorCat']}>
              <Users />
              <Items />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editorAmb"
          element={
            <ProtectedRoute allowedRoles={['editorAmb']}>
              <Users />
              <Consumptions />

            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home logged={logged} />} />
      </Routes>

    </Router>
  );
};

export default App;
