var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AlbumInstanceSchema = new Schema({
  description: { type: String, required: true, maxLength: 1200 },
  released: { type: Number },
  album: { type: Schema.Types.ObjectId, ref: "Album", required: true },
  specifics: { type: String, maxLength: 100},

});

// Virtual for AlbumInstance's URL
AlbumInstanceSchema.virtual("url").get(function () {
  return "/albuminstance/" + this._id;
});

//Export model
module.exports = mongoose.model("AlbumInstance", AlbumInstanceSchema);
