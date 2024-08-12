const express = require('express');
const router = express.Router();
const { getLuggages, setLuggage, updateLuggage, deleteLuggage } = require('../controllers/luggageController')

router.get('/', getLuggages)

router.post('/', setLuggage)

router.put('/:id', updateLuggage)

router.delete('/:id', deleteLuggage)

module.exports = router