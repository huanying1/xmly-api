const fs = require('fs');
const { GENDER, JOB } = require('./config');
module.exports = (req, res) => {
  const list = req.heros || [];
  const id = 'hero_' + Math.floor(Math.random() * 1000).toString() + Date.now()
  list.unshift({
    id,
    password: 'hero888',
    createTime: Date.now(),
    role: 'user',
    genderText: GENDER[req.body.gender],
    jobText: JOB[req.body.job],
    ...req.body
  });
  try {
    fs.writeFileSync(req.filePath, JSON.stringify(list));
    res.status(200).json({
      code: 1,
      message: '新增成功'
    });
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: '新增失败'
    })
  }
}
