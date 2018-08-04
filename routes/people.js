//*******************************************People Route*****************************************
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

      res.render( 'profile', {
          peopleList : peopleList,
      });
    });
};

exports.createpeople = function ( req, res, next ){
  new People({
      user_id    : req.cookies.user_id,
      firstName  : req.body.firstName,
      lastName   : req.body.lastName,
      address   : req.body.address,
      votingActivity   : req.body.votingActivity
  }).save( function ( err, firstName, lastName, address, votingActivity ){
    if( err ) return next( err );

    res.redirect( '/profile' );
  });
};
//
exports.destroypeople = function ( req, res, next ){
  People.findById( req.params.id, function ( err, peopleList ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( peopleList.user_id !== user_id ){
      return utils.forbidden( res );
    }

    peopleList.remove( function ( err, peopleList ){
      if( err ) return next( err );
      res.redirect( '/profile' );
    });
  });
};

exports.editpeople = function( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

  People.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, peopleList ){
      if( err ) return next( err );

      res.render( 'editpeople', {
        peopleList : peopleList,
        current : req.params.id
      });
    });
};

exports.updatepeople = function( req, res, next ){
  People.findById( req.params.id, function ( err, peopleList ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( peopleList.user_id !== user_id ){
      return utils.forbidden( res );
    }
    peopleList.firstName    = req.body.votingActivity;
    peopleList.save( function ( err, votingActivity ){
      if( err ) return next( err );

      res.redirect( '/profile' );
    });
  });
};

exports.current_user = function ( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

  if( !user_id ){
    res.cookie( 'user_id', utils.uid( 32 ));
  }

  next();
};
