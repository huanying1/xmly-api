const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const routes = require('./routes');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

/*app.use((req, res, next) => {
  if(req.path !== '/' && !req.path.includes('.')){
    res.set({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8'
    })
  }
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})*/

app.use('/', routes);

app.use(function (req, res) {
  res.redirect(301, '/docs');
});

app.use(function (err, req, res, next) {
  res.status(500).json('something wrong');
});
app.listen(PORT, function () {
  console.log('Listen at http://localhost:3333/docs')
});
