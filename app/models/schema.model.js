var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var companySchema = new Schema(
  {
    name: {type: String, unique: true},
    fullName: { type: String },
    type: { type: String },
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
    address: { type: String },
    website: { type: String },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

var countrySchema = new Schema(
  {
    name: {type: String, unique: true},
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

var genreSchema = new Schema(
  {
    name: {type: String, unique: true},
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

var inputSchema = new Schema(
  {
    name: {type: String, unique: true},
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

var softwareSchema = new Schema(
  {
    name: {type: String, unique: true},
    country: { type: Schema.Types.ObjectId, ref: 'Country' }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);



var Company = mongoose.model('Company', companySchema);
var Country = mongoose.model('Country', countrySchema);
var Genre = mongoose.model('Genre', genreSchema);
var Input = mongoose.model('Input', inputSchema);
var Software = mongoose.model('Software', softwareSchema);

module.exports = {
  Company: Company,
  Country: Country,
  Genre: Genre,
  Input: Input,
  Software: Software,
}