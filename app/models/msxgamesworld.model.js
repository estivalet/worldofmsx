var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MSXGamesWorldSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: {type: String},
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);



//Export model
module.exports = mongoose.model('MSXGamesWorld', MSXGamesWorldSchema, 'msxgamesworld');