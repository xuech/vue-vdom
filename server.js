const http = require('http')
const optios = [
  {
    label: '肉类',
    children: [
      {
        label: '猪肉',
        children: [
          {
            label: '五花肉',
          },
          {
            label: '里脊肉',
          },
        ],
      },
    ],
  },
  {
    label: '乳类',
    children: [
      {
        label: '牛奶',
        children: [
          {
            label: '伊犁',
          },
          {
            label: '蒙牛',
          },
        ],
      },
    ],
  },
]
let server = http.createServer(function (req, res) {
  res.setHeader("Content-type","application/json");
  res.setHeader("Access-Control-Allow-Origin","*");
  if (req.url === '/api/foods') {
    res.end(JSON.stringify(optios))
  } else {
    res.end('404')
  }
})
server.listen(3000, () => {
  console.log('服务器启动');
})