const validate    = require('../../modules/modules').validate;
const errors      = require('../../modules/modules').errors;
const db          = require('../dbConfig');
const validator   = require('validator');
const bcrypt      = require('bcrypt');
const salt        = parseInt(process.env.PASS_SALT) || 10;
const environment = process.env.NODE_ENV || 'development';
const returning   = (environment === 'review'  ||   
                     environment === 'staging' ||
                     environment === 'production');

const createMediaToAlbums = (albumIdArr, mediaIdArr, done) => {
  // Takes an array of album IDs, an array of media IDs, and a
  // callback function as parameters. Adds each media ID to
  // each album ID. Returns null and ? to the callback function.

  if (albumIdArr.length === 0 || mediaIdArr.length === 0) done(null, [0]);
  else {
    
    // Check if albums exist.
    db('albums').whereIn('album_id', albumIdArr)
      .select('album_id').then(albumArr => {

        if (albumArr.length !== albumIdArr.length) done(new Error(errors.albumIdDoesNotExist));
        else {

          // Check if media exists.
          db('media').whereIn('media_id', mediaIdArr)
            .select('media_id').then(mediaArr => {

              if (mediaArr.length !== mediaIdArr.length) done(new Error(errors.mediaIdDoesNotExist));
              else {

                const mediaToAlbums = [];
                albumIdArr.forEach(album_id => (mediaIdArr.forEach(media_id => mediaToAlbums.push({ album_id, media_id }))));

                // Create mediaToAlbums.
                db('mediaAlbums').insert(mediaToAlbums)
                  .then(numArr => {

                    done(null, numArr);

                  }).catch(numErr => done(numErr));
                
              }

            }).catch(mediaErr => done(mediaErr));

        }

      }).catch(albumErr => done(albumErr));
  }

  

};

const createMedia = (user_id, mediaArr, done) => {
  // Takes a user ID, an array of media objects, and a 
  // callback function as parameters. Creates the media in 
  // the database and passes an array of media objects and 
  // null to the callback function.

  // Check if user id exists.
  db('users').where({ user_id })
    .select('user_id').then(userIdArr => {

      if (userIdArr.length === 0) done(new Error(errors.userIdDoesNotExist));
      else {

        // Get media titles
        db('media').where({ user_id })
          .select().then(titleArr => {

            let titleExists    = false;
            let titleIsValid   = true;
            let captionIsValid = true;

            // Validate data and add user_id to media.
            const newMediaArr = mediaArr.map(mediaObj => {
              
              titleArr.forEach(mediaTitle => (mediaObj.title === mediaTitle.title) && (titleExists = true));
              
              if (!validate.mediaTitle(mediaObj.title))     titleIsValid   = false;
              if (!validate.mediaCaption(mediaObj.caption)) captionIsValid = false;

              return Object.assign({}, mediaObj, { user_id });
            });
          
            if (!titleIsValid)        done(new Error(errors.invalidMediaTitle));
            else if (!captionIsValid) done(new Error(errors.invalidMediaCaption));
            else if (titleExists)     done(new Error(errors.mediaTitleExists));
            else {

              // Add media to database.
              db('media').insert(newMediaArr, returning ? ['media_id'] : null)
                .select('media_id')
                .then(mediaIdArr => {

                  const mediaTitlesArr = mediaArr.map(mediaObj => mediaObj.title);

                  // Get the created media by title.
                  db('media').whereIn('title', mediaTitlesArr)
                    .andWhere({ user_id })
                    .select().then(getMediaArr => {

                      done(null, getMediaArr);

                    }).catch(getMediaErr => done(getMediaErr));

                }).catch(mediaIdErr => done(mediaIdErr));

            }

          }).catch(titleErr => done(titleErr));

      }

    }).catch(userIdErr => done(userIdErr));

};

const createKeywords = (keywordsArr, done) => {


  

};

module.exports = {
  createMediaToAlbums,
  createMedia,
};