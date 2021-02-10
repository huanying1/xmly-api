const request = require('request');
const { stringify } = require('qs');
const { BASE_URL } = require('./config');
const baseQuery = {
  category: 'waiyu',
  subcategory: '',
  meta: '',
  sort: 0,
  page: 1,
  perPage: 10,
}
module.exports = (req, res) => {
  const query = { ...baseQuery, ...req.query };
  const url = `${BASE_URL}/category/queryCategoryPageAlbums?${stringify(query)}`;
  request({
    url,
    headers: {
      'xm-sign': req.sign
    }
  }, function (error, response, body) {
    if (error) {
      res.status(500).json({
        ret: 0,
        message: '专辑列表请求失败',
        data: error
      });
    } else {
      res.status(response.statusCode).json(JSON.parse(body))
    }
  });
}

