const express = require('express');
const emotionController = require('../src/controllers/emotionController');
const router = express.Router();

router.post('/emotions', emotionController.createEmotion);
router.get('/emotion/:id', emotionController.getEmotion);
router.get('/emotions', emotionController.getAllEmotions);
router.put('/emotions/:id', emotionController.updateEmotion);
router.delete('/emotions/:id', emotionController.deleteEmotion);

module.exports = router;