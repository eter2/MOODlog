const weatherService = require('../services/weatherService');

exports.addWeather = async (req, res) => {
    try {

        const weather = await weatherService.addWeather(req.body);
        res.status(201).json(weather);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllWeather = async (req, res) => {
    try {
        const weathers = await weatherService.getAllWeather();
        res.status(200).json(weathers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getWeatherById = async (req, res) => {
    try {
        const { id } = req.params;
        const weather = await weatherService.getWeatherById(id);
        if (!weather) {
            return res.status(404).json({ message: 'Weather not found' });
        }
        res.status(200).json(weather);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateWeather = async (req, res) => {
    try {
        const updatedWeather = await weatherService.updateWeather(req.params.id, req.body);
        if (!updatedWeather) {
            return res.status(404).json({ message: 'Weather not found' });
        }
        res.status(200).json(updatedWeather);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteWeather = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWeather = await weatherService.deleteWeather(id);
        if (!deletedWeather) {
            return res.status(404).json({ message: 'Weather not found' });
        }
        res.status(200).json({ message: 'Weather deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
