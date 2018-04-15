var http = require('http');
const PORT = process.env.PORT;

var server = http.createServer(function(req, res) {
res.writeHead(200);
res.end('Hi everybody!');
});
server.listen(PORT);
