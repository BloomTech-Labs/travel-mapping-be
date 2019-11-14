const validate = require('../../modules/modules').validate;
const errors   = require('../../modules/modules').errors;
const album    = require('../../data/models/models').album;
const jwt      = require('jsonwebtoken');

const createAlbum = (req, res, next) => {

  const errorMsgOrTrue = validate.createAlbumData(req.body);

  if (errorMsgOrTrue !== true) next(new Error(errorMsgOrTrue));
  else {

    try {

      const user_id = parseInt(req.params.user_id);
      const albumObj = req.body;

      album.createAlbum({user_id, ...albumObj, }, (createErr, albumArr) => {

        if(createErr) next(createErr);
        else {
          res.status(201).json({ ...albumArr[0] });
        }

      });

    } catch (err) {
      console.error(err);
      next(new Error(errors.serverError));
    }

  }

}; 

const getUsersAlbums = (req, res, next) => {
  
  const { user_id } = req.params;

  try {

    album.retrieveUsersAlbums(user_id, (retrieveErr, albumsArr) => {

      const { isOwner, isAdmin, collabAlbums, } = req;
      if (retrieveErr) next(retrieveErr);
      else if (isOwner || isAdmin) {

        // Send all albums.
        res.status(200).json(albumsArr);

      } else {
    
        // Send public albums only.
        res.status(200).json(albumsArr.filter(albumObj => albumObj.access !== 'private'));

      }

    });

  } catch (err) {
    console.error(err);
    next(new Error(errors.serverError));
  }

};

module.exports = {
  createAlbum,
  getUsersAlbums,
};