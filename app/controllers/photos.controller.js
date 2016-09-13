var User = require('mongoose').model('User'),
    Photo = require('mongoose').model('Photo'),
    Category = require('mongoose').model('Category'),
    passport = require("passport"),
    aws = require('aws-sdk');

const S3_BUCKET = process.env.S3_BUCKET;

//Get /addphoto
function getAddPhoto(req, res) {
  res.render('photo/new', { message: req.flash('errorMessage') });
}


//Get /view-edit-photo
function getViewPhoto(req, res) {
console.log('photoid' + req.params.photo_id);

  Photo.findById(req.params.photo_id, function (err, photo) {
      res.render('photo/show', {message: req.flash('errorMessage'), user: req.user, photo: photo});

  });



  // res.render('photo/show', { message: req.flash('errorMessage') });
}

//Put /view-edit-photo
function putEditPhoto(req, res) {
}


//----------------------------------------

/*
 * Respond to GET requests to /sign-s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and
 * the anticipated URL of the image.
 */

function getSignS3(req, res) {
  const s3 = new aws.S3();



    //Note: fileName uploads the file into the sample folder in te s3 Bucket
    //Consider replacing sample/ with object ID or some unique identifier to keep the files separate
    const currUserId = req.user._id
    const fileName = currUserId + '/' + req.query['file-name'];

    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
}

/*
 * Respond to POST requests to /submit_form.
 * This function needs to be completed to handle the information in
 * a way that suits your application.
 */

function postPhotoDetails(req, res) {
  // res.json(req.body);
  var category = req.body.category_type;
  Category.find({category_type: category})
  .exec(function(err, category){

    if (err) res.render('photo/new', { message: req.flash('cannot find category') });

// console.log("category found: " + category[0]);
    var photo_object = req.body;
    var new_photo = new Photo(photo_object);
    new_photo.user_id = req.user._id;
    new_photo.category_id = category[0]._id;




    new_photo.save(function(err, photo) {
      if (err) res.render('photo/new', { message: req.flash('errorMessage') });
      res.render('photo/show', { message: req.flash('Saved new photo'), photo: photo, user: req.user });
    });

  });
}



module.exports = {

  getAddPhoto: getAddPhoto,
  getViewPhoto: getViewPhoto,
  putEditPhoto: putEditPhoto,
  getSignS3: getSignS3,
  postPhotoDetails: postPhotoDetails

};
