const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apikeySchema = new Schema({
    ApiKey: String
}, {collection: 'apikey'});

const ApiKey = mongoose.model('ApiKey', apikeySchema);
module.exports = ApiKey;