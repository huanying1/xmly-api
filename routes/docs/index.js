const express = require('express');
const router = express.Router({ caseSensitive: true });
router.get('/', (req, res) => {
  res.render('index');
}).get('/xmly', (req, res) => {
  res.render('xmly');
}).get('/hero', (req, res) => {
  res.render('hero');
});
module.exports = router;
