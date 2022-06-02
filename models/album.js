var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 1200 },
  artist: { type: Schema.Types.ObjectId, ref: "Artist", required: true },
  genres: [{type: Schema.Types.ObjectId,ref:"Genre"}]
});

// Virtual for Album's URL
AlbumSchema.virtual("url").get(function () {
  return "/catalog/album/" + this._id;
});

//Export model
module.exports = mongoose.model("Album", AlbumSchema);
