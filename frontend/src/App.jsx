import { Navigate, Route, Routes, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import VehiclesPage from './pages/VehiclesPage';

function Protected({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to='/login' />;
}

export default function App() {
  return (
    <>
      <nav><Link to='/'>Dashboard</Link> | <Link to='/vehicles'>Vehicles</Link></nav>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<Protected><DashboardPage /></Protected>} />
        <Route path='/vehicles' element={<Protected><VehiclesPage /></Protected>} />
      </Routes>
    </>
  );
}
