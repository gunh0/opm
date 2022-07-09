var http = require("http");
var PORT = 8080;

console.log("SERVER START...", PORT);

http
  .createServer(function (request, response) {
    console.log("Request", request.url);
    var body = [];
    request
      .on("data", function (chunk) {
        body.push(chunk);
      })
      .on("end", function () {
        body = Buffer.concat(body).toString();
        response.end(body);
      });
  })
  .listen(PORT);
