const validate = require('../../modules/modules').validate;
const errors   = require('../../modules/modules').errors;
const models   = require('../../data/models/models');
const jwt      = require('jsonwebtoken');

const addAlbumsMedia = (req, res, next) => {
  
  // console.log(req.files)

  const errorMsgOrTrue = validate.addMediaProps(req.body);

  if (errorMsgOrTrue !== true) next(errorMsgOrTrue);
  else {

    try {
      
      const user_id = parseInt(req.params.user_id);
      const { albums, media }  = req.body;

      const mediaOnlyArr = media.map(mediaObj => ({ title: mediaObj.title, caption: mediaObj.caption }));

      models.media.createMedia(user_id, mediaOnlyArr, (createMediaErr, createdMediaArr) => {

        if (createMediaErr) next(createMediaErr);
        else {

          const mediaIdArr = createdMediaArr.map(mediaObj => mediaObj.media_id);

          models.media.createMediaToAlbums(albums, mediaIdArr, (createMediaAlbumErr, createMediaAlbumNum) => {

            if (createMediaAlbumErr) done(createMediaAlbumErr);
            else {

              const keywords = media.map(mediaObj => mediaObj.keywords);

              models.media.createManyKeywords(keywords, (createKeywordErr, keywordsObjArr) => {

                if (createKeywordErr) done(createKeywordErr);
                else {

                  const keywordsIdArr = keywordsObjArr.map(keyArr => keyArr.map(keyObj => keyObj.keyword_id));

                  models.media.createManyKeywordsToMedia(mediaIdArr, keywordsIdArr, (createMediaKeywordErr, createdNum) => {

                    if (createMediaKeywordErr) done(createMediaKeywordErr);
                    else {

                      const mediaMetaArr = media.map(mediaObj => mediaObj.meta);

                      console.log(mediaMetaArr);
                      // console.log(mediaIdArr);
                      // console.log(keywordsIdArr);
  
                      res.status(200).json(keywordsObjArr);

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

};

module.exports = {
  addAlbumsMedia,
};