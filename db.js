var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Campaign = new Schema({
    description : String,
    campaignScript  : String,
    status  : String
});

var People = new Schema({
    firstName      : String,
    lastName       : String,
    address        : String,
    votingActivity : String
});


mongoose.model( 'Campaign', Campaign );
mongoose.model( 'People', People );
