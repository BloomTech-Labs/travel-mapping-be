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

      album.createAlbum({user_id, ...albumObj, }, (createErr, newAlbumObj) => {

        if (createErr) next(createErr);
        else res.status(201).json({ ...newAlbumObj });

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

const addAlbumMetaData = (req, res, next) => {

  const errorMsgOrTrue = validate.addAlbumMetaData(req.body);

  if (errorMsgOrTrue !== true) next(new Error(errorMsgOrTrue));
  else {

    try {

      const album_id = parseInt(req.params.album_id);
      const metaDataArr = req.body;

      if (req.isOwner || req.isAdmin) {

        album.createAlbumMeta(album_id, metaDataArr, (createErr, metaObj) => {

          if (createErr) next(createErr);
          else res.status(201).json(metaObj);
  
        });

      } else next(new Error(errors.unauthorized));
    
    } catch (err) {
      console.error(err);
      next(new Error(errors.serverError));
    }

  }

};

const editAlbum = (req, res, next) => {

  const { album_id } = req.params;
  
  const errorMsgOrTrue = validate.editAlbumProps(req.body);

  if (errorMsgOrTrue !== true) next(new Error(errorMsgOrTrue));
  else {

    if (req.isOwner || req.isAdmin) {

      try {

        album.updateAlbumById(album_id, req.body, (updateErr, albumObj) => {

          if (updateErr) next(updateErr);
          else res.status(200).json(albumObj);
  
        });

      } catch (err) {
        console.error(err);
        next(new Error(errors.serverError));
      }

    } else next(new Error(errors.unauthorized));

  }

};

module.exports = {
  createAlbum,
  getUsersAlbums,
  addAlbumMetaData,
  editAlbum,
};