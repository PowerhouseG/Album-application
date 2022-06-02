var Artist = require("../models/artist");
var Album = require("../models/album");
var async = require("async");

exports.artist_list = function (req, res) {
  Artist.find({}, "title")
    .sort({ title: 1 })
    .exec(function (err, artist_list) {
      if (err) {
        return next(err);
      }
      res.render("artist_list", { title: "Artist List", artists: artist_list });
    });
};
exports.artist_detail = function (req, res) {
  async.parallel(
    {
      artist: function (callback) {
        Artist.findById(req.params.id).exec(callback);
      },
      albums: function (callback) {
        Album.find({ artist: req.params.id }, "name")
          .sort({ name: 1 })
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("artist_detail", {
        title: "Artist Detail",
        artist: results.artist,
        albums: results.albums,
      });
    }
  );
};
