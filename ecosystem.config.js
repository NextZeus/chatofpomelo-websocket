module.exports = {
    apps : [{
      name          : "game-server",
      script        : "game-server/app.js",
      exec_mode     : "fork",
      env: {
        "NODE_ENV"  : "development",
      },
      env_production    : {
         "NODE_ENV": "production"
      }
    },
    {
      name       : "web-server",
      script     : "web-server/app.js",
      instances  : 1,
      exec_mode  : "fork"
    }]
}