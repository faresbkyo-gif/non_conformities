import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('admin@fleet.com');
  const [password, setPassword] = useState('password');

  const submit = async (e) => { e.preventDefault(); await login(email, password); nav('/'); };
  return <form onSubmit={submit}><h2>Login</h2><input value={email} onChange={(e)=>setEmail(e.target.value)} /><input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} /><button>Login</button></form>;
}
