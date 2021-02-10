const getSign = require('./sign');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router({ caseSensitive: true });
const breadcrumb = require('./breadcrumb');
const time = require('./time');
const categories = require('./categories');
const albums = require('./albums');
const album = require('./album-info/album');
const albumTracks = require('./album-info/album-tracks');
const albumRelate = require('./album-info/album-relation');
const albumScore = require('./album-info/album-score');
const albumTrackUrl = require('./album-info/album-track-url');
const login = require('./login');
const accountInfo = require('./account');
const logout = require('./logout');
const { authKey, account } = require('./config');
const needTokenRoutes = ['/account', '/logout'];
router.use(async (req, res, next) => {
  const auth = req.headers[authKey];
  if(auth) {
    jwt.verify(auth, authKey, (err, decode) => {
      if (err) {  //  时间失效或伪造的token
        res.status(401).send({
          ret: 0,
          message: 'Token 失效',
          data: null
        })
      } else {
        if (decode.phone !== account.phone || decode.password !== account.password) {
          res.status(402).send({
            ret: 0,
            message: 'Token信息不正确',
            data: null
          });
        } else {
          next();
        }
      }
    });
  } else {
    if (needTokenRoutes.includes(req.url)) {
      res.status(403).send({
        ret: 0,
        message: '无权限',
        data: null
      })
    } else {
      try {
        const sign = await getSign();
        // console.log('sign', sign);
        req.sign = sign;
        next();
      } catch (error) {
        res.status(403).send({
          ret: 0,
          message: '获取sign失败',
          data: null
        })
      }
    }
  }
}).get('/breadcrumb', breadcrumb)
  .get('/time', time)
  .get('/categories', categories)
  .get('/albums', albums)
  .get('/album', album)
  .get('/album-tracks', albumTracks)
  .get('/album-relate', albumRelate)
  .get('/album-score/:albumId', albumScore)
  .get('/album-track-url/:trackId', albumTrackUrl)
  .post('/login', login)
  .get('/account', accountInfo)
  .get('/logout', logout);
module.exports = router;
