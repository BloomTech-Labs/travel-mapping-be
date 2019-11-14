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
                  .select()
                  .then(newAlbumArr => {
                    
                    done(null, newAlbumArr);

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

const createAlbumMeta = (album_id, metaDataArr, done) => {
  // Takes an album id, array of meta objects, and a callback 
  // function as arguments. Validates the meta data, creates the
  // meta data, and passes null and the created meta data to the
  // callback function.

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

              const newMetaObjArr = metaDataArr.map(metaObj => Object.assign({}, metaObj, { album_id }))

              // Create the meta fields.
              db('albumsMeta').insert(newMetaObjArr, returning ? ['album_id'] : null)
                .then(albumIdArr => {

                  // Get the meta data.
                  db('albumsMeta').where({ album_id: albumIdArr[0] })
                    .select()
                    .then(newMetaArr => {

                      done(null, newMetaArr);

                    }).catch(newMetaErr => done(newMetaErr));

                }).catch(insertErr => done(insertErr));

            }

          }).catch(metaErr => done(metaErr));

        }

    }).catch(albumIdErr => done(albumIdErr));
};

module.exports = {
  createAlbum,
  retrieveUsersAlbums,
  createAlbumMeta,
};