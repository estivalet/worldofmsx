var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameSchema = new Schema(
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
module.exports = mongoose.model('Game', GameSchema);