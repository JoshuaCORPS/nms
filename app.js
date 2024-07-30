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
  trans: {
    ffmpeg: "/usr/local/bin/ffmpeg", // Ensure ffmpeg is installed and provide the correct path
    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
      },
    ],
  },
};

var nms = new NodeMediaServer(config);
console.log(nms);
nms.run();
