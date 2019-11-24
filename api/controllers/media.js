const validate = require('../../modules/modules').validate;
const errors   = require('../../modules/modules').errors;
const models   = require('../../data/models/models');
const jwt      = require('jsonwebtoken');

const addAlbumsMedia = (req, res, next) => {
  
  const errorMsgOrTrue = validate.addMediaProps(req.body);

  if (errorMsgOrTrue !== true) next(errorMsgOrTrue);
  else {

    try {
      
      const user_id = parseInt(req.params.user_id);
      const { albums, media }  = req.body;
      const { keywords, meta } = media;

      const mediaOnlyArr = media.map(mediaObj => ({ title: mediaObj.title, caption: mediaObj.caption }));

      models.media.createMedia(user_id, mediaOnlyArr, (createMediaErr, createdMediaArr) => {

        if (createMediaErr) next(createMediaErr);
        else {
          
          res.status(200).json(createdMediaArr);

        }

      });

    } catch (err) {
      console.error(err);
      next(new Error(errors.serverError));
    }

  }

};

module.exports = {
  addAlbumsMedia,
};