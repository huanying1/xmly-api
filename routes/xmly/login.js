const { account, authKey } = require('./config');
const jwt = require('jsonwebtoken');
module.exports = (req, res) => {
  if (req.body.phone === account.phone && req.body.password === account.password) {
    jwt.sign(account, authKey, { expiresIn: '1day' }, (err, token) => {
      if (err) {
        res.status(407).json({
          ret: 0,
          message: 'Token 生成失败',
          data: {}
        });
      } else {
        res.status(200).json({
          ret: 200,
          msg: '登陆成功',
          data: {
            user: account,
            token
          }
        });
      }
    });
  } else {
    res.status(406).send({
      ret: 0,
      message: '用户名密码错误',
      data: {}
    });
  }
}

