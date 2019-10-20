"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var app_1 = require("./app");
var port = 3070;
app_1.default.set("port", port);
var server = http.createServer(app_1.default);
server.listen(port);
server.on("listening", function () {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
});
module.exports = app_1.default;
//# sourceMappingURL=index.js.map