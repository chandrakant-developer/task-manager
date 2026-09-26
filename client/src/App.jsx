import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Spinner } from './components';
import { TaskPage, RegisterPage, LoginPage, HomePage } from './pages';
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchListThunk, createListThunk, deleteListThunk } from "./store/thunks/list.thunk";
import { fetchTagThunk, createTagThunk, deleteTagThunk } from "./store/thunks/tag.thunk";
import { restoreSessionThunk } from "./store/thunks/auth.thunk";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const isAuthRoute = location.pathname === '/register' || location.pathname === '/login';
  const isLandingRoute = location.pathname === '/';

  useEffect(() => {
    if (!user) return;
    
    async function fetchData () {
      try {
        await dispatch(fetchListThunk());
        await dispatch(fetchTagThunk());
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, [user]);

  useEffect(() => { 
    async function restoreSession() {
      try {
        await dispatch(restoreSessionThunk());
      } catch (error) {
        console.log("Session restore failed");
      } finally {
        setLoading(false);
      }
    }

    restoreSession();    
  }, []);

  useEffect(() => {
     if(loading) return;

    if(!user && !isAuthRoute && !isLandingRoute) {
      navigate("/login");
    }

    if(user && isAuthRoute) {
      navigate("/tasks", { replace: true });
    }
  }, [user, loading, isAuthRoute, isLandingRoute, navigate]);

  if(loading && !isAuthRoute) {
    return (
      <Spinner />
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {isAuthRoute && (
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}

      {isLandingRoute && (
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      )}

      {!isAuthRoute && !isLandingRoute && (
        <div className="flex min-h-screen bg-[linear-gradient(135deg,#eef2ff_0%,#f0f9ff_50%,#f8fafc_100%)] bg-fixed">
          <main className="flex flex-1 relative h-screen overflow-hidden ml-[calc(320px+1rem)] min-w-0 max-w-full max-md:ml-0">
            <Routes>
              <Route path="/tasks" element={<TaskPage />} />
            </Routes>
          </main>
        </div>
      )}
    </>
  );
}

export default App;