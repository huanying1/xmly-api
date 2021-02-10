const { omit } = require('lodash');

module.exports = (req, res) => {
  const target = req.heros.find(item => item.id === req.params.id);
  if (target) {
    res.status(200).json({
      code: 1,
      message: 'success',
      data: omit(target, 'password')
    });
  } else {
    res.status(400).json({
      code: 0,
      message: 'hero不存在'
    });
  }
}
