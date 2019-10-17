import * as http from "http";
import App from "./app";

const port = 3070;

App.set("port", port);

const server = http.createServer(App);
server.listen(port);

server.on("listening", (): void => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
});

module.exports = App;
