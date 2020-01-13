
module.exports = {
  
  // Users
  registerUser: (type)    => (typeof type    !== 'undefined' ? `/users/register/${ type }`  : '/users/register/:type'),
  getUserById:  (user_id) => (typeof user_id !== 'undefined' ? `/users/${ user_id }`        : '/users/:user_id'),          // Send collaborator invitation data with user
  removeUser:   (user_id) => (typeof user_id !== 'undefined' ? `/users/${ user_id }/remove` : '/users/:user_id/remove'),
  loginUser:    (type)    => (typeof type    !== 'undefined' ? `/users/login/${ type }`     : '/users/login/:type'),
  editUser:     (user_id) => (typeof user_id !== 'undefined' ? `/users/${ user_id }/edit`   : '/users/:user_id/edit'),
  getUsers:     () => '/users',
  
  // Albums
  addAlbumMetaData: (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/meta/add`    : '/albums/:album_id/meta/add'),
  getCollabAlbums:  (user_id)  => (typeof user_id  !== 'undefined' ? `/users/${ user_id }/albums/c`      : '/users/:user_id/albums/c'),      // Send albums that user is a collaborator on
  getUsersAlbums:   (user_id)  => (typeof user_id  !== 'undefined' ? `/users/${ user_id }/albums`        : '/users/:user_id/albums'),        // Send albums that user owns
  getAlbumCollab:   (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/c`           : '/albums/:album_id/c'),           // Send all of an albums collaborators
  removeMetaData:   (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/meta/remove` : '/albums/:album_id/meta/remove'),
  removeAlbum:      (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/remove`      : '/albums/:album_id/remove'),
  createAlbum:      (user_id)  => (typeof user_id  !== 'undefined' ? `/users/${ user_id }/albums/create` : '/users/:user_id/albums/create'),
  editAlbum:        (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/edit`        : '/albums/:album_id/edit'),
  getAlbum:         (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }`             : '/albums/:album_id'),              // get data for a specific album
  editAlbumMeta:    (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/meta/edit`   : '/albums/:album_id/meta/edit'),    // add/remove metadata from an album

  // Media
  getAlbumsMedia: (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/media`      : '/albums/:album_id/media'), // Send media that belongs to an album
  addAlbumsMedia: (user_id)  => (typeof user_id  !== 'undefined' ? `/users/${ user_id }/media/add`    : '/users/:user_id/media/add'),
  getUsersMedia:  (user_id)  => (typeof user_id  !== 'undefined' ? `/users/${ user_id }/media`        : '/users/:user_id/media'),   // Send media that belongs to a user.
  // removeMedia:    (user_id)  => (typeof user_id  !== 'undefined' ? `/users/${ user_id }/media/remove` : '/users/:user_id/media/remove'), // Contains an array of media IDs to delete. Only owner and admin can do this.
  viewUsersMedia: (user_id, title, type) => ((typeof user_id !== 'undefined' && typeof title !== 'undefined' && typeof type !== 'undefined') ? `/users/${ user_id }/media/${ type }/${ title }` : '/users/:user_id/media/:type/:title'),
  viewMedia:      (type, title) => (typeof title !== 'undefined' ? `/media/${ type }/${ title }` : '/media/:type/:title'),
  editMedia:      () => ('/media/data/:media_id/edit'),
  deleteMedia:    () => ('/albums/:album_id/media/:media_id/remove'),
  getMediaData:   () => ('/media/data/:media_id/view'),

  // Comments
  getAlbumsComments: (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/comments` : '/albums/:album_id/comments'),

  // Invitations
  createInvitation: (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/invites/create` : '/albums/:album_id/invites/create'),
  getInvitesByAlbum: (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/invites/` : '/albums/:album_id/invites/'),
  getInvitesByUser: (user_id) => (typeof user_id !== 'undefined' ? `/users/${ user_id }/invites/from` : '/users/:user_id/invites/from'),
  getInvitesForUser: (user_id) => (typeof user_id !== 'undefined' ? `/users/${ user_id }/invites/to` : '/users/:user_id/invites/to'),
  removeInvitation: (invite_id) => (typeof invite_id !== 'undefined' ? `/invites/${ invite_id }/remove` : '/invites/:invite_id/remove'),
  acceptInvitation: (invite_id) => (typeof invite_id !== 'undefined' ? `/invites/${ invite_id }/accept` : '/invites/:invite_id/accept'),

  // Collaborators
  deleteCollaborator: (album_id, collaborator_id) => (typeof album_id !== 'undefined' && typeof collaborator_id !== 'undefined' ? `/albums/${ album_id }/collaborators/${ collaborator_id }/remove`: '/albums/:album_id/collaborators/:collaborator_id/remove'),
  getCollaborators: (album_id) => (typeof album_id !== 'undefined' ? `/albums/${ album_id }/collaborators`: '/albums/:album_id/collaborators'),

};