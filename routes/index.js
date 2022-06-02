var express = require("express");
var router = express.Router();

var artist_controller = require("../controllers/artistController");
var album_controller = require("../controllers/albumController");
var albuminstance_controller = require("../controllers/albuminstanceController");

router.get("/", function (req, res) {
  res.redirect("/artists");
});

//ARTISTS
router.get("/artists", artist_controller.artist_list);
router.get("/artists/:id", artist_controller.artist_detail);

//ALBUMS
router.get("/albums/:id", album_controller.album_detail);

//ALBUM INSTANCE
router.get(
  "/albuminstance/:id/delete",
  albuminstance_controller.albuminstance_delete_get
);

router.post(
  "/albuminstance/:id/delete",
  albuminstance_controller.albuminstance_delete_post
);

router.get(
  "/albuminstance/:id/update",
  albuminstance_controller.albuminstance_update_get
);

router.post(
  "/albuminstance/:id/update",
  albuminstance_controller.albuminstance_update_post
);

router.get(
  "/albuminstance/:id/create",
  albuminstance_controller.albuminstance_create_get
);

router.post(
  "/albuminstance/:id/create",
  albuminstance_controller.albuminstance_create_post
);

router.get("/albuminstance/:id", albuminstance_controller.albuminstance_detail);

module.exports = router;
