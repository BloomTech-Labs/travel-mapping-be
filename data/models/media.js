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
              if (mediaObj.caption && !validate.mediaCaption(mediaObj.caption)) captionIsValid = false;

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

const createManyKeywords = (keywordsArr, done) => {
  // Takes a two-dimensional array of keywords and a callback 
  // function as parameters. Creates the keywords in the 
  // database. If the keyword already exists, will not pass an 
  // error. Passes null and the array of keyword IDs to the
  // callback function.
  
  let invalidKeywords = false;
  let keywordsLength = keywordsArr.reduce((num, arr) => (num + arr.length), 0);

  // Validate the keywords.
  keywordsArr.forEach(keywordArr => (keywordArr.forEach(keyword => (!validate.keyword(keyword)) && (invalidKeywords = true))));
  
  if (keywordsLength === 0) done(null, [[]]);
  else if (invalidKeywords) done(new Error(errors.invalidKeywords));
  else {
    
    // Reduce the 2D array to 1D array. Removes repeat keywords.
    const uniqueKeywordsArr = keywordsArr.reduce((arr, keyArr) => {
      return arr.concat(keyArr.filter(key => (!arr.includes(key))));
    }, []);
    
    // Check if keywords exist.
    db('keywords').whereIn('name', uniqueKeywordsArr)
    .select('name')
    .then(keywordNameArr => {
      
      const insertKeywordsArr = [ ...uniqueKeywordsArr ];
      
      // Remove existing keywords from array.
      keywordNameArr.forEach(keywordNameObj => insertKeywordsArr.splice(insertKeywordsArr.indexOf(keywordNameObj.name), 1));
      
      if (uniqueKeywordsArr.length === 0) done(null, keywordsArr);
      else {
        
        const keywordsObjArr = insertKeywordsArr.map(uniqueKeyword => ({ name: uniqueKeyword }));
        
        if (keywordsObjArr.length === 0) {

          // Get keywords.
          db('keywords').whereIn('name', uniqueKeywordsArr)
            .select().then(fullKeywordsObjArr => {

              // Convert 2D keyword array to 2D keyword object array.
              const keywordsObjArr = keywordsArr.map(keyArr => keyArr.map(keyword => fullKeywordsObjArr.find(keyObj => keyObj.name === keyword)));
              
              done(null, keywordsObjArr);

            }).catch(fullKeywordsObjErr => done(fullKeywordsObjErr));

        } else {

          // Create keywords.
          db('keywords').insert(keywordsObjArr)
            .select()
            .then(createdNum => {

              // Get keywords.
              db('keywords').whereIn('name', uniqueKeywordsArr)
                .select().then(fullKeywordsObjArr => {

                  // Convert 2D keyword array to 2D keyword object array.
                  const keywordsObjArr = keywordsArr.map(keyArr => keyArr.map(keyword => fullKeywordsObjArr.find(keyObj => keyObj.name === keyword)));
                  
                  done(null, keywordsObjArr);

                }).catch(fullKeywordsObjErr => done(fullKeywordsObjErr));

            }).catch(createdErr => done(createdErr));

          }

        }

      }).catch(keywordNameErr => done(keywordNameErr));

  }

};

const createManyKeywordsToMedia = (mediaIdArr, keywordIdArr, done) => {
  // Takes an array of media IDs, an array of keyword IDs, and
  // a callback function as parameters. Creates the relationships
  // in the database and passes the number created to the callback
  // function.

  const keywordsLength = keywordIdArr.reduce((num, arr) => (num + arr.length), 0);

  if (keywordsLength === 0) done(null, 0);
  else {

    // Check if media exists.
    db('media').whereIn('media_id', mediaIdArr)
      .select('media_id').then(mediaArr => {

        
        if (mediaArr.length === 0) done(new Error(errors.mediaIdDoesNotExist));
        else {

          const uniqueKeywordIdArr = keywordIdArr.reduce((arr, idArr) => arr.concat(idArr.filter(id => (!arr.includes(id)))), []);

          // Check if keywords exist
          db('keywords').whereIn('keyword_id', uniqueKeywordIdArr)
            .select('keyword_id').then(keywordArr => {

              if (keywordArr.length === 0) done(new Error(errors.keywordIdDoesNotExist));
              else {

                // Create 2D array of media ID and keyword ID pairs.
                const keywordsToMediaDataArr = mediaIdArr.reduce((arr, media_id, i) => arr.concat(keywordIdArr[i].map(keyword_id => [media_id, keyword_id])), []);
                
                // Check if relationships already exists.
                db('mediaKeywords').whereIn(['media_id', 'keyword_id'], keywordsToMediaDataArr)
                .select()
                .then(keyToMedArr => {
                  
                  // Create object array to represent relational data.
                  const keywordsToMediaObjArr = mediaIdArr.reduce((arr, media_id, i) => arr.concat(keywordIdArr[i].map(keyword_id => ({ media_id, keyword_id }))), []);

                  // If relationship already exists, remove it from object array.
                  keywordsToMediaObjArr.forEach((keyMedObj, i) => keyToMedArr.forEach(keyToMedObj => (keyMedObj.media_id === keyToMedObj.media_id && keyMedObj.keyword_id === keyToMedObj.keyword_id) && (keywordsToMediaObjArr.splice(i, 1))));

                  // Create relationships in database.
                  db('mediaKeywords').insert(keywordsToMediaObjArr)
                    .then(createArr => {
                      
                      done(null, createArr);

                    }).catch(createErr => done(createErr));

                  }).catch(keyToMedErr => done(keyToMedErr));

              }

            }).catch(keywordErr => done(keywordErr));

        }

      }).catch(mediaErr => done(mediaErr));
  }
};

const createManyMediaMeta = (mediaIdArr, mediaMetaArr, done) => {
  // Takes an array of media IDs, a 2D array of meta data objects, and
  // a callback function. Creates the meta data in the database and
  // defines the relationships. passes null and the created meta data
  // to the callback function.

  const mediaMetaLength = mediaMetaArr.reduce((num, arr) => (num + arr.length), 0);

  if (mediaMetaLength === 0) done(null, [[]]);
  else {

    // Check if media exists.
    db('media').whereIn('media_id', mediaIdArr)
      .select('media_id').then(existingMediaIdArr => {

        let mediaIdExists    = true;
        let invalidMetaName  = false;
        let invalidMetaValue = false;
        let repeatedMetaName  = false;

        // Validate data
        mediaIdExists = (existingMediaIdArr.length === mediaIdArr.length);
        mediaMetaArr.forEach(metaArr => metaArr.forEach(metaObj => ((!validate.metaName(metaObj.name) && (invalidMetaName = true)), (!validate.metaValue(metaObj.value) && (invalidMetaValue = true)))));
        mediaMetaArr.map(metaArr => metaArr.map(({ name }) => name)).forEach((nameArr, i) => nameArr.filter(name => nameArr[i] === name).length > 1 && (repeatedMetaName = true));
        
        if (!mediaIdExists)        done(new Error(errors.mediaIdDoesNotExist));
        else if (repeatedMetaName) done(new Error(errors.repeatedMetaName));
        else if (invalidMetaName)  done(new Error(errors.invalidMetaName));
        else if (invalidMetaValue) done(new Error(errors.invalidMetaValue));
        else {

          // Create 2D array of media ID and meta name pairs.
          const mediaIdMetaNameArr = mediaIdArr.reduce((arr, media_id, i) => arr.concat(mediaMetaArr[i].map(metaObj => [media_id, metaObj.name])), []);

          // Check if meta data already exists.
          db('mediaMeta').whereIn(['media_id', 'name'], mediaIdMetaNameArr)
            .select().then(existingMediaMeta => {

              if (existingMediaMeta.length !== 0) done(new Error(errors.metaFieldExists));
              else {

                // Create array of mediaMeta objects.
                const mediaMetaData = mediaIdArr.reduce((arr, media_id, i) => arr.concat(mediaMetaArr[i].map(metaObj => ({ media_id, name: metaObj.name, value: metaObj.value }))), []);

                // Create the mediaMeta data.
                db('mediaMeta').insert(mediaMetaData)
                  .then(mediaMetaNum => {

                    // Convert name and value props to a single prop.
                    const mediaMetaObjArr = mediaMetaArr.map(metaObjArr => metaObjArr.reduce((obj, metaObj) => Object.assign({}, obj, { [metaObj.name]: metaObj.value }), {}));

                    done(null, mediaMetaObjArr);

                  }).catch(mediaMetaErr => done(mediaMetaErr));

              }

            }).catch(existingMediaMetaErr => done(existingMediaMetaErr));

        }

      }).catch(mediaIdErr => done(mediaIdErr));
  }

};

const retrieveAlbumsMedia = (album_id, done) => {
  // Takes an album ID and a callback function as parameters.
  // Retrieves the media and its related data from the database
  // and passes null and an array of data to the callback function.

  // Check if album ID exists.
  db('albums').where({ album_id })
    .select('album_id').then(albumIdArr => {

      let albumIdExists = (albumIdArr.length === 1);

      if (!albumIdExists) done(new Error(errors.albumIdDoesNotExist));
      else {

        // Get mediaAlbums.
        db('mediaAlbums').where({ album_id })
          .select('media_id').then(mediaIdObjArr => {

            const mediaIdArr = mediaIdObjArr.map(({ media_id }) => media_id);
            
            // Get media.
            db('media').whereIn('media_id', mediaIdArr)
              .select().then(mediaObjArr => {

                // Get all albums media is in.
                db('mediaAlbums').whereIn('media_id', mediaIdArr)
                  .select().then(mediaAlbumsObjArr => {

                    const mediaAlbumsArr = [];
                    mediaAlbumsObjArr.forEach(({ media_id }) => (!mediaAlbumsArr.includes(media_id)) && (mediaAlbumsArr.push(media_id)));
                    mediaAlbumsArr.forEach((media_id, i) => mediaAlbumsArr[i] = { media_id, albums: [] });
                    mediaAlbumsObjArr.forEach(({ media_id, album_id }) => mediaAlbumsArr.forEach(mediaAlbumObj => (media_id === mediaAlbumObj.media_id) && (mediaAlbumObj.albums.push(album_id))));

                    // Get media keywords
                    db('mediaKeywords').leftJoin('keywords', function() {
                        this.on('mediaKeywords.keyword_id', '=', 'keywords.keyword_id').onIn('mediaKeywords.media_id', mediaIdArr);
                      }).select().then(mediaKeywordsJoinArr => {
                        
                        let mediaKeywordsObjArr = [];
                        mediaKeywordsJoinArr.forEach(({ media_id }) => (!mediaKeywordsObjArr.includes(media_id)) && (mediaKeywordsObjArr.push(media_id)));
                        mediaKeywordsObjArr.forEach((media_id, i) => mediaKeywordsObjArr[i] = { media_id, keywords: [] });
                        mediaKeywordsJoinArr.forEach(({ media_id, name }) => mediaKeywordsObjArr.forEach((mediaKeywordsObj, i) => (media_id === mediaKeywordsObj.media_id) && (mediaKeywordsObjArr[i].keywords.push(name))));

                        // Get media meta data.
                        db('media').leftJoin('mediaMeta', function() {
                          this.on('media.media_id', '=', 'mediaMeta.media_id').onIn('media.media_id', mediaIdArr);
                        }).select().then(mediaMetaJoinArr => {

                          const mediaMetaObjArr = [];
                          mediaMetaJoinArr.forEach(({ media_id }) => (!mediaMetaObjArr.includes(media_id) && media_id !== null) && (mediaMetaObjArr.push(media_id)));
                          mediaMetaObjArr.forEach((media_id, i) => mediaMetaObjArr[i] = { media_id, meta: {} });
                          mediaMetaJoinArr.forEach(({ media_id, name, value }) => mediaMetaObjArr.forEach((mediaMetaObj, i) => (media_id === mediaMetaObj.media_id) && (mediaMetaObjArr[i].meta[name] = value)));

                          // Combine all data.
                          mediaObjArr.forEach(mediaObj => {

                            mediaObj.albums   = [];
                            mediaObj.keywords = [];
                            mediaObj.meta     = {};

                            mediaAlbumsArr.forEach(mediaAlbumsObj => (mediaObj.media_id === mediaAlbumsObj.media_id) && (mediaAlbumsObj.albums.forEach(album_id => mediaObj.albums.push(album_id))));
                            mediaKeywordsObjArr.forEach(mediaKeywordsObj => (mediaObj.media_id === mediaKeywordsObj.media_id) && (mediaKeywordsObj.keywords.forEach(keyword => mediaObj.keywords.push(keyword))));
                            mediaMetaObjArr.forEach(mediaMetaObj => (mediaObj.media_id === mediaMetaObj.media_id) && (mediaObj.meta = mediaMetaObj.meta));
                          });

                          done(null, mediaObjArr);

                        }).catch(mediaMetaJoinErr => done(mediaMetaJoinErr));

                      }).catch(mediaKeywordsJoinErr => done(mediaKeywordsJoinErr));

                  }).catch(mediaAlbumsErr => done(mediaAlbumsErr));

              }).catch(mediaObjErr => done(mediaObjErr));

          }).catch(mediaIdObjErr => done(mediaIdObjErr));

      }

    }).catch(albumIdErr => done(albumIdErr));


};

const retrieveUsersMedia = (user_id, done) => {
  // Takes a user ID and a callback function as parameters.
  // Retrieves the media and its related data from the database
  // and passes null and an array of data to the callback function.

  // Check if user_id exists.
  db('users').where({ user_id })
    .select('user_id').then(userIdArr => {

      let userIdExists = (userIdArr.length === 1);

      if (!userIdExists) done(new Error(errors.userIdDoesNotExist));
      else {

        // Get media.
        db('media').where({ user_id })
        .select().then(mediaObjArr => {

          const mediaIdArr = mediaObjArr.map(mediaObj => mediaObj.media_id);

          // Get all albums media is in.
          db('mediaAlbums').whereIn('media_id', mediaIdArr)
            .select().then(mediaAlbumsObjArr => {

              const mediaAlbumsArr = [];
              mediaAlbumsObjArr.forEach(({ media_id }) => (!mediaAlbumsArr.includes(media_id)) && (mediaAlbumsArr.push(media_id)));
              mediaAlbumsArr.forEach((media_id, i) => mediaAlbumsArr[i] = { media_id, albums: [] });
              mediaAlbumsObjArr.forEach(({ media_id, album_id }) => mediaAlbumsArr.forEach(mediaAlbumObj => (media_id === mediaAlbumObj.media_id) && (mediaAlbumObj.albums.push(album_id))));

              // Get media keywords
              db('mediaKeywords').leftJoin('keywords', function() {
                  this.on('mediaKeywords.keyword_id', '=', 'keywords.keyword_id').onIn('mediaKeywords.media_id', mediaIdArr);
                }).select().then(mediaKeywordsJoinArr => {
                  
                  let mediaKeywordsObjArr = [];
                  mediaKeywordsJoinArr.forEach(({ media_id }) => (!mediaKeywordsObjArr.includes(media_id)) && (mediaKeywordsObjArr.push(media_id)));
                  mediaKeywordsObjArr.forEach((media_id, i) => mediaKeywordsObjArr[i] = { media_id, keywords: [] });
                  mediaKeywordsJoinArr.forEach(({ media_id, name }) => mediaKeywordsObjArr.forEach((mediaKeywordsObj, i) => (media_id === mediaKeywordsObj.media_id) && (mediaKeywordsObjArr[i].keywords.push(name))));

                  // Get media meta data.
                  db('media').leftJoin('mediaMeta', function() {
                    this.on('media.media_id', '=', 'mediaMeta.media_id').onIn('media.media_id', mediaIdArr);
                  }).select().then(mediaMetaJoinArr => {

                    const mediaMetaObjArr = [];
                    mediaMetaJoinArr.forEach(({ media_id }) => (!mediaMetaObjArr.includes(media_id) && media_id !== null) && (mediaMetaObjArr.push(media_id)));
                    mediaMetaObjArr.forEach((media_id, i) => mediaMetaObjArr[i] = { media_id, meta: {} });
                    mediaMetaJoinArr.forEach(({ media_id, name, value }) => mediaMetaObjArr.forEach((mediaMetaObj, i) => (media_id === mediaMetaObj.media_id) && (mediaMetaObjArr[i].meta[name] = value)));

                    // Combine all data.
                    mediaObjArr.forEach(mediaObj => {

                      mediaObj.albums   = [];
                      mediaObj.keywords = [];
                      mediaObj.meta     = {};

                      mediaAlbumsArr.forEach(mediaAlbumsObj => (mediaObj.media_id === mediaAlbumsObj.media_id) && (mediaAlbumsObj.albums.forEach(album_id => mediaObj.albums.push(album_id))));
                      mediaKeywordsObjArr.forEach(mediaKeywordsObj => (mediaObj.media_id === mediaKeywordsObj.media_id) && (mediaKeywordsObj.keywords.forEach(keyword => mediaObj.keywords.push(keyword))));
                      mediaMetaObjArr.forEach(mediaMetaObj => (mediaObj.media_id === mediaMetaObj.media_id) && (mediaObj.meta = mediaMetaObj.meta));
                    });

                    done(null, mediaObjArr);

                  }).catch(mediaMetaJoinErr => done(mediaMetaJoinErr));

                }).catch(mediaKeywordsJoinErr => done(mediaKeywordsJoinErr));

            }).catch(mediaAlbumsErr => done(mediaAlbumsErr));

        }).catch(mediaObjErr => done(mediaObjErr));

      }

    }).catch(userIdErr => done(userIdErr));
};

const deleteAlbumMedia = (album_id, media_id, done) => {

  return db('mediaAlbums').where({ album_id, media_id })
    .del()
    .then(deleted => {

      if (!deleted) done (new Error(errors.mediaAlbumDoesNotExist));
      else done(null, deleted);

    })
    .catch(mediaAlbumsErr => done(mediaAlbumsErr));

};

module.exports = {
  createMediaToAlbums,
  createMedia,
  createManyKeywords,
  createManyKeywordsToMedia,
  createManyMediaMeta,
  retrieveAlbumsMedia,
  retrieveUsersMedia,
  deleteAlbumMedia,
};