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

describe('Testing album models', () => {

  describe('removeAlbumById model', () => {

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

    it('should pass null to a callback function after deleting an album', done => {

      const { album_id } = ALBUMS[0];

      models.album.removeAlbumById(album_id, (removeErr, removeArr) => {

        try {

          expect(removeErr).to.equal(null);
          done();
   
        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the album id does not exist', done => {

      models.album.removeAlbumById(404, (removeErr, removeArr) => {

        try {

          expect(removeErr).to.be.an('error');
          done();
   
        } catch (err) {
          done(err);
        }

      });

    });

  });

  describe('updateUserById model', () => {

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

    it('should pass null to a callback function after updating an album', done => {

      const { album_id } = ALBUMS[0];
      albumData = {
        title: 'New Title',
        description: 'New Description',
        access: 'private'
      };

      models.album.updateAlbumById(album_id, albumData, (updateErr, albumObj) => {

        try {

          expect(updateErr).to.equal(null);
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the album does not exist', done => {

      const album_id = 404;
      albumData = {
        title: 'New Title',
        description: 'New Description',
        access: 'private'
      };

      models.album.updateAlbumById(album_id, albumData, (updateErr, albumObj) => {

        try {

          expect(updateErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the title is not valid', done => {

      const { album_id } = ALBUMS[0];
      albumData = {
        title: 1234,
        description: 'New Description',
        access: 'private'
      };

      models.album.updateAlbumById(album_id, albumData, (updateErr, albumObj) => {

        try {

          expect(updateErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the description is not valid', done => {

      const { album_id } = ALBUMS[0];
      albumData = {
        title: 'New Title',
        description: 1234,
        access: 'private'
      };

      models.album.updateAlbumById(album_id, albumData, (updateErr, albumObj) => {

        try {

          expect(updateErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the access type is not valid', done => {

      const { album_id } = ALBUMS[0];
      albumData = {
        title: 'New Title',
        description: 'New Description',
        access: 'not valid'
      };

      models.album.updateAlbumById(album_id, albumData, (updateErr, albumObj) => {

        try {

          expect(updateErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the title already exists', done => {

      const { album_id } = ALBUMS[1];
      albumData = {
        title: 'A Title',
        description: 'New Description',
        access: 'private'
      };

      models.album.updateAlbumById(album_id, albumData, (updateErr, albumObj) => {

        try {

          expect(updateErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

  });

  describe('createAlbum model', () => {

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

    it('should pass null to a callback function after creating an album', done => {

      const albumObj = {
        user_id: 1,
        title: 'A title',
        description: 'A short description about an album',
        access: 'public',
      };

      models.album.createAlbum(albumObj, (createErr, albumIdArr) => {

        try {

          expect(createErr).to.equal(null);
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the user id does not exist', done => {

      const albumObj = {
        user_id: 404,
        title: 'A title',
        description: 'A short description about an album',
        access: 'public',
      };

      models.album.createAlbum(albumObj, (createErr, albumIdArr) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the user already has an album with the title', done => {

      const albumObj = {
        user_id: 0,
        title: 'A title',
        description: 'A short description about an album',
        access: 'public',
      };
      
      models.album.createAlbum(albumObj, (createErr, albumIdArr) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the title is not valid', done => {

      const albumObj = {
        user_id: 1,
        title: 12345,
        description: 'A short description about an album',
        access: 'public',
      };
      
      models.album.createAlbum(albumObj, (createErr, albumIdArr) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the description is not valid', done => {

      const albumObj = {
        user_id: 1,
        title: 'A Title',
        description: 12345,
        access: 'public',
      };
      
      models.album.createAlbum(albumObj, (createErr, albumIdArr) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the access type is not valid', done => {

      const albumObj = {
        user_id: 1,
        title: 'A Title',
        description: 'A short description about an album',
        access: 'not valid',
      };
      
      models.album.createAlbum(albumObj, (createErr, albumIdArr) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

  });

  describe('retrieveUsersAlbums model', () => {

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

    it('should pass null to a callback function after retrieving the albums', done => {
      
      const { user_id } = USERS[0];

      models.album.retrieveUsersAlbums(user_id, (retrieveErr, albumsArr) => {

        if (retrieveErr) done(retrieveErr);
        else {

          try {

            expect(retrieveErr).to.equal(null);
            done();

          } catch (err) {
            done(err);
          }

        }

      });

    });

    it('should pass an array to a callback function after retrieving the albums', done => {

      const { user_id } = USERS[0];

      models.album.retrieveUsersAlbums(user_id, (retrieveErr, albumsArr) => {

        if (retrieveErr) done(retrieveErr);
        else {

          try {

            expect(albumsArr).to.be.an('array');
            done();

          } catch (err) {
            done(err);
          }

        }

      });

    });

    it('should pass an error to a callback function when the user id does not exist', done => {
      
      const user_id = 404;

      models.album.retrieveUsersAlbums(user_id, (retrieveErr, albumsArr) => {

        try {

          expect(retrieveErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        } 

      });

    });

  });

  describe('retrieveAlbumById model', () => {

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

    it('should pass null to a callback function after retrieving an album', done => {

      const { album_id } = ALBUMS[1];

      models.album.retrieveAlbumById(album_id, (retrieveErr, albumObj) => {

        try {
          expect(retrieveErr).to.equal(null);
          done();
        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when the album id does not exist', done => {

      const album_id = 404;

      models.album.retrieveAlbumById(album_id, (retrieveErr, albumArr) => {

        try {
          expect(retrieveErr).to.be.an('error');
          done();
        } catch (err) {
          done(err);
        }

      });

    });

  });

  describe('createAlbumMeta model', () => {

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

    it('should pass null to a callback function after creating a meta data field', done => {

      const { album_id } = ALBUMS[0];
      const metaDataArr = [{
        name: 'test name',
        value: 'test value',
      }, {
        name: 'test name two',
        value: 'test value two',
      }];

      models.album.createAlbumMeta(album_id, metaDataArr, (createErr, metaDataObj) => {

        if (createErr) done(createErr);
        else {

          try {

            expect(createErr).to.equal(null);
            done();

          } catch (err) {
            done(err);
          }

        }

      });

    });

    it('should pass an error to a callback function when the album id does not exist', done => {

      const album_id = 404;
      const albumMetaArr = ALBUMS_META;

      models.album.createAlbumMeta(album_id, albumMetaArr, (createErr, metaObj) => {

        try {

          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function if the meta field name already exists on the album', done => {

      const { album_id } = ALBUMS[0];
      const metaDataArr = [{
        name: 'Location',
        value: 'Mexico',
      }, {
        name: 'Place',
        value: 'Over There',
      }];

      models.album.createAlbumMeta(album_id, metaDataArr, (createErr, metaDataObj) => {

        try {
          
          expect(createErr).to.be.an('error');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function if the meta name is too short', done => {

      const { album_id } = ALBUMS[0];
      const metaDataArr = [{
        name: 't',
        value: 'test value',
      }, {
        name: 'test name two',
        value: 'test value two',
      }];

      models.album.createAlbumMeta(album_id, metaDataArr, (createErr, metaDataObj) => {

        try {
          expect(createErr).to.be.an('error');
          done();
        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function if the meta name is too long', done => {

      const { album_id } = ALBUMS[0];
      const metaDataArr = [{
        name: 'invalid name',
        value: 'test value',
      }, {
        name: 'test name two',
        value: 'test value two',
      }];

      for (let i = 0; i < 20; i++) metaDataArr[0].name += 'invlid name';

      models.album.createAlbumMeta(album_id, metaDataArr, (createErr, metaDataObj) => {

        try {
          expect(createErr).to.be.an('error');
          done();
        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function if the meta description is too short', done => {

      const { album_id } = ALBUMS[0];
      const metaDataArr = [{
        name: 'test name',
        value: 't',
      }, {
        name: 'test name two',
        value: 'test value two',
      }];

      models.album.createAlbumMeta(album_id, metaDataArr, (createErr, metaDataObj) => {

        try {
          expect(createErr).to.be.an('error');
          done();
        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function if the meta description is too long', done => {

      const { album_id } = ALBUMS[0];
      const metaDataArr = [{
        name: 'test name',
        value: 'invalid value',
      }, {
        name: 'test name two',
        value: 'test value two',
      }];

      for (let i = 0; i < 30; i++) metaDataArr[0].value += 'invlid value';

      models.album.createAlbumMeta(album_id, metaDataArr, (createErr, metaDataObj) => {

        try {
          expect(createErr).to.be.an('error');
          done();
        } catch (err) {
          done(err);
        }

      });

    });

  });

});