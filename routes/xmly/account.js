const { account, authKey } = require('./config');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  jwt.sign(account, authKey, { expiresIn: '1day' }, (err, token) => {
    if (err) {
      res.status(407).send({
        ret: 0,
        message: 'Token 生成失败',
        data: {}
      });
    } else {
      res.status(200).json({
        ret: 200,
        msg: 'success',
        data: {
          user: account,
          token
        }
      });
    }
  });
}

