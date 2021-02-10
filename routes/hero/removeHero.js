const fs = require('fs');
module.exports = (req, res) => {
  const list = req.heros.slice();
  const index = list.findIndex(task => task.id === req.params.id);
  if (index > -1) {
    list.splice(index, 1);
    try {
      fs.writeFileSync(req.filePath, JSON.stringify(list));
      res.status(200).json({
        code: 1,
        message: '删除成功'
      });
    } catch (error) {
      res.status(500).json({
        code: 0,
        message: '删除失败'
      });
    }
  } else {
    res.status(400).json({
      code: 0,
      message: '任务不存在'
    });
  }
}
