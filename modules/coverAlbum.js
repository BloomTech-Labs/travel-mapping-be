const media = require('../data/models/media');

// Taken almost verbatim out of the getUserAlbums and AddAlbumMetaData controllers
// made into its own function here for simplicity and ease of reuse.
// accepts an object containing the details of an album, such as is returned by
// the album model, adds a property with a url to its cover image.
const generateAlbumCover = (albumObj, next) => {

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
    next(null, albumObj);
  });
};

module.exports = {
  generateAlbumCover
};