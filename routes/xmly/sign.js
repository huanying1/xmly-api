const { random } = require('lodash');
const md5 = require('blueimp-md5');
const { BASE_URL } = require('./config');
const request = require('request');

module.exports = function () {
  const url = BASE_URL + '/time';
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject({
          ret: 0,
          message: '时间戳请求失败',
          data: error
        })
      } else {
        resolve(transformSign(body));
      }
    });
  });
}

// (ximalaya-服务器时间戳) +(100以内的随机数) + 服务器时间戳 + (100以内的随机数) + 现在的时间戳
function transformSign(time) {
  return `${md5(`himalaya-${time}`)}(${random(0, 100)})${time}(${random(0, 100)})${Date.now()}`;
}


