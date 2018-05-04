  const mongoose = require('mongoose');

  const Schema = mongoose.Schema;

  const GenreSchema = new Schema ({
      name: {type: String, required: true, min: 3, max: 100}
    });

// Virtual genre`s

GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/genre/'+this._id;
});

// Export model genreSchema

module.exports = mongoose.model('Genre', GenreSchema);
