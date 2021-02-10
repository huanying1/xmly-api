const request = require('request');
const { BASE_URL } = require('./config');

module.exports = (req, res) => {
  const categoryId = req.query.categoryId || '';
  const url = BASE_URL + '/category/breadcrumbCategoryInfo?categoryId=' + categoryId;
  // console.log('req.sign', req.sign);
  request({
    url,
    headers: {
      'xm-sign': req.sign
    }
  }, (error, response, body) => {
    if (error) {
      console.log('error aa', error);
      res.status(500).json({
        ret: 0,
        message: '面包屑请求失败',
        data: error
      });
    } else {
      // console.log('bbb', body);
      res.status(response.statusCode).json(JSON.parse(body));
    }
  });
}

