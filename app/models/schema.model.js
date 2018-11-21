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

var licenseSchema = new Schema(
  {
    name: {type: String, unique: true},
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

var mediaSchema = new Schema(
  {
    name: {type: String, unique: true},
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

var publicationSchema = new Schema(
  {
    title: {type: String, unique: true},
    publisher: {type: String, unique: true},
    category: {type: String, unique: true},
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
    genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
    type: {type: String},
    year: {type: String},
    description: {type: String},
    system: {type: String},
    publisher: { type: Schema.Types.ObjectId, ref: 'Company' },
    developer: { type: Schema.Types.ObjectId, ref: 'Company' },
    releases: [
      {
        name: {type: String},
        title: {type: String},
        productCode: {type: String},
        pirated: {type: String},
        publisher:{ type: Schema.Types.ObjectId, ref: 'Company' },
        country:{ type: Schema.Types.ObjectId, ref: 'Country' },
        price: {type: String},
        media: {type: String},
        year: {type: String},
        ean13: {type: String},
      }
    ],
    medias: [
      {
        url: {type: String},
        type: {type: String},
        title: {type: String},
      }
    ],
    mentions: [{
      url: {type: String},
      text: {type: String},
      description: {type: String},
    }]
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
var License = mongoose.model('License', licenseSchema);
var Media = mongoose.model('Media', mediaSchema);
var Publication = mongoose.model('Publication', publicationSchema);
var Software = mongoose.model('Software', softwareSchema);

module.exports = {
  Company: Company,
  Country: Country,
  Genre: Genre,
  Input: Input,
  License: License,
  Media: Media,
  Publication: Publication,
  Software: Software,
}