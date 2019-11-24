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

const createMediaToAlbums = (user_id, albumArr, mediaDataArr, done) => {
  // Takes a user ID, an array of album IDs, an array of media
  // objects and a callback function as arguments. Creates the
  // media in the database and adds them to each album in the
  // album array. Passes null and an array of created media
  // objects to the callback function.

};

const createMedia = (user_id, mediaArr, done) => {
  // Takes a user ID, an array of media objects, and a 
  // callback function as arguments. Creates the media in 
  // the database and passes an array of media objects and 
  // null to the callback function.

  // Check if user id exists.
  db('users').where({ user_id })
    .select('user_id').then(userIdArr => {

      if (userIdArr.length === 0) done(new Error(errors.userIdDoesNotExist));
      else {

        // Get media titles
        db('media').where({ user_id })
          .select('title').then(titleArr => {
          
            let titleExists      = false;
            let titleIsValid     = true;
            let captionIsValid   = true;
            // let metaNameIsValid  = true;
            // let metaValueIsValid = true;
            // let metaNameExists   = false;

            // Validate data and add user_id to media.
            const newMediaArr = mediaArr.map(mediaObj => {
              
              titleArr.forEach(mediaTitle => (title === mediaTitle) && (titleExists = true));
              
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

module.exports = {
  createMediaToAlbums,
  createMedia,
};