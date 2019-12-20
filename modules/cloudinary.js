const cloudinary = require('cloudinary').v2;

const uploadMedia = (mediaBuffer, options) => {

  return new Promise((resolve, reject) => {

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY
    });

    cloudinary.uploader.upload(mediaBuffer, options, (err, res) => {
      if (err) reject(err);
       else return resolve(res);
    });
  });

};

module.exports = {
  uploadMedia,
};
