/* eslint-disable import/order */
const app = require("./app");
const http = require("http").createServer(app);
const io = require("socket.io")(http);


io.on("connection", (socket) => {
  console.log("beforesockekId", socket.id);
  socket.id = "testidedd";
  console.log("aftersockekId", socket.id);
  socket.on("send-message", (data) => {
    console.log("data test", data);
    socket.broadcast.emit("received-message", data);
  });
});

http.listen(4040, () => {
  console.log("listening on 4040");
});
