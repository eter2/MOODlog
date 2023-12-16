const express = require('express');
const router = express.Router();
const weatherController = require('../src/controllers/weatherController');

router.post('/weather', weatherController.addWeather);
router.get('/weather', weatherController.getAllWeather);
router.get('/weather/:id', weatherController.getWeatherById);
router.put('/weather/:id', weatherController.updateWeather);
router.delete('/weather/:id', weatherController.deleteWeather);

module.exports = router;
