import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components';
import { TaskPage, SettingsPage, RegisterPage, LoginPage, HomePage } from './pages';
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./store/slices/auth.slice";
import { setList } from "./store/slices/listSlice";
import { setTag } from "./store/slices/tagSlice";
import { userAPI, getListsAPI, getTagsAPI } from "./services/api";
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
    if(!user) return;

    const fetchData = async () => {
      try {
        const [lists, tags] = await Promise.all([
          getListsAPI(user.userId),
          getTagsAPI(user.userId),
        ]);

        dispatch(setList(lists.data));
        dispatch(setTag(tags.data));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, [user]);

  useEffect(() => { 
    async function restoreSession() {
      try {
        const data = await userAPI();
        dispatch(setUser(data));
      } catch (error) {
        dispatch(clearUser());
      } finally {
        setLoading(false);
      }
    }

    restoreSession();    
  }, [dispatch, isAuthRoute]);

  useEffect(() => {
    if(loading) return;

    if(!user && !isAuthRoute && !isLandingRoute) {
      navigate("/login");
    }

    if(user && isAuthRoute) {
      navigate("/tasks");
    }
  }, [user, loading, isAuthRoute, isLandingRoute, navigate]);

  if(loading && !isAuthRoute) return null;

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
          <Sidebar />

          <main className="flex flex-1 relative h-screen overflow-hidden ml-[calc(320px+1rem)] min-w-0 max-w-full max-md:ml-0">
            <Routes>
              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/settings" element={<SettingsPage onClose={() => navigate('/tasks')} />} />
            </Routes>
          </main>
        </div>
      )}
    </>
  );
}

export default App;