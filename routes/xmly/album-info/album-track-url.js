const request = require('request');
const { BASE_URL } = require('../config');
const { stringify } = require('qs');
module.exports = (req, res) => {
  const query = { ptype: 1, id: req.params.trackId };
  const url = `${BASE_URL}/play/v1/audio?${stringify(query)}`;
  request({
    url,
    headers: {
      'xm-sign': req.sign
    }
  }, function (error, response, body) {
    if (error) {
      res.status(500).json({
        ret: 0,
        message: '专辑评分请求失败',
        data: error
      });
    } else {
      res.status(response.statusCode).json(JSON.parse(body))
    }
  });
}

