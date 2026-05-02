const vehicleRepository = require('../../infrastructure/repositories/vehicleRepository');

async function list(req, res) {
  res.json(await vehicleRepository.list());
}

async function create(req, res) {
  const vehicle = await vehicleRepository.create(req.body);
  res.status(201).json(vehicle);
}

async function update(req, res) {
  const vehicle = await vehicleRepository.update(req.params.id, req.body);
  if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
  res.json(vehicle);
}

async function remove(req, res) {
  const deleted = await vehicleRepository.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Vehicle not found' });
  res.status(204).send();
}

async function stats(req, res) {
  res.json(await vehicleRepository.stats());
}

module.exports = { list, create, update, remove, stats };
