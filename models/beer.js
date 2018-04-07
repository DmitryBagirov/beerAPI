const db = require('./database');

const beer = db.model('Beer', {
  id: Number,
  name: String,
  image_url: String,
  description: String,
  brewers_tips: String,
});

module.exports = beer;
