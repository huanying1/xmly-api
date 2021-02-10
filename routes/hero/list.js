const { isEmpty, filter, sortBy } = require('lodash')
const checkFields = ['name', 'job']
module.exports = (req, res) => {
  let result = req.heros.slice();
  const needChecks = {}
  checkFields.forEach(item => {
    const value = req.query[item];
    if (value && value !== 0) {
      needChecks[item] = req.query[item];
    }
  });
  const sort = req.query.sort || 'asc';
  if (!isEmpty(needChecks)) {
    result = filter(result.slice(), needChecks);
  }
  const sortType = sort === 'asc' ? 'createTime' : '-createTime'; // 默认升序(asc), -createTime降序
  res.status(200).json({
    code: 1,
    message: 'success',
    data: sortBy(result, sortType)
  });
}
