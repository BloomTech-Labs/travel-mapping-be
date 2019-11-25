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
}];

const MEDIA_TO_ALBUMS = [{
  media_id: 0,
  album_id: 0,
}, {
  media_id: 1,
  album_id: 3,
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
}];

describe('Media endpoint tests', () => {

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

  });

});