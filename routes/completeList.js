//*******************************************Completed List*****************************************
var mongoose = require( 'mongoose' );
var People     = mongoose.model( 'People' );


exports.indexpeople = function ( req, res, next ){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;

  People.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, peopleList){
      if( err ) return next( err );

      res.render( 'completedlist', {
          peopleList : peopleList,
      });
    });
};
