const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');
const vehicleController = require('../controllers/vehicleController');
const clientController = require('../controllers/clientController');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

router.use(authMiddleware);
router.get('/vehicles', vehicleController.list);
router.post('/vehicles', vehicleController.create);
router.put('/vehicles/:id', vehicleController.update);
router.delete('/vehicles/:id', vehicleController.remove);
router.get('/dashboard/stats', vehicleController.stats);
router.get('/clients', clientController.list);

module.exports = router;
