//*******************************************Campaign Route*****************************************
var mongoose = require( 'mongoose' );
var Campaign = mongoose.model( 'Campaign' );


exports.indexcampaign = function ( req, res, next ){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;

  Campaign.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, campaign){
      if( err ) return next( err );

      res.render( 'create_campaign', {
          campaign : campaign,
      });
    });
};

exports.createcampaign = function ( req, res, next ){
  new Campaign({
      user_id    : req.cookies.user_id,
      description : req.body.description,
      campaignScript  : req.body.campaignScript,
      status  : req.body.status,
  }).save( function ( err, description, campaignScript, status ){
    if( err ) return next( err );

    res.redirect( '/create_campaign' );
  });
};

exports.destroycampaign = function ( req, res, next ){
  Campaign.findById( req.params.id, function ( err, campaign ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( campaign.user_id !== user_id ){
      return utils.forbidden( res );
    }

    campaign.remove( function ( err, campaign ){
      if( err ) return next( err );
      res.redirect( '/create_campaign' );
    });
  });
};

exports.editcampaign = function( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

   Campaign.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, campaign ){
      if( err ) return next( err );

      res.render( 'create_campaign', {
        campaign : campaign,
        current : req.params.id
      });
    });
};

exports.updatecampaign = function( req, res, next ){
  Campaign.findById( req.params.id, function ( err, campaign ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( campgain.user_id !== user_id ){
      return utils.forbidden( res );
    }
    campaignScript  :
    campaign.campaignScript  = req.body.campaignScript;
    campaign.save( function ( err, campaignScript ){
      if( err ) return next( err );

      res.redirect( '/create_campaign' );
    });
  });
};

// exports.current_user = function ( req, res, next ){
//   var user_id = req.cookies ?
//       req.cookies.user_id : undefined;
//
//   if( !user_id ){
//     res.cookie( 'user_id', utils.uid( 32 ));
//   }
//
//   next();
// };
