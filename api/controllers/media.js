<<<<<<< HEAD
const cloudinary = require('../../modules/modules').cloudinary;    
const validate   = require('../../modules/modules').validate;
const errors     = require('../../modules/modules').errors;
const models     = require('../../data/models/models');
const jwt        = require('jsonwebtoken');
=======
const cloudinary  = require('../../modules/modules').cloudinary;    
const validate    = require('../../modules/modules').validate;
const errors      = require('../../modules/modules').errors;
const utils       = require('../../modules/modules').utils;
const models      = require('../../data/models/models');
const jwt         = require('jsonwebtoken');
const http        = require('http');
const path        = require('path');
const fs          = require('fs');
const environment = process.env.NODE_ENV || 'development';
const serverHost  = utils.getEnvironmentHost(environment);
>>>>>>> cb10841390d2f0198548b1b298698f83f1c570d3

const addAlbumsMedia = (req, res, next) => {
  
  const contentType = req.headers['content-type'].split(';')[0];

  const body = contentType === 'application/json' ? req.body : {
    albums: JSON.parse(req.body.albums),
<<<<<<< HEAD
    media: JSON.parse(req.body.media),
=======
    media:  JSON.parse(req.body.media),
>>>>>>> cb10841390d2f0198548b1b298698f83f1c570d3
  };

  const mediaFiles = contentType === 'application/json' ? null : req.files.files;

  const errorMsgOrTrue = validate.addMediaProps(body);

  if (errorMsgOrTrue !== true) next(new Error(errorMsgOrTrue));
  else {

    try {
      
      const user_id = parseInt(req.params.user_id);
      const { albums, media } = body;

      const mediaOnlyArr = media.map(mediaObj => ({ title: mediaObj.title, caption: mediaObj.caption }));

      models.media.createMedia(user_id, mediaOnlyArr, (createMediaErr, createdMediaArr) => {

        if (createMediaErr) next(createMediaErr);
        else {

          const mediaIdArr = createdMediaArr.map(mediaObj => mediaObj.media_id);

          models.media.createMediaToAlbums(albums, mediaIdArr, (createMediaAlbumErr, createMediaAlbumNum) => {

            if (createMediaAlbumErr) next(createMediaAlbumErr);
            else {

              const keywords = media.map(mediaObj => (mediaObj.keywords ? mediaObj.keywords : []));

              models.media.createManyKeywords(keywords, (createKeywordErr, keywordsObjArr) => {

                if (createKeywordErr) next(createKeywordErr);
                else {

                  const keywordsIdArr = keywordsObjArr.map(keyArr => keyArr.map(keyObj => keyObj.keyword_id));
                  
                  models.media.createManyKeywordsToMedia(mediaIdArr, keywordsIdArr, (createMediaKeywordErr, createdNum) => {
                    
                    if (createMediaKeywordErr) next(createMediaKeywordErr);
                    else {
                      
                      const mediaMetaArr = media.map(mediaObj => (mediaObj.meta ? mediaObj.meta : []));
                      
                      models.media.createManyMediaMeta(mediaIdArr, mediaMetaArr, (createErr, mediaMetaData) => {
                        
                        if (createErr) next(createErr);
                        else {
                          
                          // Create media response body.
                          const media = createdMediaArr.map((mediaObj, i) => Object.assign({}, mediaObj, { albums, keywords: keywords[i], meta: mediaMetaData[i], media_url: "", }));

                          // Upload to cloudinary.
                          if (mediaFiles !== null) {
                            
                            // Array of temporary path names.
                            const mediaTmpPathArr = mediaFiles.length > 0 ? mediaFiles.map(fileObj => fileObj.tempFilePath) : [ mediaFiles.tempFilePath ];

                            // Array of media titles.
                            const createdMediaTitleArr = createdMediaArr.map(media => media.title);
                            
                            // Array of promises for uploading multiple files at once.
<<<<<<< HEAD
                            const uploadPromiseArr = createdMediaTitleArr.map((title, i) => cloudinary.uploadMedia(mediaTmpPathArr[i], { public_id: `${ user_id }/${ title }`, overwrite: false }));
=======
                            const uploadPromiseArr = createdMediaTitleArr.map((title, i) => cloudinary.uploadMedia(mediaTmpPathArr[i], { public_id: `${ process.env.CLOUDINARY_SERVER_ACCESS_KEY }/${ user_id }/${ title }`, overwrite: false, format: 'jpg', type: 'upload', }));
>>>>>>> cb10841390d2f0198548b1b298698f83f1c570d3

                            Promise.all(uploadPromiseArr).then(values => {

                              // Add image url to media objects.
<<<<<<< HEAD
                              media.forEach((mediaObj, i) => mediaObj.media_url = `http://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${ user_id }/${ mediaObj.title }`.replace(/\s/g, '%20'));
=======
                              media.forEach((mediaObj, i) => {
                                /*.replace(/\s/g, '%20')*/
                                mediaObj.media_url = `${ serverHost }/users/${ mediaObj.user_id }/media/original/${ mediaObj.title }`;
                                mediaObj.thumbnail_url = `${ serverHost }/users/${ mediaObj.user_id }/media/thumbnail/${ mediaObj.title }`;
                                // mediaObj.media_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/${ process.env.CLOUDINARY_SERVER_ACCESS_KEY }/${ user_id }/${ mediaObj.title }.jpg`;
                                // mediaObj.thumbnail_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/w_400,h_400,c_thumb/${ process.env.CLOUDINARY_SERVER_ACCESS_KEY }/${ user_id }/${ mediaObj.title}.jpg`;
                              });
>>>>>>> cb10841390d2f0198548b1b298698f83f1c570d3
                              
                              res.status(201).json(media);

                            }).catch(uploadErr => {
                              console.error(uploadErr);
                              next(new Error(errors.serverError));
                            });

                          } else res.status(201).json(media);

                        }

                      });

                    }
                    
                  });

                }

              });

            }

          });

        }

      });

    } catch (err) {
      console.error(err);
      next(new Error(errors.serverError));
    }

  }
  //*/
};

const getAlbumsMedia = (req, res, next) => {

  const album_id = parseInt(req.params.album_id);

  try {

    models.media.retrieveAlbumsMedia(album_id, (retrieveErr, mediaArr) => {

      if (retrieveErr) next(retrieveErr);
      else {

        if (req.isAdmin || req.isOwner) {

          // Add image url to media.
          mediaArr.forEach((mediaObj, i) => {
<<<<<<< HEAD

            mediaObj.image_url = `http://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${ mediaObj.user_id }/${ mediaObj.title }`.replace(/\s/g, '%20');
=======
            /*.replace(/\s/g, '%20')*/
            mediaObj.media_url = `${ serverHost }/users/${ mediaObj.user_id }/media/original/${ mediaObj.title }`;
            mediaObj.thumbnail_url = `${ serverHost }/users/${ mediaObj.user_id }/media/thumbnail/${ mediaObj.title }`;
            // mediaObj.image_url = `http://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${ process.env.CLOUDINARY_SERVER_ACCESS_KEY }/${ mediaObj.user_id }/${ mediaObj.title }.jpg`;
            // mediaObj.thumbnail_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/w_400,h_400,c_thumb/${ process.env.CLOUDINARY_SERVER_ACCESS_KEY }/${ mediaObj.user_id }/${ mediaObj.title}.jpg`;
>>>>>>> cb10841390d2f0198548b1b298698f83f1c570d3

          });

          res.status(200).json(mediaArr);

        } else next(new Error(errors.unauthorized));

      }

    });

  } catch (err) {
    console.error(err);
    next(new Error(errors.serverError));
  }

};

<<<<<<< HEAD
module.exports = {
  addAlbumsMedia,
  getAlbumsMedia,
=======
const getUsersMedia = (req, res, next) => {

  const user_id = parseInt(req.params.user_id);

  try {

    models.media.retrieveUsersMedia(user_id, (retrieveErr, mediaArr) => {

      if (retrieveErr) next(retrieveErr);
      else {

        // Add image url to media.
        mediaArr.forEach((mediaObj, i) => {
          /*.replace(/\s/g, '%20')*/
          mediaObj.media_url = `${ serverHost }/users/${ mediaObj.user_id }/media/original/${ mediaObj.title }`;
          mediaObj.thumbnail_url = `${ serverHost }/users/${ mediaObj.user_id }/media/thumbnail/${ mediaObj.title }`;
          // mediaObj.image_url = `http://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${ process.env.CLOUDINARY_SERVER_ACCESS_KEY }/${ mediaObj.user_id }/${ mediaObj.title }.jpg`;
          // mediaObj.thumbnail_url = `https://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME }/image/upload/w_400,h_400,c_thumb/${ process.env.CLOUDINARY_SERVER_ACCESS_KEY }/${ mediaObj.user_id }/${ mediaObj.title}.jpg`;

        });

        res.status(200).json(mediaArr);

      }

    });

  } catch (err) {
    console.error(err);
    next(new Error(errors.serverError));
  }

};

const viewUsersMedia = (req, res, next) => {

  const { title, type, }   = req.params;
  const user_id            = parseInt(req.params.user_id);
  const tmpMediaPath       = path.resolve(__dirname, `../../tmp_media/${ process.env.CLOUDINARY_SERVER_ACCESS_KEY }_${ user_id }_${ title }`);
  const cloudinaryMediaUrl = `http://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${ type === 'thumbnail' ? 'w_400,h_400,c_thumb/' : '' }${ process.env.CLOUDINARY_SERVER_ACCESS_KEY }/${ user_id }/${ title }`;

  const media = fs.createWriteStream(path.resolve(__dirname, `../../tmp_media/${ process.env.CLOUDINARY_SERVER_ACCESS_KEY }_${ user_id }_${ title }`));

  http.get(cloudinaryMediaUrl, (cloudinaryRes) => {

    try {

      cloudinaryRes.pipe(media);

      media.on('finish', () => {
        
        media.close(() => {

          // Send the file.
          res.sendFile(tmpMediaPath, () => {

            // Delete the file.
            fs.unlink(tmpMediaPath, () => {});

          });

        });

      });

    } catch (err) {
      console.error(err);
      next(new Error(errors.serverError));
    }

  }).on('error', (err) => {
    fs.unlink(tmpMediaPath);
    console.error(err);
    next(new Error(errors.serverError));
  });

};

const viewMedia = (req, res, next) => {

  const { title, type, }   = req.params;
  const tmpMediaPath       = path.resolve(__dirname, `../../tmp_media/${ title }`);
  const cloudinaryMediaUrl = `http://res.cloudinary.com/${ process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${ type === 'thumbnail' ? 'w_400,h_400,c_thumb/' : '' }${ title }`;

  const media = fs.createWriteStream(path.resolve(__dirname, `../../tmp_media/${ title }`));

  http.get(cloudinaryMediaUrl, (cloudinaryRes) => {

    try {

      cloudinaryRes.pipe(media);

      media.on('finish', () => {
        
        media.close(() => {

          // Send the file.
          res.sendFile(tmpMediaPath, () => {

            // Delete the file.
            fs.unlink(tmpMediaPath, () => {});

          });

        });

      });

    } catch (err) {
      console.error(err);
      next(new Error(errors.serverError));
    }

  }).on('error', (err) => {
    fs.unlink(tmpMediaPath);
    console.error(err);
    next(new Error(errors.serverError));
  });

};

module.exports = {
  addAlbumsMedia,
  getAlbumsMedia,
  getUsersMedia,
  viewUsersMedia,
  viewMedia,
>>>>>>> cb10841390d2f0198548b1b298698f83f1c570d3
};