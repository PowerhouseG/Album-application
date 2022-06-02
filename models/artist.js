var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  career_start: { type: Number },
  career_end: { type: Number },
});

// Virtual for Artist's URL
ArtistSchema.virtual("url").get(function () {
  return "/catalog/artist/" + this._id;
});

//Export model
module.exports = mongoose.model("Artist", ArtistSchema);
