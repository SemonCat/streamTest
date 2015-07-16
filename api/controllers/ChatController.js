/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getSocketID: function(req, res) {
    if (!req.isSocket) return res.badRequest();

    var socketId = sails.sockets.id(req.socket);
    // => "BetX2G-2889Bg22xi-jy"
    console.log(socketId)

    sails.sockets.join(req.socket, "voiceChat");

    return res.ok('My socket ID is: ' + socketId);
  },
  /**
   * `ChatController.sendVoiceMessage()`
   */
  sendVoiceMessage: function(req, res) {
    if (!req.isSocket) return res.badRequest();

    var voiceData = req.param('voiceByte');
    //console.log(voiceData);

    sails.sockets.broadcast("voiceChat","voiceReceive", voiceData,req.socket);

    return res.ok();
  }
};
