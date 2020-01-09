const db          = require('../../data/dbConfig');
const errors      = require('../../modules/modules').errors;
const routes      = require('../../modules/modules').routes;
const bcrypt      = require('bcrypt');
const salt        = parseInt(process.env.PASS_SALT) || 10;
const environment = process.env.NODE_ENV || 'development';
const chaiHttp    = require('chai-http');
const chai        = require('chai');
const expect      = chai.expect;
const server      = environment === 'testing' 
  ? require('../../server')
  : 'http://localhost:4000';

chai.use(chaiHttp);

const PASS = 'hkTQ%*03';

const USERS = [{
  user_id: 0,
  display_name: 'tuser00',
  email:        'test.user00@mail.com',
  is_admin:     false,
  password:     bcrypt.hashSync(PASS, salt),
}, {
  user_id: 1,
  display_name: 'tuser01',
  email:        'test.user01@mail.com',
  is_admin:     false,
  password:     bcrypt.hashSync(PASS, salt),
}, {
  user_id: 2,
  display_name: 'tuser02',
  email:        'test.user02@mail.com',
  is_admin:     true,
  password:     bcrypt.hashSync(PASS, salt),
}, {
  user_id: 3,
  display_name: 'tuser03',
  email:        'test.user03@mail.com',
  is_admin:     false,
  password:     bcrypt.hashSync(PASS, salt),
}];

const ALBUMS = [{
  album_id: 0,
  user_id: 0,
  title: 'A title',
  description: 'A short description about an album',
  access: 'public',
}, {
  album_id: 1,
  user_id: 0,
  title: 'Another title',
  description: 'Another short description about an album',
  access: 'private',
}, {
  album_id: 2,
  user_id: 2,
  title: 'A title',
  description: 'A short description about an album',
  access: 'public',
}, {
  album_id: 3,
  user_id: 2,
  title: 'Another title',
  description: 'Another short description about an album',
  access: 'private',
}];

const ALBUMS_META = [{
  albumMeta_id: 0,
  album_id: 0,
  name: 'Location',
  value: 'Mexico',
}, {
  albumMeta_id: 1,
  album_id: 0,
  name: 'People',
  value: 'Friends',
}, {
  albumMeta_id: 2,
  album_id: 1,
  name: 'Location',
  value: 'Mexico',
}];

describe('Album endpoint tests', () => {

  describe(`${ routes.removeAlbum() }`, () => {

    beforeEach('clear data in users and albums tables', done => {
      db.select()
        .from('users')
        .del()
        .then(() => {
        
          db.select()
            .from('albums')
            .del()
            .then(()   => done())
            .catch(err => done(err));
        
        })
        .catch(err => done(err));

      
    });

    beforeEach('add data to users and albums tables', done => {

      db('users').insert(USERS)
      .then(userData => {
        
        db('albums').insert(ALBUMS)
          .then(albumData => {

            db('albumsMeta').insert(ALBUMS_META)
              .then(albumsMetaData => {
                done()
              }).catch(albumsMetaErr => done(albumsMetaErr));

          }).catch(err => done(err));

      })
      .catch(err => done(err));

    });

    it('should respond with json data', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Remove album.
          chai.request(server)
            .delete(routes.removeAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .then(removeRes => {

              try {

                expect(removeRes).to.be.json;
                done();

              } catch (err) {
                done(err);
              }

            }).catch(removeErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code after removing an album', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Remove album.
          chai.request(server)
            .delete(routes.removeAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .then(removeRes => {

              try {

                expect(removeRes).to.have.status(200);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(removeErr => done(removeErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 404 status code when the album id does not exist', done => {

      const { email, password } = Object.assign({}, USERS[2], { password: PASS });

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Remove album.
          chai.request(server)
            .delete(routes.removeAlbum(404))
            .set('Authorization', `Bearer ${ token }`)
            .then(removeRes => {

              try {

                expect(removeRes).to.have.status(404);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(removeErr => done(removeErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a albumIdDoesNotExist property when the album id does not exist', done => {

      const { email, password } = Object.assign({}, USERS[2], { password: PASS });

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Remove album.
          chai.request(server)
            .delete(routes.removeAlbum(404))
            .set('Authorization', `Bearer ${ token }`)
            .then(removeRes => {

              try {

                expect(removeRes.body).to.haveOwnProperty('albumIdDoesNotExist');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(removeErr => done(removeErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 401 status code when the user is not the owner or an admin', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[3];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Remove album.
          chai.request(server)
            .delete(routes.removeAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .then(removeRes => {

              try {

                expect(removeRes).to.have.status(401);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(removeErr => done(removeErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a unauthorized property when the user is not the owner or an admin', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[3];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Remove album.
          chai.request(server)
            .delete(routes.removeAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .then(removeRes => {

              try {

                expect(removeRes.body).to.haveOwnProperty('unauthorized');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(removeErr => done(removeErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code when the user is an admin', done => {

      const { email, password } = Object.assign({}, USERS[2], { password: PASS });
      const { album_id } = ALBUMS[0];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Remove album.
          chai.request(server)
            .delete(routes.removeAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .then(removeRes => {

              try {

                expect(removeRes).to.have.status(200);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(removeErr => done(removeErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code when the user is the owner and an admin', done => {

      const { email, password } = Object.assign({}, USERS[2], { password: PASS });
      const { album_id } = ALBUMS[2];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Remove album.
          chai.request(server)
            .delete(routes.removeAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .then(removeRes => {

              try {

                expect(removeRes).to.have.status(200);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(removeErr => done(removeErr));

        }).catch(loginErr => done(loginErr));

    });

  });

  describe(`${ routes.editAlbum() }`, () => {

    beforeEach('clear data in users and albums tables', done => {
      db.select()
        .from('users')
        .del()
        .then(() => {
        
          db.select()
            .from('albums')
            .del()
            .then(()   => done())
            .catch(err => done(err));
        
        })
        .catch(err => done(err));

      
    });

    beforeEach('add data to users and albums tables', done => {

      db('users').insert(USERS)
      .then(userData => {
        
        db('albums').insert(ALBUMS)
          .then(albumData => {

            db('albumsMeta').insert(ALBUMS_META)
              .then(albumsMetaData => {
                done()
              }).catch(albumsMetaErr => done(albumsMetaErr));

          }).catch(err => done(err));

      })
      .catch(err => done(err));

    });

    it('should respond with json data', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        title: 'A new title',
        description: 'A new description',
        access: 'private'
      };

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes).to.be.json;
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code after editing an album', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        title: 'A new title',
        description: 'A new description',
        access: 'private'
      };

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes).to.have.status(200);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 404 status code when the album id does not exist', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        title: 'A new title',
        description: 'A new description',
        access: 'private'
      };

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(404))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes).to.have.status(404);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a albumIdDoesNotExist property when the album id does not exist', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        title: 'A new title',
        description: 'A new description',
        access: 'private'
      };

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(404))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes.body).to.haveOwnProperty('albumIdDoesNotExist');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when no props are sent', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send({})
            .then(updateRes => {

              try {

                expect(updateRes).to.have.status(400);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a noPropsFound property when no props are sent', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send({})
            .then(updateRes => {

              try {

                expect(updateRes.body).to.haveOwnProperty('noPropsFound');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when invalid props are sent', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        title: 'valid',
        description: 'valid',
        invalidProp: 'not valid'
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes).to.have.status(400);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an invalidProps property when invalid props are sent', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        title: 'valid',
        description: 'valid',
        invalidProp: 'not valid'
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes.body).to.haveOwnProperty('invalidProps');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when too many props are sent', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        title: 'valid',
        description: 'valid',
        invalidProp: 'not valid'
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes).to.have.status(400);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an tooManyProps property when too many props are sent', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        title: 'valid',
        description: 'valid',
        access: 'private',
        invalidProp: 'not valid'
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes.body).to.haveOwnProperty('tooManyProps');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when the title already exists', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[1];
      const album = {
        title: 'A title'
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes).to.have.status(400);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an albumTitleExists property when the title already exists', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[1];
      const album = {
        title: 'A title'
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes.body).to.haveOwnProperty('albumTitleExists');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when the title is invalid', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        title: 1234
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes).to.have.status(400);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an invalidAlbumTitle property when the title is invalid', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        title: 1234
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes.body).to.haveOwnProperty('invalidAlbumTitle');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when the description is invalid', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        description: 1234
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes).to.have.status(400);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an invalidAlbumDescription property when the description is invalid', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        description: 1234
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes.body).to.haveOwnProperty('invalidAlbumDescription');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when the access type is invalid', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        access: 'not valid'
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes).to.have.status(400);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an invalidAlbumAccess property when the access type is invalid', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        access: 'not valid'
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes.body).to.haveOwnProperty('invalidAlbumAccess');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 401 status code when the user is not the owner or admin', done => {

      const { email, password } = Object.assign({}, USERS[1], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        title: 'New Title'
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes).to.have.status(401);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an unauthorized property when the access type is invalid', done => {

      const { email, password } = Object.assign({}, USERS[1], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        title: 'New Title'
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes.body).to.haveOwnProperty('unauthorized');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code when the user is an admin', done => {

      const { email, password } = Object.assign({}, USERS[2], { password: PASS });
      const { album_id } = ALBUMS[0];
      const album = {
        title: 'New Title'
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes).to.have.status(200);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code when the user is the owner and an admin', done => {

      const { email, password } = Object.assign({}, USERS[2], { password: PASS });
      const { album_id } = ALBUMS[3];
      const album = {
        title: 'New Title'
      }

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Edit album.
          chai.request(server)
            .put(routes.editAlbum(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(updateRes => {

              try {

                expect(updateRes).to.have.status(200);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(updateErr => done(updateErr));

        }).catch(loginErr => done(loginErr));

    });

  });

  describe(`${ routes.createAlbum() }`, () => {

    beforeEach('clear data in users and albums tables', done => {
      db.select()
        .from('users')
        .del()
        .then(() => {
        
          db.select()
            .from('albums')
            .del()
            .then(()   => done())
            .catch(err => done(err));
        
        })
        .catch(err => done(err));

      
    });

    beforeEach('add data to users and albums tables', done => {

      db('users').insert(USERS)
        .then(userData => {
          
          db('albums').insert(ALBUMS)
            .then(albumData => done())
            .catch(err => done(err));
        })
        .catch(err => done(err));

    });

    it('should respond with json data', done => {

      const { user_id, email, password, } = Object.assign({}, USERS[1], { password: PASS });

      const album = {
        title: ALBUMS[0].title,
        description: ALBUMS[0].description,
        access: ALBUMS[0].access,
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(albumRes => {

              try {

                expect(albumRes).to.be.json;
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 201 status code after creating and album', done => {

      const { user_id, email, password, } = Object.assign({}, USERS[1], { password: PASS });

      const album = {
        title: ALBUMS[0].title,
        description: ALBUMS[0].description,
        access: ALBUMS[0].access,
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(albumRes => {

              try {

                expect(albumRes).to.have.status(201);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when no props are sent with the request body', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send({})
            .then(createRes => {

              try {
                expect(createRes).to.have.status(400);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a noPropsFound property when no props are sent with the request body', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send({})
            .then(createRes => {

              try {
                expect(createRes.body).to.haveOwnProperty('noPropsFound');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when invalid props are sent with the request body', done => {

      const { user_id, email, password } = Object.assign({}, USERS[1], { password: PASS });
      const album = {
        title: 'A title',
        description: 'A description',
        invalidProp: 'not valid',
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes).to.have.status(400);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an invalidProps property when invalid props are sent with the request body', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const album = {
        title: 'A title',
        description: 'A description',
        invalidProp: 'not valid',
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes.body).to.haveOwnProperty('invalidProps');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 404 status code when the user does not exist', done => {

      const { user_id, email, password } = Object.assign({}, USERS[2], { password: PASS });
      const album = {
        title: 'A title',
        description: 'A description',
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(404))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes).to.have.status(404);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a userIdDoesNotExist property when when the user does not exist', done => {

      const { user_id, email, password } = Object.assign({}, USERS[2], { password: PASS });
      const album = {
        title: 'A title',
        description: 'A description',
      };
      
      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(404))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes.body).to.haveOwnProperty('userIdDoesNotExist');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when the user already owns an album with a title', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const album = {
        title: 'A title',
        description: 'A description',
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes).to.have.status(400);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an albumTitleExists property when the user already owns an album with a title', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const album = {
        title: 'A title',
        description: 'A description',
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes.body).to.haveOwnProperty('albumTitleExists');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when the album title is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[1], { password: PASS });
      const album = {
        title: 12345,
        description: 'A description',
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes).to.have.status(400);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an invalidAlbumTitle property when the album title is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const album = {
        title: 12345,
        description: 'A description',
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes.body).to.haveOwnProperty('invalidAlbumTitle');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when the album description is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[1], { password: PASS });
      const album = {
        title: 'A Title',
        description: 12345,
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes).to.have.status(400);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an invalidAlbumDescription property when the album description is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[1], { password: PASS });
      const album = {
        title: 'A title',
        description: 12345,
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes.body).to.haveOwnProperty('invalidAlbumDescription');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when the access type is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[1], { password: PASS });
      const album = {
        title: 'A Title',
        description: 'A description',
        access: 'not valid'
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes).to.have.status(400);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an invalidAlbumAccess property when the access type is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[1], { password: PASS });
      const album = {
        title: 'A title',
        description: 'A description',
        access: 'not valid'
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes.body).to.haveOwnProperty('invalidAlbumAccess');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when the album title is missing', done => {

      const { user_id, email, password } = Object.assign({}, USERS[1], { password: PASS });
      const album = {
        description: 'A description',
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes).to.have.status(400);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a missingAlbumTitle property when the album title is missing', done => {

      const { user_id, email, password } = Object.assign({}, USERS[1], { password: PASS });
      const album = {
        description: 'A description',
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes.body).to.haveOwnProperty('missingAlbumTitle');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 401 status code when the user is not the owner or admin', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const album = {
        title: 'A title',
        description: 'A description',
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(1))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes).to.have.status(401);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an unauthorized property the user is not the owner or admin', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const album = {
        title: 'A title',
        description: 'A description',
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(1))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes.body).to.haveOwnProperty('unauthorized');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 201 status code when the user is admin', done => {

      const { user_id, email, password } = Object.assign({}, USERS[2], { password: PASS });
      const album = {
        title: 'A title',
        description: 'A description',
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(1))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes).to.have.status(201);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 201 status code when the user is admin and owner', done => {

      const { user_id, email, password } = Object.assign({}, USERS[2], { password: PASS });
      const album = {
        title: 'A different title',
        description: 'A different description',
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password, })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create album
          chai.request(server)
            .post(routes.createAlbum(2))
            .set('Authorization', `Bearer ${ token }`)
            .send(album)
            .then(createRes => {

              try {
                expect(createRes).to.have.status(201);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

  });

  describe(`${ routes.getUsersAlbums() }`, () => {

    beforeEach('clear data in users', done => {
      db.select()
        .from('users')
        .del()
        .then(() => {
        
          // db.select()
          //   .from('albums')
          //   .del()
          //   .then(()   => done())
          //   .catch(err => done(err));
          done();
        
        })
        .catch(err => done(err));

      
    });

    beforeEach('add data to users, albums, and albumsMeta tables', done => {

      db('users').insert(USERS)
        .then(userData => {
          
          db('albums').insert(ALBUMS)
            .then(albumData => {

              db('albumsMeta').insert(ALBUMS_META)
                .then(albumsMetaData => {
                  done()
                }).catch(albumsMetaErr => done(albumsMetaErr));

            }).catch(err => done(err));

        })
        .catch(err => done(err));

    });

    it('should return with json data', done => {

      const { user_id, email, password, } = Object.assign({}, USERS[0], { password: PASS });

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Get users albums.
          chai.request(server)
            .get(routes.getUsersAlbums(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send()
            .then(albumRes => {

              try {

                expect(albumRes).to.be.json;
                done();

              } catch (err) {
                done(err);
              }

            }).catch(albumErr => done(albumErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code after getting a users albums', done => {

      const { user_id, email, password, } = Object.assign({}, USERS[0], { password: PASS });

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Get users albums.
          chai.request(server)
            .get(routes.getUsersAlbums(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send()
            .then(albumsRes => {

              try {

                expect(albumsRes).to.have.status(200);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(albumsErr => done(albumsErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should only return public albums when a user is not the owner or admin', done => {

      const { user_id, email, password, } = Object.assign({}, USERS[1], { password: PASS });

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Get users albums.
          chai.request(server)
            .get(routes.getUsersAlbums(0))
            .set('Authorization', `Bearer ${ token }`)
            .send()
            .then(albumsRes => {

              try {

                albumsRes.body.forEach(album => {
                  expect(album.access).to.equal('public');
                });
                done();

              } catch (err) {
                done(err);
              }

            }).catch(albumsErr => done(albumsErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should only return public albums when a user is not logged in', done => {

      chai.request(server)
        .get(routes.getUsersAlbums(0))
        .then(albumsRes => {

          try {

            albumsRes.body.forEach(album => {
              expect(album.access).to.equal('public');
            });
            done();

          } catch (err) {
            done(err);
          }

        }).catch(albumsErr => done(albumsErr));

    });

    it('should respond with a 404 status code when a user does not exist', done => {

      chai.request(server)
        .get(routes.getUsersAlbums(404))
        .then(albumsRes => {

          try {
            
            expect(albumsRes).to.have.status(404);
            done();

          }catch (err) {
            done(err);
          }

        }).catch(albumsErr => done(albumsErr));

    });

    it('should respond with userIdDoesNotExist when a user does not exist', done => {

      chai.request(server)
        .get(routes.getUsersAlbums(404))
        .then(albumsRes => {

          try {
            
            expect(albumsRes.body).to.haveOwnProperty('userIdDoesNotExist');
            done();

          }catch (err) {
            done(err);
          }

        }).catch(albumsErr => done(albumsErr));

    });

  });

  describe(`${ routes.addAlbumMetaData() }`, () => {

    beforeEach('clear data in users', done => {
      db.select()
        .from('users')
        .del()
        .then(() => {
        
          // db.select()
          //   .from('albums')
          //   .del()
          //   .then(()   => done())
          //   .catch(err => done(err));
          done();
        
        })
        .catch(err => done(err));

      
    });

    beforeEach('add data to users, albums, and albumsMeta tables', done => {

      db('users').insert(USERS)
        .then(userData => {
          
          db('albums').insert(ALBUMS)
            .then(albumData => {

              db('albumsMeta').insert(ALBUMS_META)
                .then(albumsMetaData => {
                  done()
                }).catch(albumsMetaErr => done(albumsMetaErr));

            }).catch(err => done(err));

        })
        .catch(err => done(err));

    });

    it('should respond with json data', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const metaArr = [{
        name: 'Test Name',
        value: 'Test Value',
      }, {
        name: 'Test Name Two',
        value: 'Test Value Two',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes).to.be.json;
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 201 status code after adding meta data to an album', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const metaArr = [{
        name: 'Test Name',
        value: 'Test Value',
      }, {
        name: 'Test Name Two',
        value: 'Test Value Two',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes).to.have.status(201);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when no props are sent', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const metaArr = [];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes).to.have.status(400);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a noPropsFound property when no props are sent', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const metaArr = [];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes.body).to.haveOwnProperty('noPropsFound');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when request body contains invalid props', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const metaArr = [{
        invalidProp: 'not valid',
        value: 'Test Value',
      }, {
        name: 'Test Name',
        value: 'Test Value',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes).to.have.status(400);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a invalidProps property when request body contains invalid props', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const metaArr = [{
        invalidProp: 'not valid',
        value: 'Test Value',
      }, {
        name: 'Test Name',
        value: 'Test Value',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes.body).to.haveOwnProperty('invalidProps');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 404 status code when the album id does not exist', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = 404;
      const metaArr = [{
        name: 'Test Name',
        value: 'Test Value',
      }, {
        name: 'Test Name',
        value: 'Test Value',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes).to.have.status(404);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a albumIdDoesNotExist property when the album id does not exist', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = 404;
      const metaArr = [{
        name: 'Test Name',
        value: 'Test Value',
      }, {
        name: 'Test Name',
        value: 'Test Value',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes.body).to.haveOwnProperty('albumIdDoesNotExist');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when a meta name already exists', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const metaArr = [{
        name: 'Location',
        value: 'Mexico',
      }, {
        name: 'Test Name',
        value: 'Test Value',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes).to.have.status(400);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a metaFieldExists property when a meta name already exists', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const metaArr = [{
        name: 'Location',
        value: 'Test Value',
      }, {
        name: 'Test Name',
        value: 'Test Value',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes.body).to.haveOwnProperty('metaFieldExists');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when a meta name is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const metaArr = [{
        name: 1234,
        value: 'Mexico',
      }, {
        name: 'Test Name',
        value: 'Test Value',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes).to.have.status(400);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a invalidMetaName property when a meta name is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const metaArr = [{
        name: 1234,
        value: 'Test Value',
      }, {
        name: 'Test Name',
        value: 'Test Value',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes.body).to.haveOwnProperty('invalidMetaName');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when a meta value is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const metaArr = [{
        name: 'Test Name',
        value: 1234,
      }, {
        name: 'Test Name',
        value: 'Test Value',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes).to.have.status(400);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a invalidMetaValue property when a meta value is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];
      const metaArr = [{
        name: 'Test Name',
        value: 1234,
      }, {
        name: 'Test Name',
        value: 'Test Value',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes.body).to.haveOwnProperty('invalidMetaValue');
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 401 status code when a user is not an owner or an admin', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[2];
      const metaArr = [{
        name: 'Test Name',
        value: 'Test Value',
      }, {
        name: 'Test Name Two',
        value: 'Test Value Two',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes).to.have.status(401);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 201 status code when the user is an admin', done => {

      const { user_id, email, password } = Object.assign({}, USERS[2], { password: PASS });
      const { album_id } = ALBUMS[0];
      const metaArr = [{
        name: 'Test Name',
        value: 'Test Value',
      }, {
        name: 'Test Name Two',
        value: 'Test Value Two',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes).to.have.status(201);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 201 status code when the user is the owner and an admin', done => {

      const { user_id, email, password } = Object.assign({}, USERS[2], { password: PASS });
      const { album_id } = ALBUMS[2];
      const metaArr = [{
        name: 'Test Name',
        value: 'Test Value',
      }, {
        name: 'Test Name Two',
        value: 'Test Value Two',
      }];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Add meta data.
          chai.request(server)
            .post(routes.addAlbumMetaData(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(metaArr)
            .then(addRes => {

              try {
                expect(addRes).to.have.status(201);
                done();
              } catch (err) {
                done(err);
              }

            }).catch(addErr => done(addErr));

        }).catch(loginErr => done(loginErr));

    });

  });

});