import { useState } from 'react';

export default function VehicleForm({ onSubmit, clients, initial }) {
  const [form, setForm] = useState(initial || { plateNumber:'', brand:'', model:'', arrivalDate:'', clientId:'' });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); setForm({ plateNumber:'', brand:'', model:'', arrivalDate:'', clientId:'' }); }}>
      <input placeholder='Plate' value={form.plateNumber} onChange={(e)=>setForm({...form, plateNumber:e.target.value})} required />
      <input placeholder='Brand' value={form.brand} onChange={(e)=>setForm({...form, brand:e.target.value})} required />
      <input placeholder='Model' value={form.model} onChange={(e)=>setForm({...form, model:e.target.value})} required />
      <input type='date' value={form.arrivalDate} onChange={(e)=>setForm({...form, arrivalDate:e.target.value})} required />
      <select value={form.clientId} onChange={(e)=>setForm({...form, clientId:e.target.value})}>
        <option value=''>Unassigned</option>
        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <button type='submit'>Save Vehicle</button>
    </form>
  );
}
