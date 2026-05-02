const clientRepository = require('../../infrastructure/repositories/clientRepository');

async function list(req, res) {
  res.json(await clientRepository.list());
}

module.exports = { list };
