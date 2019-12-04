const models = require('../../data/models/models');


const filterAlbum = (req, res, next) => {

    const album_id = parseInt(req.params.album_id);


    models.album.retrieveAlbumById(album_id, ( albumObj, keywordsArr ) => {

   if (albumObj.album_id && keywordsArr.name ){
keywordsArr.filter(album =>{

    return album.name.includes(req.body)
    

})
next();
   }


    });

}


module.exports = {
    filterAlbum,
}