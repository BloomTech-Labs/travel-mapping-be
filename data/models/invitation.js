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

const getInvitesByAlbum = (album_id, done) => {

  // check that album exists
  db('albums').where({ album_id })
    .first()
    .then(album => {

      if (!album) done(new Error(errors.albumIdDoesNotExist));
      else {

        db('invitations').where({ album_id })
          .select()
          .then(inviteArr => {

            done(null, inviteArr);

          }).catch(inviteErr => done(inviteErr));

      }

    }).catch(albumErr => done(albumErr));

};

const getInvitesByUser = (user_id, done) => {
 
  db('invitations').where({ user_id })
    .select()  
    .then(inviteArr => {

      done(null, inviteArr);

    }).catch(inviteErr => done(inviteErr));

};

const getInvitesForUser = (invited_user_id, done) => {

  db('invitations').where({ invited_user_id })
    .select()
    .then(inviteArr => {

      done(null, inviteArr);

    }).catch(inviteErr => done(inviteErr));

};

const deleteInviteById = (invitation_id, done) => {

  db('invitations').where({ invitation_id })
    .first()
    .then(invite => {
      console.log(invite);
      if (!invite) done(new Error(errors.inviteeIdDoesNotExist));
      else {

        db('invitations').where({ invitation_id })
          .del()
          .then(removed => {
          
            done(null, { invitation_id: invite.invitation_id});

          }).catch(removalError => done(removalError));

      }

    }).catch(inviteErr => done(inviteErr));

};

const getInviteById = (invitation_id, done) => {

  db('invitations').where({ invitation_id })
    .first()
    .then(invite => {

      done(null, invite);

    }).catch(inviteErr => done(inviteErr));

};

module.exports = {
  createInvitation,
  getInvitesByAlbum,
  getInvitesByUser,
  getInvitesForUser,
  deleteInviteById,
  getInviteById,
};