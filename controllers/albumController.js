var Album = require("../models/album");
var AlbumInstance = require("../models/album_instance");
var Genre = require("../models/genre");
var async = require("async");

exports.album_detail = function (req, res) {
  async.parallel(
    {
      album: function (callback) {
        Album.findById(req.params.id)
          .populate("genres")
          .populate("artist")
          .exec(callback);
      },
      album_instance: function(callback){
        AlbumInstance.find({'album':req.params.id},'description released')
        .exec(callback);
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("album_detail", {
        title: "Album Detail",
        album: results.album,
        album_instances:results.album_instance,
      });
    }
  );
};
