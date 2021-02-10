const express = require('express')
const router = express.Router({ caseSensitive: true })
const hero = require('./hero')
const xmly = require('./xmly')
const docs = require('./docs')
router.use('/hero', hero);
router.use('/xmly', xmly);
router.use('/docs', docs);
module.exports = router
