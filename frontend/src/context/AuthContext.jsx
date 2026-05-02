import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
  };

  return <AuthContext.Provider value={{ token, login }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
