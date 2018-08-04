var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var  Elections = new Schema({
    date        : Date,
    status      : Number,
    description : String
});

var People = new Schema({
    firstName      : String,
    lastName       : String,
    address        : String,
    votingActivity : String
});


mongoose.model( 'Elections', Elections );
mongoose.model( 'People', People );
