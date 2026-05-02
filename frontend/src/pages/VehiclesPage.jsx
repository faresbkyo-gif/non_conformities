import { useEffect, useState } from 'react';
import api from '../services/api';
import VehicleForm from '../components/VehicleForm';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [clients, setClients] = useState([]);

  const load = () => {
    api.get('/vehicles').then((r) => setVehicles(r.data));
    api.get('/clients').then((r) => setClients(r.data));
  };
  useEffect(load, []);

  const createVehicle = async (form) => { await api.post('/vehicles', form); load(); };
  const remove = async (id) => { await api.delete(`/vehicles/${id}`); load(); };

  return <div><h2>Vehicles</h2><VehicleForm onSubmit={createVehicle} clients={clients} /><ul>{vehicles.map(v => <li key={v.id}>{v.plate_number} - {v.brand} {v.model} - Arrival: {v.arrival_date?.slice(0,10)} - Client: {v.client_name || 'None'} <button onClick={()=>remove(v.id)}>Delete</button></li>)}</ul></div>;
}
