const db       = require('../dbConfig');
const errors   = require('../../modules/modules').errors;
const validate = require('../../modules/modules').validate;
const environment = process.env.NODE_ENV || 'development';
const returning   = (environment === 'review'  ||   
                     environment === 'staging' ||
                     environment === 'production');

const createAlbum = (albumObj, done) => {
  // Takes an album object and a callback function as arguments.
  // Validates the album data, creates an album in the database, and
  // passes the id to the callback function.

  const { user_id, title, description, access, } = albumObj;

  // Check if user id exists.
  db('users').where({ user_id })
    .select('user_id')
    .then(userIdArr => {

      // Check if title exists in the users albums.
      db('albums').where({ user_id, title })
        .select('title')
        .then(titleArr => {

          // Validate user data
          const userIdExists       = (userIdArr.length > 0);
          const albumTitleExists   = (titleArr.length === 1 ? (titleArr[0].title === title) : false);
          const titleIsValid       = validate.albumTitle(title);
          const descriptionIsValid = (description ? validate.albumDescription(description) : true);
          const accessIsValid      = (access ? validate.albumAccess(access) : true);

          if(!userIdExists)               done(new Error(errors.userIdDoesNotExist));
          else if(albumTitleExists)       done(new Error(errors.albumTitleExists));
          else if(!titleIsValid)          done(new Error(errors.invalidAlbumTitle));
          else if(!descriptionIsValid)    done(new Error(errors.invalidAlbumDescription));
          else if(!accessIsValid)         done(new Error(errors.invalidAlbumAccess));
          else {

            // Create the album.
            db('albums').insert(albumObj, returning ? ['album_id'] : null)
              .then(albumIdArr => {

                const album_id = returning ? albumIdArr[0].album_id : albumIdArr[0];

                // Retrieve the new album.
                db('albums').where({ album_id })
                  .select().then(newAlbumArr => {
                    
                    const newAlbumObj = Object.assign({}, newAlbumArr[0], { meta: {} });
                    done(null, newAlbumObj);

                  }).catch(newAlbumErr => done(newAlbumErr));

              }).catch(insertErr => done(insertErr));
          }

        }).catch(titleErr => done(titleErr));

    }).catch(userErr => done(userErr));

};

const retrieveUsersAlbums = (user_id, done) => {
  // Takes a user id and a callback function as arguments.
  // Joins the users albums and each albums meta data and passes
  // an array of objects to a callback function.

  // Check if user id exists.
  db('users').where({ user_id })
    .select('user_id')
    .then(userIdArr => {

      if (userIdArr.length === 0) done(new Error(errors.userIdDoesNotExist));
      else {

        // Get users albums.
        db('albums').where({ user_id })
          .select()
          .then(albumsArr => {

            // Get album meta data and join it with albums.
            db('albums').where({ user_id })
              .join('albumsMeta', 'albums.album_id', '=', 'albumsMeta.album_id')
              .select('albums.album_id', 'albumsMeta.name', 'albumsMeta.value')
              .then(albumsMetaArr => {

                const albums = [];

                albumsArr.forEach(album => {

                  const meta = {};

                  albumsMetaArr.forEach(albumMeta => {

                    if (album.album_id === albumMeta.album_id) {
                      meta[albumMeta.name] = albumMeta.value;
                    } 

                  });

                  albums.push({ ...album, meta });

                });

                done(null, albums);

              }).catch(albumsMetaErr => done(albumsMetaErr));
            
          }).catch(retrieveAlbumsErr => done(retrieveAlbumsErr));

      }

    }).catch(userIdErr => done(userIdErr));
};

const retrieveAlbumById = (album_id, done) => {
  // Takes an album id and a callback function as arguments.
  // retrieves the album from the database and passes the album
  // and its meta data to the callback function.

  // Get the album.
  db('albums').where({ album_id })
    .select().then(albumArr => {

      if (albumArr.length === 0) done(new Error(errors.albumIdDoesNotExist));
      else {
        const albumObj = Object.assign({}, albumArr[0], { 
          album_id: parseInt(albumArr[0].album_id),
          user_id:  parseInt(albumArr[0].user_id),
        });

        // Get the albums meta data.
        db('albumsMeta').where({ album_id })
          .select('name', 'value').then(metaArr => {

            metaArr.length > 0 ? (albumObj.meta = metaArr.map(obj => ({ [obj.name]: obj.value })).reduce((acc, obj) => Object.assign({}, acc, obj))) : (albumObj.meta = {});
            done(null, albumObj);

          }).catch(metaErr => done(metaErr));

      }

    }).catch(albumErr => done(albumErr));

};

const createAlbumMeta = (album_id, metaDataArr, done) => {
  // Takes an album id, array of meta objects, and a callback 
  // function as arguments. Validates the meta data, creates the
  // meta data, and passes null and the album with the updated meta
  // data to the callback function.

  // Check if album id exists.
  db('albums').where({ album_id })
    .select('album_id')
    .then(albumIdArr => {

      if (albumIdArr.length === 0) done(new Error(errors.albumIdDoesNotExist));
      else {

        // Check if meta data already exists.
        db('albumsMeta').where({ album_id })
          .select('name')
          .then(metaNameArr => {

            let metaNameExists = false;
            const nameArr = metaNameArr.map(nameObj => nameObj.name);
            metaDataArr.forEach(metaObj => nameArr.includes(metaObj.name) && (metaNameExists = true));

            if (metaNameExists) done(new Error(errors.metaFieldExists));
            else {

              // Validate the meta name and description.
              let nameIsValid  = true;
              let valueIsValid = true;
              metaDataArr.forEach(metaObj => {
                if (!validate.metaName(metaObj.name))   nameIsValid  = false;
                if (!validate.metaValue(metaObj.value)) valueIsValid = false;
              });

              if (!nameIsValid)       done(new Error(errors.invalidMetaName));
              else if (!valueIsValid) done(new Error(errors.invalidMetaValue));
              else {
                
                const newMetaObjArr = metaDataArr.map(metaObj => Object.assign({}, metaObj, { album_id }));

                // Create the meta fields.
                db('albumsMeta').insert(newMetaObjArr, returning ? ['album_id'] : null)
                  .then(albumIdArr => {

                    // Get the meta data.
                    db('albumsMeta').where({ album_id })
                      .select()
                      .then(newMetaArr => {
                        
                        let metaDataObj;
                        newMetaArr.forEach(metaObj => (metaDataObj = Object.assign({}, metaDataObj, { [metaObj.name]: metaObj.value } )));

                        // Update the album.
                        db('albums').update({ updated_at: db.fn.now() })
                          .where({ album_id })
                          .then(updateAlbumArr => {

                            // Get the new album.
                            db('albums').where({ album_id })
                              .select()
                              .then(newAlbumArr => {

                                const albumObj = Object.assign({}, newAlbumArr[0], { meta: metaDataObj });
                                done(null, albumObj);

                              }).catch(newAlbumErr => done(newAlbumErr));

                          }).catch(newAlbumErr => done(newAlbumErr));                        

                      }).catch(newMetaErr => done(newMetaErr));

                  }).catch(insertErr => done(insertErr));

              }

            }

          }).catch(metaErr => done(metaErr));

        }

    }).catch(albumIdErr => done(albumIdErr));
};

module.exports = {
  createAlbum,
  retrieveUsersAlbums,
  retrieveAlbumById,
  createAlbumMeta,
};