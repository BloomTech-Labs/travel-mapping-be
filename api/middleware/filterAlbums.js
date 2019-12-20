const models = require('../../data/models/models');


const filterAlbum = (req, res, next) => {

    const album_id = parseInt(req.params.album_id);


    models.album.retrieveAlbumById(album_id, ( albumObj, keywordsArr, mediaObjArr, ) => {

   if (albumObj.album_id && keywordsArr.name && mediaObjArr ){
mediaObjArr.filter(album =>{
    
    return album.name.includes(album)
    

})
next();
   }


    });

}


module.exports = {
    filterAlbum,
}