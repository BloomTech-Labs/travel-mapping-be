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

  db('mediaAlbums').where({ album_id, media_id })
    .del()
    .then(deleted => {

      if (!deleted) done (new Error(errors.mediaAlbumDoesNotExist));
      else done(null, deleted);

    })
    .catch(mediaAlbumsErr => done(mediaAlbumsErr));

};

const editMedia = (media_id, updates, done) => {

  const finishedKeywords = (err) => {

    if (err) done(err);
    else if (meta) {

      updateMeta(media_id, meta, done);

    }
    else {

      done(null, { edited: media_id });
    }

  };

  const { keywords, meta, title, ...mediaUpdates } = updates;

  updateMediaObj(media_id, mediaUpdates, (updateErr, updatesWereMade) => {

    if (updateErr) done(updateErr);
    else {

      if (keywords) {

        updateKeywords(media_id, keywords, (updateErr, currentKeywords) => {

          if (updateErr) done(updateErr);
          else {

            finishedKeywords(null);

          }

        });

      } else {

        finishedKeywords(null);

      }

    }

  });


};

// pretty simple. if there are updates to be made to indicated row in the media table apply them and return true
// else return false
const updateMediaObj = (media_id, updates, done) => {

  if (!Object.keys(updates).length) done(null, false);
  else {
   
    db('media').where({ media_id })
      .update({...updates, updated_at: db.fn.now()})
      .then(() => {

        done(null, true);

      })
      .catch(err => {
        done(err);
      });

  }

};

// All keyword changes happen here
const updateKeywords = (media_id, newKeywords, done) => {

  getKeywordsArr(media_id, (joinErr, currentKeywords) => {

    if (joinErr) done(joinErr);
    else {

      const diff = getKeywordsDiff(newKeywords, currentKeywords);
      
      // there are keywords to add
      if (diff.add.length) {

        addWhereNotFound(media_id, diff.add, (addErr, added) => {

          if (addErr) done(addErr);
          else {

            // there are also keywords to remove
            if (diff.remove.length) {

              removeKeywordAssociations(media_id, diff.remove, done);

            // keywords were added, but none to remove
            } else {

              done(null, added);

            }

          }

        });

      // there are keywords to remove, but none to add
      } else if (diff.remove.length) {

        removeKeywordAssociations(media_id, diff.remove, done);

      // no keywords need to be changed
      } else done(null);

    }

  });

};

// newKeywords expected in form [String], oldKeywords expected in form [{keyword_id: Integer, name: String}]
// this doesn't matter at (relatively) small array lengths, but really, really will not scale well to larger sizes.
// figure out something more efficient if expecting to handle large arrays. Probably switch to objects.
const getKeywordsDiff = (newKeywords, oldKeywords) => {

  if (!(newKeywords && newKeywords.length)) return false;

  const add = newKeywords.filter(e => !oldKeywords.filter(f => f.name === e).length);
  const remove = oldKeywords.filter(e => !newKeywords.filter(f => f === e.name).length);
  
  return { add, remove };

};

const getKeywordsArr = (media_id, done) => {

  db('media').where('media.media_id', media_id)
    .join('mediaKeywords', 'media.media_id', '=', 'mediaKeywords.media_id')
    .join('keywords', 'keywords.keyword_id', '=', 'mediaKeywords.keyword_id')
    .select('keywords.keyword_id', 'keywords.name')
    .then(keywordsArr => {

      done(null, keywordsArr);

    })
    .catch(err => {
      done(err);
    });

};

// if a keyword is not already in the keywords table, create it. then associate it with the provided media_id
const addWhereNotFound = (media_id, newKeywords, done) => {

  db('keywords').whereIn('name', newKeywords)
    .select('keyword_id', 'name')
    .then(found => {

      const foundIds = found.map(e => e.keyword_id);
      const notFound = newKeywords.filter(e => !found.filter(f => e === f.name).length);
      
      // keywords need to be added AND associated with the media_id
      if (notFound.length) {

        const keywordsToAdd = notFound.map(e => ({ name: e }));

        db('keywords').insert(keywordsToAdd)
        .then(addedKeywords => {

          associateKeywords(media_id, [...foundIds, ...addedKeywords]);

        }).catch(keywordInsertErr => done(keywordInsertErr));

      // no keywords need to be created
      } else {

        // keywords already exist, but need to be associated with the media_id
        if (foundIds.length) {

          associateKeywords(media_id, foundIds, done);

        // no keywords need to be changed
        } else {

          done(null, 0)
        };

      }

    }).catch(keywordSelectErr => done(keywordSelectErr));

};      

// create an association between the media_id and provided list of keywords
const associateKeywords = (media_id, keywordsToAssociate, done) => {

  const toInsert = keywordsToAssociate.map(e => ({ keyword_id: e, media_id }));
  db('mediaKeywords').insert(toInsert)
    .then(added => {

        done(null, added);

    })
    .catch(err => done(err));

};

// removed keyword associations with the given media_id
const removeKeywordAssociations = (media_id, keywordsToDisassociate, done) => {

  const toRemove = keywordsToDisassociate.map(e => ([media_id, e.keyword_id]));

  db('mediaKeywords').whereIn(['media_id', 'keyword_id'], toRemove)
    .del()
    .then(deleted => {

      done(null, deleted);

    }).catch(err => done(err));

};

// All meta updates are controlled from here
const updateMeta = (media_id, updatedMeta, done) => {

  db('mediaMeta').where({ media_id })
    .then(existingMeta => {

      const diff = getMetaDiff(existingMeta, updatedMeta);
      const diffRemoveIds = diff.remove.map(e => e.mediaMeta_id);

      if (diff.add.length) {

        // there is meta to add
        addMeta(media_id, diff.add, (addMetaErr, addedMeta) => {

          if (addMetaErr) done(addMetaErr);
          else {

            // there is also meta to remove
            if (diff.remove.length) {

              removeMeta(diffRemoveIds, (removeMetaErr, removedMeta) => {

                if (removeMetaErr) done(removeMetaErr);
                else {

                  done(null, removedMeta);

                }

              });

            // meta was added, but none to remove
            } else {

              done(null);

            }

          }

        });

      // no meta needs to be added, but some must be removed
      } else if (diff.remove.length) {

        removeMeta(diffRemoveIds, (removeMetaErr, removedMeta) => {

          if (removedMetaErr) done(removeMetaErr);
          else {

            done(null, removeMeta);

          }

        });

      // there is no meta to add or remove
      } else {

        done(null);

      }

    })

};

// figure out which meta needs to be created, and what needs to be deleted
const getMetaDiff = (currentMeta, newMeta) => {

  const add = newMeta.filter(e => !currentMeta.filter(f => e.name === f.name && e.value === f.value).length);
  const remove = currentMeta.filter(e => !newMeta.filter(f => e.name === f.name && e.value === f.value).length);

  return { add, remove };

};

// toAdd is an array of objects in the form { name: String, value: String }
const addMeta = (media_id, toAdd, done) => {

  const toInsert = toAdd.map(e => ({ media_id, ...e }));
  db('mediaMeta').insert(toInsert)
  .then(inserted => {

      done(null, inserted);

  })
  .catch(err => done(err));

};

// expect toRemove to be an array of mediaMeta_ids only. Just integers, not objects.
const removeMeta = (toRemove, done) => {

  db('mediaMeta').whereIn('mediaMeta_id', toRemove)
    .del()
    .then(removed => {

        done(null, removed);

    })
    .catch(err => {
      done(err);
    });
    

};

const isOwnerOrCollaborator = (media_id, user_id, done) => {

  db('mediaAlbums').where({ media_id })
    .join('albums', 'albums.album_id', '=', 'mediaAlbums.album_id')
    .leftJoin('collaborators', 'collaborators.album_id', '=', 'albums.album_id')
    .distinct(['collaborators.user_id as collab_user', 'albums.user_id as album_owner'])
    .then(res => {

      const legitUsers = res.reduce((acc, e) => {

        if (e.album_owner) acc.owners[e.album_owner] = e.album_owner;
        if (e.collab_user) acc.collaborators[e.collab_user] = e.collab_user;

        return acc;

      }, { owners: {}, collaborators: {} });

      const isOwner = legitUsers.owners[user_id] === user_id;
      const isCollab = legitUsers.collaborators[user_id] === user_id;

      done(null, isOwner, isCollab);

    })
    .catch(err => {
      done(err);
    });

};

const getMediaData = (media_id, done) => {

  db('media').where({ media_id })
    .first()
    .then(mediaObj => {

      getMediaKeywords(mediaObj, (keywordsErr, withKeywords) => {

        if (keywordsErr) done(keywordsErr);
        else {

          getMediaMeta(withKeywords, (metaErr, withMeta) => {

            if (metaErr) next(metaErr);
            else {

              done(null, withMeta);

            }

          });

        }

      });

    })
    .catch(err => {
      done(err);
    });

};

const getMediaKeywords = (mediaObj, done) => {

  db('mediaKeywords').where('media_id', mediaObj.media_id)
    .join('keywords', 'keywords.keyword_id', '=', 'mediaKeywords.keyword_id')
    .select(
      'keywords.name'
    )
    .then(res => {

      const keywords = res.map(e => e.name);
      mediaObj.keywords = keywords;

      done(null, mediaObj);

    })
    .catch(err => {
      done(err);
    })

};

const getMediaMeta = (mediaObj, done) => {

  db('mediaMeta').where('media_id', mediaObj.media_id)
    .select(
      'name',
      'value'
    )
    .then(res => {

      mediaObj.meta = res;

      done(null, mediaObj);

    })
    .catch(err => {
      done(err);
    });

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
  editMedia,
  isOwnerOrCollaborator,
  getMediaData,
};




// // accept the results of a join between one media object, and all its keyword ids on mediaKeywords, and all their names on keywords
// // collect those keywords and return them in an array on the media object.
// const formatKeywords = (rawMedia) => {

//   const { name, keyword_id, ...rest } = rawMedia[0];
//   return rawMedia.reduce((acc , e) => {

//     acc.keywords.push({
//       name: e.name,
//       keyword_id: e.keyword_id
//     });
//     return acc;

//   }, { ...rest, keywords: [] });

// };

// const joinMediaToKeywords = (media_id, done) => {

//   db('media').where('media.media_id', media_id)
//     .join('mediaKeywords', 'media.media_id', '=', 'mediaKeywords.media_id')
//     .join('keywords', 'keywords.keyword_id', '=', 'mediaKeywords.keyword_id')
//     .then(rawMedia => {

//       done(null, rawMedia);

//     })
//     .catch(err => {
//       done(err);
//     });

// };