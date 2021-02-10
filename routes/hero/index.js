const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const express = require('express');
const router = express.Router({ caseSensitive: true });
const { authKey } = require('./config');
const list = require('./list');
const detail = require('./detail');
const add = require('./addHero');
const modify = require('./modifyHero');
const remove = require('./removeHero');
const login = require('./login');
const account = require('./account');
const logout = require('./logout');
const needTokenRoutes = ['/add', '/modify', '/remove', '/account'];
router.use((req, res, next) => {
  req.filePath = path.join(__dirname, '../../', 'hero.json');
  try {
    const heros = fs.readFileSync(req.filePath);
    const result = heros.toString().length === 0 ? "[]" : heros.toString()
    req.heros = JSON.parse(result);
    next();
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: error
    });
  }
}).use((req, res, next) => {
  const auth = req.headers[authKey];
  if(auth) {
    jwt.verify(auth, authKey, (err, decode) => {
      if (err) {  //  时间失效或伪造的token
        res.status(401).send({
          code: 0,
          message: 'Token 失效',
          data: null
        })
      } else {
        const target = req.heros.find(item => item.name === decode.name);
        if (target) {
          if (decode.name !== target.name || decode.password !== target.password) {
            res.status(402).send({
              code: 0,
              message: 'Token信息不正确',
              data: null
            });
          } else {
            req.currentUser = target
            next();
          }
        } else {
          res.status(402).send({
            code: 0,
            message: 'Token信息不正确',
            data: null
          });
        }
      }
    });
  } else {
    if (needTokenRoutes.includes(req.url)) {
      res.status(403).send({
        code: 0,
        message: '无权限',
        data: null
      })
    } else {
      next();
    }
  }
}).get('/list', list)
  .get('/detail/:id', detail)
  .post('/add', (req, res, next) => {
    let errMsg = checkParams(req);
    if (req.heros.find(item => item.name === req.body.name)) {
      errMsg = '该英雄已存在';
    }
    if (errMsg) {
      res.status(400).json({
        code: 0,
        message: errMsg
      })
    } else {
      next();
    }
  }, add)
  .patch('/modify/:id', (req, res, next) => {
    const errMsg = checkParams(req);
    if (errMsg) {
      res.status(400).json({
        code: 0,
        message: errMsg
      })
    } else {
      next();
    }
  }, modify)
  .delete('/remove/:id', remove)
  .post('/login', login)
  .get('/account', account)
  .get('/logout', logout);
module.exports = router;

const checkFields = ['name', 'job', 'phone'];
const phoneReg = /^1\d{10}$/;

function checkParams(req) {
  const body = req.body;
  let errMsg = '';
  for (const item of checkFields) {
    if (!body[item]) {
      errMsg = item + '不能为空';
      break;
    }
    if (item === 'phone') {
      if (!phoneReg.test(body.phone)) {
        errMsg = '手机格式不正确';
        break;
      }
    }
  }
  return errMsg;
}
