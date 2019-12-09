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
  user_id: 0,
  title: 'Another title',
  description: 'Another short description about an album',
  access: 'private',
}, {
  album_id: 3,
  user_id: 2,
  title: 'A title',
  description: 'A short description about an album',
  access: 'public',
}, {
  album_id: 4,
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

const MEDIA = [{
  media_id: 0,
  user_id: 0,
  title: 'Test Photo Title',
  caption: 'A Photo Caption'
}, {
  media_id: 1,
  user_id: 2,
  title: 'Another Test Photo Title',
  caption: 'Another Photo Caption'
}, {
  media_id: 2,
  user_id: 0,
  title: 'Media Without Keywords',
  caption: 'This media has no keywords'
}, {
  media_id: 3,
  user_id: 0,
  title: 'Media Without Meta Data',
  caption: 'This media has no meta data'
}, {
  media_id: 4,
  user_id: 0,
  title: 'Media Without Meta Data or Keywords',
  caption: 'This media has no keywords or meta data'
}];

const MEDIA_TO_ALBUMS = [{
  media_id: 0,
  album_id: 0,
}, {
  media_id: 1,
  album_id: 3,
}, {
  media_id: 1,
  album_id: 0,
}, {
  media_id: 2,
  album_id: 0,
}, {
  media_id: 3,
  album_id: 0,
}, {
  media_id: 4,
  album_id: 0,
}];

const KEYWORDS = [{
  keyword_id: 0,
  name: 'keyword-one',
}, {
  keyword_id: 1,
  name: 'keyword-two',
}, {
  keyword_id: 2,
  name: 'keyword-three',
}, {
  keyword_id: 3,
  name: 'keyword-four',
}, {
  keyword_id: 4,
  name: 'keyword-five',
}, {
  keyword_id: 5,
  name: 'keyword-six',
}];

const KEYWORDS_TO_MEDIA = [{
  keyword_id: 0,
  media_id: 0  
}, {
  keyword_id: 1,
  media_id: 0
}, {
  keyword_id: 1,
  media_id: 1
}, {
  keyword_id: 2,
  media_id: 1
}, {
  keyword_id: 0,
  media_id: 3
}, {
  keyword_id: 1,
  media_id: 3
}];

const MEDIA_META = [{
  mediaMeta_id: 0,
  media_id: 0,
  name: 'Location',
  value: 'Mexico',
}, {
  mediaMeta_id: 1,
  media_id: 0,
  name: 'People',
  value: 'Friends',
}, {
  mediaMeta_id: 2,
  media_id: 1,
  name: 'Location',
  value: 'Mexico',
}, {
  mediaMeta_id: 3,
  media_id: 2,
  name: 'People',
  value: 'Friends',
}, {
  mediaMeta_id: 4,
  media_id: 2,
  name: 'Location',
  value: 'Mexico',
}];

describe('Media endpoint tests', () => {




  // #region
  // /*
  describe(`${ routes.getUsersMedia() }`, () => {

    beforeEach('clear data in users, media, keywords', done => {
      db.select()
        .from('users')
        .del()
        .then(() => {
        
          // db.select()
          //   .from('albums')
          //   .del()
          //   .then(()   => {

              db.select()
                .from('media')
                .del()
                .then(() => {

                  db.select()
                    .from('keywords')
                    .del()
                    .then(()   => done())
                    .catch(err => done(err));

                }).catch(err => done(err));

            // }).catch(err => done(err));
        
        }).catch(err => done(err));

      
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

        }).catch(err => done(err));

    });

    beforeEach('create media, keywords, and mediaMeta data', done => {

      db('media').insert(MEDIA)
        .then(mediaData => {

          db('mediaAlbums').insert(MEDIA_TO_ALBUMS)
            .then(mediaAlbumsData => {

              db('keywords').insert(KEYWORDS)
                .then(keywordsData => {

                  db('mediaKeywords').insert(KEYWORDS_TO_MEDIA)
                    .then(keywordsMediaData => {

                      db('mediaMeta').insert(MEDIA_META)
                        .then(mediaMetaData => {

                          done();

                        }).catch(mediaMetaErr => done(mediaMetaErr));

                    }).catch(keywordsMediaErr => done(keywordsMediaErr));

                }).catch(keywordsErr => done(keywordsErr));

            }).catch(mediaAlbumsErr => done(mediaAlbumsErr));

        }).catch(mediaErr => done(mediaErr))

    });

    it('should respond with json data', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         const { token } = loginRes.body;

         // Get media.
          chai.request(server)
            .get(routes.getUsersMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .then(albumsMediaRes => {

              try {

                expect(albumsMediaRes).to.be.json;
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         const { token } = loginRes.body;

         // Get media.
          chai.request(server)
            .get(routes.getUsersMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .then(usersMediaRes => {

              try {

                // console.log(usersMediaRes.body);

                expect(usersMediaRes).to.have.status(200);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 401 status code when the user is not the owner or an admin', done => {

      const { email, password } = Object.assign({}, USERS[1], { password: PASS });

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         const { token } = loginRes.body;

         // Get media.
          chai.request(server)
            .get(routes.getUsersMedia(0))
            .set('Authorization', `Bearer ${ token }`)
            .then(usersMediaRes => {

              try {

                expect(usersMediaRes).to.have.status(401);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an unauthorized property when the user is not the owner or an admin', done => {

      const { email, password } = Object.assign({}, USERS[1], { password: PASS });

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         const { token } = loginRes.body;

         // Get media.
          chai.request(server)
            .get(routes.getUsersMedia(0))
            .set('Authorization', `Bearer ${ token }`)
            .then(usersMediaRes => {

              try {

                expect(usersMediaRes.body).to.haveOwnProperty('unauthorized');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

  });

  describe(`${ routes.getAlbumsMedia() }`, () => {

    beforeEach('clear data in users, media, keywords', done => {
      db.select()
        .from('users')
        .del()
        .then(() => {
        
          // db.select()
          //   .from('albums')
          //   .del()
          //   .then(()   => {

              db.select()
                .from('media')
                .del()
                .then(() => {

                  db.select()
                    .from('keywords')
                    .del()
                    .then(()   => done())
                    .catch(err => done(err));

                }).catch(err => done(err));

            // }).catch(err => done(err));
        
        }).catch(err => done(err));

      
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

        }).catch(err => done(err));

    });

    beforeEach('create media, keywords, and mediaMeta data', done => {

      db('media').insert(MEDIA)
        .then(mediaData => {

          db('mediaAlbums').insert(MEDIA_TO_ALBUMS)
            .then(mediaAlbumsData => {

              db('keywords').insert(KEYWORDS)
                .then(keywordsData => {

                  db('mediaKeywords').insert(KEYWORDS_TO_MEDIA)
                    .then(keywordsMediaData => {

                      db('mediaMeta').insert(MEDIA_META)
                        .then(mediaMetaData => {

                          done();

                        }).catch(mediaMetaErr => done(mediaMetaErr));

                    }).catch(keywordsMediaErr => done(keywordsMediaErr));

                }).catch(keywordsErr => done(keywordsErr));

            }).catch(mediaAlbumsErr => done(mediaAlbumsErr));

        }).catch(mediaErr => done(mediaErr))

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

         // Get media.
          chai.request(server)
            .get(routes.getAlbumsMedia(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .then(albumsMediaRes => {

              try {

                expect(albumsMediaRes).to.be.json;
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code', done => {

      const { email, password } = Object.assign({}, USERS[0], { password: PASS });
      const { album_id } = ALBUMS[0];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         const { token } = loginRes.body;

         // Get media.
          chai.request(server)
            .get(routes.getAlbumsMedia(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .then(albumsMediaRes => {

              try {

                expect(albumsMediaRes).to.have.status(200);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 401 status code when the user is not the owner or an admin', done => {

      const { email, password } = Object.assign({}, USERS[1], { password: PASS });
      const { album_id } = ALBUMS[0];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         const { token } = loginRes.body;

         // Get media.
          chai.request(server)
            .get(routes.getAlbumsMedia(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .then(albumsMediaRes => {

              try {

                expect(albumsMediaRes).to.have.status(401);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an unauthorized property when the user is not the owner or an admin', done => {

      const { email, password } = Object.assign({}, USERS[1], { password: PASS });
      const { album_id } = ALBUMS[0];

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         const { token } = loginRes.body;

         // Get media.
          chai.request(server)
            .get(routes.getAlbumsMedia(album_id))
            .set('Authorization', `Bearer ${ token }`)
            .then(albumsMediaRes => {

              try {

                expect(albumsMediaRes.body).to.haveOwnProperty('unauthorized');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));

    });

  });

  describe(`${ routes.addAlbumsMedia() }`, () => {

    beforeEach('clear data in users, media, keywords', done => {
      db.select()
        .from('users')
        .del()
        .then(() => {
        
          // db.select()
          //   .from('albums')
          //   .del()
          //   .then(()   => {

              db.select()
                .from('media')
                .del()
                .then(() => {

                  db.select()
                    .from('keywords')
                    .del()
                    .then(()   => done())
                    .catch(err => done(err));

                }).catch(err => done(err));

            // }).catch(err => done(err));
        
        }).catch(err => done(err));

      
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

      }).catch(err => done(err));

    });

    beforeEach('create media, keywords, and mediaMeta data', done => {

    db('media').insert(MEDIA)
      .then(mediaData => {

        db('mediaAlbums').insert(MEDIA_TO_ALBUMS)
          .then(mediaAlbumsData => {

            db('keywords').insert(KEYWORDS)
              .then(keywordsData => {

                db('mediaKeywords').insert(KEYWORDS_TO_MEDIA)
                  .then(keywordsMediaData => {

                    db('mediaMeta').insert(MEDIA_META)
                      .then(mediaMetaData => {

                        done();

                      }).catch(mediaMetaErr => done(mediaMetaErr));

                  }).catch(keywordsMediaErr => done(keywordsMediaErr));

              }).catch(keywordsErr => done(keywordsErr));

          }).catch(mediaAlbumsErr => done(mediaAlbumsErr));

      }).catch(mediaErr => done(mediaErr))

    });

    it('should respond with json data', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes).to.be.json;
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 201 status code', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with a 201 status code when no album IDs are given', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [],
        "media": [{
           "title": "A Photo Title",
           "caption": "A short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with a 400 status code when the request does not contain an albums property', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        // "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with a missingAlbums property when the request does not contain an albums property', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        // "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes.body).to.haveOwnProperty('missingAlbums');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 400 status code when the request does not contain a media property', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3]
      };

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with a missingMedia property when the request does not contain a media property', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3]
      };

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes.body).to.haveOwnProperty('missingMedia');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 404 status code when an album does not exist', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3, 404],
        "media": [{
           "title": "A Photo Title",
           "caption": "A short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an albumIdDoesNotExist property when an album does not exist', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3, 404],
        "media": [{
           "title": "A Photo Title",
           "caption": "A short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes.body).to.haveOwnProperty('albumIdDoesNotExist');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 400 status code when the request does not contain a media title', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
          //  "title": "A Photo Title",
           "caption": "A short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an missingMediaTitle property when an album does not exist', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
          //  "title": "A Photo Title",
           "caption": "A short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes.body).to.haveOwnProperty('missingMediaTitle');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 400 status code when the media title is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": 1234,
           "caption": "A short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an invalidMediaTitle property when the media title is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": 1234,
           "caption": "A short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes.body).to.haveOwnProperty('invalidMediaTitle');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 400 status code when the media caption is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": 1234,
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an invalidMediaCaption property when the media caption is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": 1234,
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes.body).to.haveOwnProperty('invalidMediaCaption');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 400 status code when a media keyword is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": [1234, "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an invalidKeywords property when a media keyword', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "not valid", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes.body).to.haveOwnProperty('invalidKeywords');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 400 status code when a media meta name is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": 1234,
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an invalidMetaName property when a media meta name is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes.body).to.haveOwnProperty('invalidMetaName');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 400 status code when a media meta name is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": 1234,
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an invalidMetaName property when a media meta name is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes.body).to.haveOwnProperty('invalidMetaName');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 400 status code when a media meta value is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": 1234
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an invalidMetaValue property when a media meta value is not valid', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": 1234
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes.body).to.haveOwnProperty('invalidMetaValue');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 400 status code when the request is missing the meta name property', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              // "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an missingMetaName property when the request is missing the meta name property', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              // "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes.body).to.haveOwnProperty('missingMetaName');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 400 status code when the request is missing the meta value property', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              // "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an missingMetaValue property when the request is missing the meta value property', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              // "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes.body).to.haveOwnProperty('missingMetaValue');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 400 status code when no props were sent with request', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an noPropsFound property when no props were sent with request', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with a 400 status code when invalid props were sent with request', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        invalidProp: 'not valid',
        invalidProp: 'not valid',
      };

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an invalidProps property when no props were sent with request', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        invalidProp: 'not valid',
        invalidProp: 'not valid',
      };

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with a 404 status code when the user ID does not exist', done => {

      const { user_id, email, password } = Object.assign({}, USERS[2], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(404))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an userIdDoesNotExist property when the user ID does not exist', done => {

      const { user_id, email, password } = Object.assign({}, USERS[2], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(404))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with a 400 status code when the media title already exists', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "Test Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an mediaTitleExists property when the media title already exists', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "Test Photo Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes.body).to.haveOwnProperty('mediaTitleExists');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 400 status code when the meta names are the same', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "People",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an repeatedMetaName property when the meta names are the same', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }, {
            "name": "People",
            "value": "Meta Value"
          }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "People",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(user_id))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes.body).to.haveOwnProperty('repeatedMetaName');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });
    
    it('should respond with a 401 status code when the user is not the owner or admin', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }, {
            "name": "People",
            "value": "Meta Value"
          }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(1))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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

    it('should respond with an unauthorized property when the user is not the owner or admin', done => {

      const { user_id, email, password } = Object.assign({}, USERS[0], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }, {
            "name": "People",
            "value": "Meta Value"
          }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(1))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
            .then(createRes => {

              try {

                expect(createRes).to.haveOwnProperty('unauthorized');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(createErr => done(createErr));

        }).catch(loginErr => done(loginErr));
  
    });

    it('should respond with a 201 status code when the user is not the owner but is admin', done => {

      const { user_id, email, password } = Object.assign({}, USERS[2], { password: PASS });
      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A photo caption",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }, {
            "name": "People",
            "value": "Meta Value"
          }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword-one", "keyword-two", "keyword-three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      // Login.
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          const { token } = loginRes.body;

          // Create media.
          chai.request(server)
            .post(routes.addAlbumsMedia(0))
            .set('Authorization', `Bearer ${ token }`)
            .send(media)
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
  // */
  // #endregion

});