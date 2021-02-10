const fs = require('fs');
module.exports = (req, res) => {
  const list = req.heros.slice();
  const index = list.findIndex(task => task.id === req.params.id);
  if (index > -1) {
    for (const attr in req.body) {
      if (list[index].hasOwnProperty(attr)) {
        list[index][attr] = req.body[attr];
      }
    }
    try {
      fs.writeFileSync(req.filePath, JSON.stringify(list));
      res.status(200).json({
        code: 1,
        message: '修改成功'
      });
    } catch (error) {
      res.status(500).json({
        code: 0,
        message: '修改失败'
      });
    }
  } else {
    res.status(400).json({
      code: 0,
      message: 'hero不存在'
    });
  }
}
