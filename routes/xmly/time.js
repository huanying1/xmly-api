const { random } = require('lodash');
const request = require('request');
const { BASE_URL } = require('./config');

module.exports = (req, res) => {
  const url = BASE_URL + '/time';
  request(url, function (error, response, body) {
    if (error) {
      res.status(500).json({
        ret: 0,
        message: '时间戳请求失败',
        data: error
      });
    } else {
      const sign = getSign(body);
      console.log('sign', sign);
      res.status(response.statusCode).json({
        ret: 0,
        message: 'ok',
        data: sign
      })
    }
  });
}

// (ximalaya-服务器时间戳) +(100以内的随机数) + 服务器时间戳 + (100以内的随机数) + 现在的时间戳
function getSign(time) {
  const md5 = `ximalaya-${time}`;
  return `${md5}(${random(0, 100)})${time}(${random(0, 100)})${Date.now()}`;
}
