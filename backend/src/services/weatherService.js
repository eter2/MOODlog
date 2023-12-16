const Weather = require('../models/Weather');

exports.addWeather = async (data) => {
    const weather = new Weather(data);
    return await weather.save();
};

exports.getAllWeather = async () => {
    return await Weather.find({});
};

exports.getWeatherById = async (id) => {
    return await Weather.findById(id);
};

exports.updateWeather = async (id, data) => {
    return await Weather.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteWeather = async (id) => {
    return await Weather.findByIdAndDelete(id);
};

exports.getWeatherByName = async (weather) => {
    return Weather.findOne({ weather_name: weather });
};