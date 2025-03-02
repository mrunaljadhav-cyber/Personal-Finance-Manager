import Cookies from "js-cookie";
import { useDispatch ,useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { Routes, Route,Navigate} from "react-router-dom";
import { setUser } from "./store/auth.js";
import NavBar from "./components/NavBar.js";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useCallback } from "react";
import { logOut } from "./store/auth.js";
import "./App.css"; 

function App() {
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 

  const fetchUser = useCallback(async () => {   
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const user = await res.json();
        dispatch(setUser(user));
      } else {
        dispatch(logOut());
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch(logOut());
    }
    setIsLoading(false);
  }, [token, dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Home /> : <Navigate to="/login" />
        } />
        <Route path="/login" element={
          !isAuthenticated ? <Login /> : <Navigate to="/" />
        } />
        <Route path="/register" element={
          !isAuthenticated ? <Register /> : <Navigate to="/" />
        } />
        <Route path="/dashboard" element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
        } />
      </Routes>
    </>
  );
}
export default App;