const db = require('../dbConfig');
const errors = require('../../modules/modules').errors;

const createInvitation = (album_id, user_id, invited_user_id, done) => {

  // check that the inviting user, and invited user both exist
  db('users').whereIn('user_id', [ user_id, invited_user_id ])
    .select('user_id')
    .then(userIdArr => {

      userIdArr = userIdArr.map(e => e.user_id);

      if (!userIdArr.includes(user_id)) done(new Error(errors.userIdDoesNotExist));
      else if (!userIdArr.includes(invited_user_id)) done(new Error(errors.inviteeIdDoesNotExist));
      else {

        // check that the album exists
        db('albums').where({ album_id })
          .first('album_id')
          .then(selectedAlbum => {
            
            if (selectedAlbum.album_id !== album_id) done(new Error(errors.albumIdDoesNotExist));
            else {

              // check that there is not already a pending invitation for that user to that album
              db('invitations').where({ album_id, invited_user_id })
                .first()
                .then(existingInvitation => {
                  
                  if (existingInvitation) done(new Error(errors.invitationAlreadyexists));
                  else {

                    // create the invitation
                    db('invitations')
                      .insert({ user_id, invited_user_id, album_id })
                      .then(([invitation_id]) => {
                        
                        // retrieve the new invitation, return it to the controller
                        db('invitations').where('invitation_id', invitation_id)
                          .first()
                          .then(newInvite => {

                            done(null, newInvite);

                          }).catch(inviteRetrievalErr => done(inviteRetrievalErr));

                      }).catch(inviteCreationErr => done(inviteCreationErr));

                  }
                }).catch(inviteRetrievalErr => done(inviteRetrievalErr));
              
            }
          }).catch(albumErr => done(albumErr));
      }
    }).catch(userErr => done(userErr));
  
};

module.exports = {
  createInvitation
};