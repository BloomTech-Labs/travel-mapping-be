
module.exports = {
  
  // Users
  getUsers:     () => '/users',
  getUserById:  (user_id) => (typeof user_id !== 'undefined' ? `/users/${ user_id }`        : '/users/:user_id'),          // Send collaborator invitation data with user
  registerUser: (type)    => (typeof type    !== 'undefined' ? `/users/register/${ type }`  : '/users/register/:type'),
  loginUser:    (type)    => (typeof type    !== 'undefined' ? `/users/login/${ type }`     : '/users/login/:type'),
  editUser:     (user_id) => (typeof user_id !== 'undefined' ? `/users/${ user_id }/edit`   : '/users/:user_id/edit'),
  removeUser:   (user_id) => (typeof user_id !== 'undefined' ? `/users/${ user_id }/remove` : '/users/:user_id/remove'),
  
  // Albums
  createAlbum:      (user_id)  => (typeof user_id  !== 'undefined' ? `/users/${ user_id }/albums/create` : '/users/:user_id/albums/create'),
  getUsersAlbums:   (user_id)  => (typeof user_id  !== 'undefined' ? `/users/${ user_id }/albums`        : '/users/:user_id/albums'),        // Send albums that user owns
  getCollabAlbums:  (user_id)  => (typeof user_id  !== 'undefined' ? `/users/${ user_id }/albums/c`      : '/users/:user_id/albums/c'),      // Send albums that user is a collaborator on
  getAlbumCollab:   (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/c`           : '/albums/:album_id/c'),           // Send all of an albums collaborators
  editAlbum:        (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/edit`        : '/albums/:album_id/edit'),
  removeAlbum:      (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/remove`      : '/albums/:album_id/remove'),
  addAlbumMetaData: (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/meta/add`    : '/albums/:album_id/meta/add'),
  removeMetaData:   (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/meta/remove` : '/albums/:album_id/meta/remove'),

  // Media
  getAlbumsMedia: (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/media`      : '/albums/:album_id/media'), // Send media that belongs to an album
  getUsersMedia:  (user_id)  => (typeof user_id  !== 'undefined' ? `/users/${ user_id }/media`        : '/users/:user_id/media'),   // Send media that belongs to a user.
  addAlbumsMedia: (user_id)  => (typeof user_id  !== 'undefined' ? `/users/${ user_id }/media/add`    : '/users/:user_id/media/add'),
  removeMedia:    (user_id)  => (typeof user_id  !== 'undefined' ? `/users/${ user_id }/media/remove` : '/users/:user_id/media/remove'), // Contains an array of media IDs to delete. Only owner and admin can do this.
  
  // Comments
  getAlbumsComments: (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/comments` : '/albums/:album_id/comments'),

};