const request = require('request');
const { stringify } = require('qs');
const { BASE_URL } = require('../config');
const baseQuery = {
  albumId: '',
  sort: 1,
  pageNum: 1,
  pageSize: 10
}
module.exports = (req, res) => {
  const query = { ...baseQuery, ...req.query };
  const url = `${BASE_URL}/album/v1/getTracksList?${stringify(query)}`;
  request({
    url,
    headers: {
      'xm-sign': req.sign
    }
  }, function (error, response, body) {
    if (error) {
      res.status(500).json({
        ret: 0,
        message: '专辑播放列表请求失败',
        data: error
      });
    } else {
      res.status(response.statusCode).json(JSON.parse(body))
    }
  });
}

