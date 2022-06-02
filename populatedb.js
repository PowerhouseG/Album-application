#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Album = require("./models/album");
var Artist = require("./models/artist");
var Genre = require("./models/genre");
var AlbumInstance = require("./models/album_instance");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var artists = [];
var genres = [];
var albums = [];
var albuminstances = [];

function artistCreate(title, c_start, c_end, cb) {
  artistdetail = { title };
  if (c_start != false) artistdetail.career_start = c_start;
  if (c_end != false) artistdetail.career_end = c_end;

  var artist = new Artist(artistdetail);

  artist.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New artist: " + artist);
    artists.push(artist);
    cb(null, artist);
  });
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });

  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Genre: " + genre);
    genres.push(genre);
    cb(null, genre);
  });
}

function albumCreate(name, description, artist, genres, cb) {
  albumdetail = {
    name: name,
    description: description,
    artist: artist,
  };
  if (genres != false) {
    albumdetail.genres = genres;
  }
  var album = new Album(albumdetail);
  album.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Album: " + album);
    albums.push(album);
    cb(null, album);
  });
}

function albumInstanceCreate(description, released, album, specifics, cb) {
  albumInstancedetail = {
    description: description,
    album: album,
  };
  if (released != false) {
    albumInstancedetail.released = released;
  }
  if (specifics != false) {
    albumInstancedetail.specifics = specifics;
  }
  var albuminstance = new AlbumInstance(albumInstancedetail);
  albuminstance.save(function (err) {
    if (err) {
      console.log("ERROR CREATING AlbumInstance: " + albuminstance);
      cb(err, null);
      return;
    }
    console.log("New AlbumInstance: " + albuminstance);
    albuminstances.push(albuminstance);
    cb(null, album);
  });
}

function createGenreArtists(cb) {
  async.series(
    [
      function (callback) {
        artistCreate("Evanescence", "1995", false, callback);
      },
      function (callback) {
        artistCreate("The White Stripes", "1997", "2011", callback);
      },
      function (callback) {
        artistCreate("Linkin Park", "1996", "2017", callback);
      },
      function (callback) {
        artistCreate("My Chemical Romance", "2001", false, callback);
      },
      function (callback) {
        artistCreate("Faun", "1998", false, callback);
      },
      function (callback) {
        genreCreate("Pagan folk", callback);
      },
      function (callback) {
        genreCreate("Celtic folk", callback);
      },
      function (callback) {
        genreCreate("Alternative rock", callback);
      },
      function (callback) {
        genreCreate("Emo", callback);
      },
      function (callback) {
        genreCreate("Rap rock", callback);
      },
      function (callback) {
        genreCreate("Garage rock revival", callback);
      },
      function (callback) {
        genreCreate("Alternative metal", callback);
      },
      function (callback) {
        genreCreate("Symphonic metal", callback);
      },
    ],
    cb
  );
}

function createAlbums(cb) {
  async.series(
    [
      function (callback) {
        albumCreate(
          "Fallen",
          "Fallen is the band's most commercially successful album to date, selling over 8 million copies in the United States and over 17 million copies worldwide, making it the 5th best-selling album of the 21st century. It debuted at number seven on the Billboard 200 with 141,000 copies sold in its first week, peaking at number three in June 2003. The album topped the charts in more than ten countries, and has been certified seven-times platinum by the Recording Industry Association of America (RIAA).",
          artists[0],
          [genres[6]],
          callback
        );
      },
      function (callback) {
        albumCreate(
          "The Open Door",
          "The Open Door received mostly positive reviews from music critics, who generally praised its lyrical content and the instrumentation accompanied by Lee's vocals. Some critics gave negative reviews regarding the band's sound, which differs from that of the band's previous album, Fallen (2003). The record was nominated at the 50th Grammy Awards for Best Hard Rock Performance for \"Sweet Sacrifice\". ",
          artists[0],
          [genres[7]],
          callback
        );
      },
      function (callback) {
        albumCreate(
          "The White Stripes",
          "The White Stripes is the debut studio album by American rock duo The White Stripes, released on June 15, 1999. The album was produced by Jim Diamond and vocalist/guitarist Jack White, recorded in January 1999 at Ghetto Recorders and Third Man Studios in Detroit. White dedicated the album to deceased blues musician Son House.",
          artists[1],
          [genres[5]],
          callback
        );
      },
      function (callback) {
        albumCreate(
          "Hybrid Theory",
          "Hybrid Theory is the debut studio album by American rock band Linkin Park, released on October 24, 2000, through Warner Bros. Records. Recorded at NRG Recordings in North Hollywood, California, and produced by Don Gilmore, the album's lyrical themes deal with problems lead vocalist Chester Bennington experienced during his adolescence, including drug abuse and the constant fighting and divorce of his parents. Hybrid Theory takes its title from the previous name of the band as well as the concept of music theory and combining different styles. This is also the only album on which bassist Dave Farrell does not play. ",
          artists[2],
          [genres[4], genres[2]],
          callback
        );
      },
      function (callback) {
        albumCreate(
          "The Black Parade",
          'The Black Parade has received generally favorable reviews, and the band achieved its first number one single in the United Kingdom with "Welcome to the Black Parade". The album debuted at number two on both the Billboard 200 and the UK Albums Chart and is also certified as Triple Platinum in the United States (by the RIAA) and the United Kingdom (by the BPI), as well as Gold certifications in both Argentina (by the CAPIF) and Chile (by the IFPI Chile). The Black Parade was given the Platinum Europe Award by the International Federation of the Phonographic Industry for one million sales in Europe. The limited edition boxed set also earned My Chemical Romance a Grammy Award nomination. Four singles were released from the album: "Welcome to the Black Parade", "Famous Last Words", "I Don\'t Love You", and "Teenagers". ',
          artists[3],
          [genres[3], genres[2]],
          callback
        );
      },
      function (callback) {
        albumCreate(
          "Eden",
          'The album covers many different topics such as Greek mythology, including "Hymn to Pan" about the Greek god of the same name. Other songs deal with other mythologies: The lyrics of "Arcadia" are from an ancient Finnish poem honoring the forest-god. "Lvpercalia" is about the ancient Roman festival, "Iduna" is about the Norse deity, and "Adam Lay Ybounden" and "Golden Apples" both concern the biblical narrative of the Garden of Eden. ',
          artists[4],
          [genres[0], genres[1]],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createAlbumInstances(cb) {
  async.parallel(
    [
      function (callback) {
        albumInstanceCreate(
          "Track Record, Inc.",
          2003,
          albums[0],
          false,
          callback
        );
      },
      function (callback) {
        albumInstanceCreate(
          "Record Plant, Los Angeles",
          2006,
          albums[1],
          false,
          callback
        );
      },
      function (callback) {
        albumInstanceCreate(
          "Ghetto Recorders and Third Man Studios, Detroit, Michigan",
          2006,
          albums[2],
          false,
          callback
        );
      },
      function (callback) {
        albumInstanceCreate(
          "NRG Recording Studios (North Hollywood, California)",
          2000,
          albums[3],
          false,
          callback
        );
      },
      function (callback) {
        albumInstanceCreate(
          "NRG Recording Studios (North Hollywood, California)",
          2020,
          albums[3],
          "20th Anniversary Edition",
          callback
        );
      },
      function (callback) {
        albumInstanceCreate(
          "El Dorado, Burbank, California, U.S.",
          2006,
          albums[4],
          false,
          callback
        );
      },
      function (callback) {
        albumInstanceCreate(
          "El Dorado, Burbank, California, U.S.",
          2016,
          albums[4],
          "The Black Parade/Living with Ghosts is a reissue of American rock band My Chemical Romance's third studio album The Black Parade (2006). The reissue combines the original album, along with several unreleased demos and live tracks during the recording of The Black Parade, titled Living with Ghosts. ",
          callback
        );
      },
      function (callback) {
        albumInstanceCreate("Banshee", 2011, albums[5], false, callback);
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createGenreArtists, createAlbums, createAlbumInstances],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("ALBUMInstances: " + albuminstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
