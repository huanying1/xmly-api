const { authKey } = require('./config');
const jwt = require('jsonwebtoken');
module.exports = (req, res) => {
  const target = req.heros.find(item => item.name === req.body.name);
  if (target) {
    if (req.body.name === target.name && req.body.password === target.password) {
      jwt.sign(target, authKey, { expiresIn: '1day' }, (err, token) => {
        if (err) {
          res.status(407).json({
            code: 0,
            message: 'Token 生成失败',
            data: {}
          });
        } else {
          res.status(200).json({
            code: 200,
            msg: '登陆成功',
            data: {
              user: target,
              token
            }
          });
        }
      });
    } else {
      res.status(406).send({
        code: 0,
        message: '用户名密码错误',
        data: {}
      });
    }
  } else {
    res.status(406).send({
      code: 0,
      message: '没有该hero，请联系盖伦',
      data: {}
    });
  }
}
