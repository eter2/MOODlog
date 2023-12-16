const emotionService = require('../services/emotionService');

exports.createEmotion = async (req, res) => {
    try {
        const emotion = await emotionService.createEmotion(req.body);
        res.status(201).json(emotion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getEmotion = async (req, res) => {
    try {
        const emotion = await emotionService.getEmotionById(req.params.id);
        if (!emotion) return res.status(404).send('Emotion not found');
        res.json(emotion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllEmotions = async (req, res) => {
    try {
        const emotions = await emotionService.getAllEmotions();
        res.json(emotions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEmotion = async (req, res) => {
    try {
        const updatedEmotion = await emotionService.updateEmotion(req.params.id, req.body);
        if (!updatedEmotion) return res.status(404).send('Emotion not found');
        res.json(updatedEmotion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteEmotion = async (req, res) => {
    try {
        const emotion = await emotionService.deleteEmotion(req.params.id);
        if (!emotion) return res.status(404).send('Emotion not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
