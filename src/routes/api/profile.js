const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ profile: 'success' });
})

module.exports = router;