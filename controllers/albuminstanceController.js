const res = require("express/lib/response");
var AlbumInstance = require("../models/album_instance");
var Album = require("../models/album");
const { body, validationResult } = require("express-validator");
var async = require("async");

exports.albuminstance_detail = function (req, res) {
  AlbumInstance.findById(req.params.id)
    .populate("album")
    .exec(function (err, instance) {
      if (err) {
        return next();
      }
      res.render("albuminstance_detail", {
        title: "Album Instance",
        albuminstance: instance,
      });
    });
};
exports.albuminstance_create_get = function (req, res) {
  Album.findById(req.params.id).exec(function (err, album) {
    if (err) {
      return next();
    }
    res.render("albuminstance_form", {
      title: "Create Album Instance",
      name: album.name,
      id: album._id,
    });
  });
};
exports.albuminstance_create_post = [
  body("album_id").trim().isLength({ min: 1 }).escape(),
  body("album_name").trim().isLength({ min: 1 }).escape(),
  body("specifics", "Invalid specifics")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("released", "Invalid Year")
    .optional({ checkFalsy: true })
    .trim()
    .isInt()
    .escape(),
  body("description", "Invalid Studio/Label")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("albuminstance_form", {
        title: "Create Author Instance",
        albuminstance: req.body,
        id: req.body.album_id,
        name: req.body.album_name,
        errors: errors.array(),
      });
    } else {
      var albuminstance = new AlbumInstance({
        description: req.body.description,
        released: req.body.released,
        album: req.body.album_id,
        specifics: req.body.specifics,
      });

      albuminstance.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect(albuminstance.url);
      });
    }
  },
];
exports.albuminstance_delete_get = function (req, res) {
  AlbumInstance.findById(req.params.id)
    .populate("album")
    .exec(function (err, instance) {
      if (err) {
        return next();
      }
      res.render("albuminstance_delete", {
        title: "Album Instance Delete",
        albuminstance: instance,
      });
    });
};
exports.albuminstance_delete_post = function (req, res) {
      AlbumInstance.findByIdAndRemove(
        req.body.album_instance_id,
        function deleteInstance(err) {
          if (err) {
            return next(err);
          }
          res.redirect('/albums/'+req.body.album_id);
        }
      );
    }
exports.albuminstance_update_get = function (req, res) {
  async.parallel(
    {
      albums: function (callback) {
        Album.find({}, "name").exec(callback);
      },
      albuminstance: function (callback) {
        AlbumInstance.findById(req.params.id).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next();
      }
      if (results.albums == null || results.albuminstance == null) {
        var err = new Error("Album not found");
        err.status = 404;
        return next(err);
      }
      res.render("albuminstance_form", {
        title: "Update Album Instance",
        albums: results.albums,
        albuminstance: results.albuminstance,
      });
    }
  );
};
exports.albuminstance_update_post = [
  body("album").escape(),
  body("specifics", "Invalid specifics")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("released", "Invalid Year")
    .optional({ checkFalsy: true })
    .trim()
    .isInt()
    .escape(),
  body("description", "Invalid Studio/Label")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      async.parallel(
        {
          albums: function (callback) {
            Album.find({}, "name").exec(callback);
          },
          albuminstance: function (callback) {
            AlbumInstance.findById(req.params.id).exec(callback);
          },
        },
        function (err, results) {
          if (err) {
            return next();
          }

          res.render("albuminstance_form", {
            title: "Update Album Instance",
            albums: results.albums,
            albuminstance: results.albuminstance,
            errors: errors.array(),
          });
        }
      );
    } else {
      var albuminstance = new AlbumInstance({
        description: req.body.description,
        released: req.body.released,
        album: req.body.album,
        specifics: req.body.specifics,
        _id: req.params.id,
      });

      AlbumInstance.findByIdAndUpdate(
        req.params.id,
        albuminstance,
        {},
        function (err, thealbum) {
          if (err) {
            return next(err);
          }

          res.redirect(thealbum.url);
        }
      );
    }
  },
];
