const NodeMediaServer = require("node-media-server");

const config = {
  rtmp: {
    port: 1935, // RTMP port remains static as Heroku does not dynamically assign this
    chunk_size: 60000,
    gop_cache: false,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: process.env.PORT || 8000, // HTTP server binds to the port specified by the $PORT environment variable
    allow_origin: "*",
  },
};

var nms = new NodeMediaServer(config);
console.log(nms);
nms.run();
