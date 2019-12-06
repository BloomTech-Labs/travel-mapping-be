const validate = require('../../modules/modules').validate;
const errors   = require('../../modules/modules').errors;
const album    = require('../../data/models/models').album;
const media    = require('../../data/models/models').media;
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
        else {
          newAlbumObj.cover_url = albumObj.cover_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/w_400,h_400,c_thumb/placeholder.jpg`;
          res.status(201).json({ ...newAlbumObj })
        };

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
      else {

        
        // Add cover_url to albums objects
        media.retrieveUsersMedia(user_id, (retrieveMediaErr, mediaArr) => {

          if (retrieveMediaErr) next(retrieveMediaErr);
          else {

            albumsArr.forEach(albumObj => {

              if (albumObj.cover_id === null) {

                if (mediaArr.length === 0) albumObj.cover_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/w_400,h_400,c_thumb/placeholder.jpg`;
                
                for (let i = 0; i < mediaArr.length; i++) {
                  
                  if (mediaArr[i].albums.includes(albumObj.album_id)) {

                    albumObj.cover_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/w_400,h_400,c_thumb/${ mediaArr[i].user_id }/${ mediaArr[i].title }.jpg`;
                    i = mediaArr.length;

                  } else albumObj.cover_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/w_400,h_400,c_thumb/placeholder.jpg`;

                }

              } else {

                mediaArr.forEach(mediaObj => {

                  if (albumObj.cover_id === mediaObj.media_id) {
  
                    albumObj.cover_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/w_400,h_400,c_thumb/${ mediaObj.user_id }/${ mediaObj.title }.jpg`;
  
                  } else {
  
                    albumObj.cover_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/w_400,h_400,c_thumb/placeholder.jpg`;
  
                  }
  
                });

              }

              delete albumObj.cover_id;

            });

            if (isOwner || isAdmin) {

              // Send all albums.
              res.status(200).json(albumsArr);
    
            } else {
        
              // Send public albums only.
              res.status(200).json(albumsArr.filter(albumObj => albumObj.access !== 'private'));
    
            }

          }

        });

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

        album.createAlbumMeta(album_id, metaDataArr, (createErr, albumObj) => {

          if (createErr) next(createErr);
          else {
          
            // Add cover_url to albums objects
            media.retrieveUsersMedia(albumObj.user_id, (retrieveMediaErr, mediaArr) => {

              if (retrieveMediaErr) next(retrieveMediaErr);
              else {

                if (albumObj.cover_id === null) {

                  if (mediaArr.length === 0) albumObj.cover_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/w_400,h_400,c_thumb/placeholder.jpg`;
                  
                  for (let i = 0; i < mediaArr.length; i++) {
                    
                    if (mediaArr[i].albums.includes(albumObj.album_id)) {
  
                      albumObj.cover_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/w_400,h_400,c_thumb/${ mediaArr[i].user_id }/${ mediaArr[i].title }.jpg`;
                      i = mediaArr.length;
  
                    } else albumObj.cover_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/w_400,h_400,c_thumb/placeholder.jpg`;
  
                  }
  
                } else {
  
                  mediaArr.forEach(mediaObj => {
  
                    if (albumObj.cover_id === mediaObj.media_id) {
    
                      albumObj.cover_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/w_400,h_400,c_thumb/${ mediaObj.user_id }/${ mediaObj.title }.jpg`;
    
                    } else {
    
                      albumObj.cover_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/w_400,h_400,c_thumb/placeholder.jpg`;
    
                    }
    
                  });
  
                }
  
                delete albumObj.cover_id;

              }
              res.status(201).json(albumObj);
            });
          }
  
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

const removeAlbum = (req, res, next) => {

  const { album_id } = req.params;

  if (req.isOwner || req.isAdmin) {

    try {

      album.removeAlbumById(album_id, (removeErr, albumIdArr) => {

        if (removeErr) next(removeErr);
        else res.status(200).json(albumIdArr);

      });

    } catch (err) {
      console.error(err);
      next(new Error(errors.serverError));
    }

  } else next(new Error(errors.unauthorized));

};

module.exports = {
  createAlbum,
  getUsersAlbums,
  addAlbumMetaData,
  editAlbum,
  removeAlbum,
};