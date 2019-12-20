const mapdata = require("../../static/data/map");
const scenedata = require("../../static/data/scene");
const sounddata = require("../../static/data/sound");

module.exports = function (server) {
  const io = require('socket.io')(server);

  io.on('connection', function (socket) {

    socket.on('request', ({ request, target, args }) => {
      switch (request) {
        case 'mapdata':
          io.emit('response', {
            request,
            target,
            data: mapdata,
          });
          break;
        case 'scenedata':
          io.emit('response', {
            request,
            target,
            data: scenedata,
          });
          break;
        case 'sounddata':
          io.emit('response', {
            request,
            target,
            data: sounddata,
          });
          break;
      }
    });

    socket.on('update', (data) => {
      io.emit('updatescene', data);
    });

  });
}
