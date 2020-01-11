const db          = require('../../data/dbConfig');
const models      = require('../../data/models/models');
const errors      = require('../../modules/modules').errors;
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

describe('Testing media models', () => {

  describe('retrieveUsersMedia', () => {

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

    it('should pass null to a callback function', done => {

      const { user_id } = USERS[0];

      models.media.retrieveUsersMedia(user_id, (retrieveErr, mediaArr) => {

        try {

          expect(retrieveErr).to.equal(null);
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when a user does not exist', done => {

      models.media.retrieveUsersMedia(404, (retrieveErr, mediaArr) => {
        
        try {

          expect(retrieveErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

  });

  // #region
  // /*

  describe('retrieveAlbumsMedia model', () => {

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

    it('should pass null to a callback function', done => {

      const { album_id } = ALBUMS[0];

      models.media.retrieveAlbumsMedia(album_id, (retrieveErr, mediaArr) => {

        try {

          expect(retrieveErr).to.equal(null);
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the album ID does not exist', done => {

      models.media.retrieveAlbumsMedia(404, (retrieveErr, mediaArr) => {

        try {

          expect(retrieveErr).to.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

  });


  describe('createManyMediaMeta model', () => {

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

    it('should pass null to a callback function after creating the mediaMeta data', done => {

      const mediaIdArr   = [0, 1];
      const mediaMetaArr = [

        // Media 0
        [{
          name: 'Test Name One',
          value: 'Test Value One'
        }, {
          name: 'Test Name Two',
          value: 'Test Value Two'
        }], 

        // media 1
        [{
          name: 'Test Name One',
          value: 'Test Value One'
        }, {
          name: 'Test Name Two',
          value: 'Test Value Two'
        }]
      ];

      models.media.createManyMediaMeta(mediaIdArr, mediaMetaArr, (createErr, mediaMetaData) => {

        try {

          expect(createErr).to.equal(null);
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when media does not exist', done => {

      const mediaIdArr   = [0, 404];
      const mediaMetaArr = [

        // Media 0
        [{
          name: 'Test Name One',
          value: 'Test Value One'
        }, {
          name: 'Test Name Two',
          value: 'Test Value Two'
        }], 

        // media 1
        [{
          name: 'Test Name One',
          value: 'Test Value One'
        }, {
          name: 'Test Name Two',
          value: 'Test Value Two'
        }]
      ];

      models.media.createManyMediaMeta(mediaIdArr, mediaMetaArr, (createErr, mediaMetaData) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the meta name is not valid', done => {

      const mediaIdArr   = [0, 404];
      const mediaMetaArr = [

        // Media 0
        [{
          name: 1234,
          value: 'Test Value One'
        }, {
          name: 'Test Name Two',
          value: 'Test Value Two'
        }], 

        // media 1
        [{
          name: 'Test Name One',
          value: 'Test Value One'
        }, {
          name: 'Test Name Two',
          value: 'Test Value Two'
        }]
      ];

      models.media.createManyMediaMeta(mediaIdArr, mediaMetaArr, (createErr, mediaMetaData) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the meta value is not valid', done => {

      const mediaIdArr   = [0, 404];
      const mediaMetaArr = [

        // Media 0
        [{
          name: 'Test Name One',
          value: 'Test Value One'
        }, {
          name: 'Test Name Two',
          value: 'Test Value Two'
        }], 

        // media 1
        [{
          name: 'Test Name One',
          value: 'Test Value One'
        }, {
          name: 'Test Name Two',
          value: 1234
        }]
      ];

      models.media.createManyMediaMeta(mediaIdArr, mediaMetaArr, (createErr, mediaMetaData) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

  });

  describe('createManyKeywordsToMedia model', () => {

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

    it('should pass null to a callback function after creating the data', done => {

      const mediaIdArr    = [0, 1];
      const keywordsIdArr = [[3, 4, 5], [3, 4, 5]];

      models.media.createManyKeywordsToMedia(mediaIdArr, keywordsIdArr, (createErr, createdNumArr) => {

        try {

          expect(createErr).to.equal(null);
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when media does not exist', done => {

      const mediaIdArr    = [0, 404];
      const keywordsIdArr = [[3, 4, 5], [3, 4, 5]];

      models.media.createManyKeywordsToMedia(mediaIdArr, keywordsIdArr, (createErr, createdNumArr) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when keyword does not exist', done => {

      const mediaIdArr    = [0, 1];
      const keywordsIdArr = [[3, 404, 5], [3, 4, 5]];

      models.media.createManyKeywordsToMedia(mediaIdArr, keywordsIdArr, (createErr, createdNumArr) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

  });

  describe('createManyKeywords model', () => {

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

    it('should pass null to a callback function after creating the keywords', done => {

      const keywords = [
        ['keyword-one', 'Test-Two', 'Test-Three'],
        ['Test-Three', 'Test-Four', 'Test-Five']
      ];

      models.media.createManyKeywords(keywords, (createErr, createdKeywordArr) => {

        try {

          expect(createErr).to.equal(null);
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when a keyword is not valid', done => {

      const keywords = [
        [1234, 'Test-Two', 'Test-Three'],
        ['Test-Three', 'Test-Four', 'Test-Five']
      ];

      models.media.createManyKeywords(keywords, (createErr, createdKeywordArr) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when a keyword is not valid', done => {

      const keywords = [
        ['keyword-one', 'Test-Two', 'Test-Three'],
        ['Test-Three', 'Test-Four', 1234]
      ];

      models.media.createManyKeywords(keywords, (createErr, createdKeywordArr) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

  });

  describe('createMediaToAlbums model', () => {

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

    it('should pass null to a callback function after creating the data', done => {

      const media  = [0, 1];
      const albums = [0, 1, 2];

      models.media.createMediaToAlbums(albums, media, (createErr, mediaToAlbumsArr) => {

        try {

          expect(createErr).to.equal(null);
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass null to a callback function after creating the data', done => {

      const media  = [0, 1];
      const albums = [];

      models.media.createMediaToAlbums(albums, media, (createErr, mediaToAlbumsArr) => {

        try {

          expect(createErr).to.equal(null);
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when an album ID does not exist', done => {

      const media  = [0, 1];
      const albums = [0, 1, 2, 404];

      models.media.createMediaToAlbums(albums, media, (createErr, mediaToAlbumsArr) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when a media ID does not exist', done => {

      const media  = [0, 1, 404];
      const albums = [0, 1, 2];

      models.media.createMediaToAlbums(albums, media, (createErr, mediaToAlbumsArr) => {

        try {

          expect(createErr).to.be.an('error');
          done();


        } catch (err) {
          done(err);
        }

      });

    });

  });

  describe('createMedia model', () => {

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
    
    it('should pass null to a callback function after creating media', done => {

      const { user_id } = USERS[0];
      const media = [{
        title: "A Photo Title",
        caption: "A short caption for a photo"
      }, {
        title: "Another Photo Title",
        caption: "Another short caption for a photo"
      }];

      models.media.createMedia(user_id, media, (createErr, mediaArr) => {

        try {

          expect(createErr).to.equal(null);
          done();

        } catch (err) {
          done(err);
        }
      });

    });

    it('should pass an error to a callback function when the user id does not exist', done => {

      const media = [{
        title: "A Photo Title",
        caption: "A short caption for a photo"
      }, {
        title: "Another Photo Title",
        caption: "Another short caption for a photo"
      }];

      models.media.createMedia(404, media, (createErr, mediaArr) => {

        try {
          expect(createErr).to.be.an('error');
          done();
        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the title is not valid', done => {

      const { user_id } = USERS[0];
      const media = [{
        title: 1234,
        caption: "A short caption for a photo"
      }, {
        title: "Another Photo Title",
        caption: "Another short caption for a photo"
      }];

      models.media.createMedia(user_id, media, (createErr, mediaArr) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }
      });

    });

    it('should pass an error to a callback function when the title already exists', done => {

      const { user_id } = USERS[0];
      const media = [{
        title: 'Test Photo Title',
        caption: "A short caption for a photo"
      }, {
        title: "Another Photo Title",
        caption: "Another short caption for a photo"
      }];

      models.media.createMedia(user_id, media, (createErr, mediaArr) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }
      });

    });

    it('should pass an error to a callback function when the caption is not valid', done => {

      const { user_id } = USERS[0];
      const media = [{
        title: 'A Photo Title',
        caption: 1234
      }, {
        title: "Another Photo Title",
        caption: "Another short caption for a photo"
      }];

      models.media.createMedia(user_id, media, (createErr, mediaArr) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }
      });

    });

  });
  // */
 // #endregion

});