import { useEffect, useState } from 'react';
import api from '../services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({ total:0, assigned:0, available:0 });
  useEffect(() => { api.get('/dashboard/stats').then((r) => setStats(r.data)); }, []);
  return <div><h2>Dashboard</h2><p>Total: {stats.total}</p><p>Assigned: {stats.assigned}</p><p>Available: {stats.available}</p></div>;
}
