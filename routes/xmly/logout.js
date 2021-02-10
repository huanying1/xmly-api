module.exports = (req, res) => {
  res.status(200).json({
    ret: 200,
    msg: '退出成功',
    data: {}
  });
}

