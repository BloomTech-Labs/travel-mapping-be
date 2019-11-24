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

const TEST_DATA = {
  user_id: 0,
  display_name: 'jdoe25',
  email: 'john.doe@mail.com',
  password: 'jgt5^kY3%%@^&*',
};

const VALID_USERS = [{
  display_name: 'tuser00',
  email: 'test.user00@mail.com',
  password: 'hkTQ%*03'
}, {
  display_name: 'tuser01',
  email: 'test.user01@mail.com',
  password: 'hkTQ%*03'
}, {
  display_name: 'tuser02',
  email: 'test.user02@mail.com',
  password: 'hkTQ%*03'
}];

const INVALID_USERS = [{
  invalidProps: '',
}];

describe('User endpoint tests', () => {

  describe(`${ routes.getUsers() }`, () => {

    beforeEach('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    beforeEach('add data to users table', done => {
      db('users').insert(VALID_USERS)
        .then(data => done())
        .catch(err => done(err));
    });

    it('should respond with json data', done => {

      chai.request(server)
        .get(routes.getUsers())
        .then(res => {

          try {
            expect(res).to.be.json;
            done();
          } catch (err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 200 status code', done => {

      chai.request(server)
        .get(routes.getUsers())
        .then(res => {

          try {
            expect(res).to.have.status(200);
            done();
          } catch (err) {
            done(err);
          }

      }).catch(err => done(err));

    });

  });

  describe(`${ routes.getUserById() }`, () => {

    beforeEach('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    beforeEach('add data to users table', done => {
      db('users').insert(TEST_DATA)
        .then(data => done())
        .catch(err => done(err));
    });

    it('should respond with json data', done => {
      
      chai.request(server)
        .get(routes.getUserById(0))
        .then(res => {

          expect(res).to.be.json;
          done();

        }).catch(err => done(err));

    });

    it('should respond with a 200 status code', done => {
      
      chai.request(server)
        .get(routes.getUserById(0))
        .then(res => {

          expect(res).to.have.status(200);
          done();

        }).catch(err => done(err));

    });

    it('should respond with a 404 status code when the user id does not exist', done => {

      db.select()
      .from('users')
      .del()
      .then(()   => {
        
        chai.request(server)
          .get(routes.getUserById(0))
          .then(res => {
            expect(res).to.have.status(404);
            done();

        }).catch(err => done(err));

      })
      .catch(err => done(err));

    });

    it(`should respond with userIdDoesNotExist property when the user id does not exist`, done => {

      db.select()
        .from('users')
        .del()
        .then(()   => {
          
          chai.request(server)
            .get(routes.getUserById(0))
            .then(res => {
              expect(res.body).to.haveOwnProperty('userIdDoesNotExist');
              done();

          }).catch(err => done(err));


        })
        .catch(err => done(err));

      

    });

    it('should contain a user_id property', done => {

      chai.request(server)
        .get(routes.getUserById(0))
        .then(res => {

          expect(res.body).to.haveOwnProperty('user_id');
          done();

      }).catch(err => done(err));

    });

    it('should contain an email property', done => {

      chai.request(server)
        .get(routes.getUserById(0))
        .then(res => {

          expect(res.body).to.haveOwnProperty('email');
          done();

      }).catch(err => done(err));

    });

  });

  describe(`${ routes.registerUser('email') }`, () => {

    const PASS = 'hkTQ%*03';

    const validUsers = [{
      display_name: 'tuser00',
      email:        'test.user00@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      display_name: 'tuser01',
      email:        'test.user01@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      display_name: 'tuser02',
      email:        'test.user02@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      display_name: 'tuser03',
      email:        'test.user03@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }];

    const invalidUsers = [{

    }];

    beforeEach('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    it('should respond with json data', done => {

      const user = { ...validUsers[0], password: PASS };

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          expect(res).to.be.json;
          done();

        }).catch(err => done(err));

    });

    it('should respond with a 201 status code', done => {

      const user = { ...validUsers[0], password: PASS };

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {
          expect(res).to.have.status(201);
          done();
        }).catch(err => done(err));

    });

    it('should respond with a user_id property', done => {

      const user = { ...validUsers[0], password: PASS };

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          expect(res.body).to.haveOwnProperty('user_id');
          done();

        }).catch(err => done(err));

    });

    it('should respond with a token property', done => {

      const user = { ...validUsers[0], password: PASS };

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try  {

            expect(res.body).to.haveOwnProperty('token');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 400 status code when the display name already exists', done => {

      db('users').insert(validUsers)
        .then(data => {
          
          const user = { ...validUsers[0], password: PASS };

          chai.request(server)
            .post(routes.registerUser('email'))
            .send(user)
            .then(res => {
    
              try {

                expect(res).to.have.status(400);
                done();

              } catch(err) {
                done(err);
              }
    
            }).catch(err => done(err));

        })
        .catch(err => done(err));

    });

    it('should respond with a displayNameExists property when the display name already exists', done => {

      db('users').insert(validUsers)
        .then(data => {
          
          const user = { ...validUsers[0], password: PASS };

          chai.request(server)
            .post(routes.registerUser('email'))
            .send(user)
            .then(res => {
    
              try {

                expect(res.body).to.haveOwnProperty('displayNameExists');
                done();

              } catch(err) {
                done(err);
              }
    
            }).catch(err => done(err));

        })
        .catch(err => done(err));

    });

    it('should respond with a 400 status code when the email already exists', done => {

      db('users').insert(validUsers)
        .then(data => {
          
          const user = { ...validUsers[0], display_name: 'validDisplayName', password: PASS };

          chai.request(server)
            .post(routes.registerUser('email'))
            .send(user)
            .then(res => {
    
              try {

                expect(res).to.have.status(400);
                done();

              } catch(err) {
                done(err);
              }
    
            }).catch(err => done(err));

        })
        .catch(err => done(err));

    });

    it('should respond with an emailExists property when the email already exists', done => {

      db('users').insert(validUsers)
        .then(data => {
          
          const user = { ...validUsers[0], display_name: 'validDisplayName', password: PASS };

          chai.request(server)
            .post(routes.registerUser('email'))
            .send(user)
            .then(res => {
    
              try {

                expect(res.body).to.haveOwnProperty('emailExists');
                done();

              } catch(err) {
                done(err);
              }
    
            }).catch(err => done(err));

        })
        .catch(err => done(err));

    });

    it('should respond with a 400 status code when the display name is not valid', done => {
          
      const user = { ...validUsers[0], display_name: 'not valid', password: PASS };

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try {

            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with an invalidDisplayName property when the display name is not valid', done => {

      const user = { ...validUsers[0], display_name: 'not valid', password: PASS };

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('invalidDisplayName');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 400 status code when the email is not valid', done => {
          
      const user = { ...validUsers[0], email: 'not valid', password: PASS };

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try {

            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with an invalidEmail property when the email is not valid', done => {

      const user = { ...validUsers[0], email: 'not valid', password: PASS };

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('invalidEmail');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 400 status code when the password is not valid', done => {
          
      const user = { ...validUsers[0], password: 'not valid' };

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try {

            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with an invalidPassword property when the password is not valid', done => {

      const user = { ...validUsers[0], password: 'not valid' };

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('invalidPassword');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 400 status code when the request contains too many props', done => {
          
      const user = { ...validUsers[0], password: PASS, invalidProp: 'not valid' };

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try {

            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with an tooManyProps property when the request contains too many props', done => {

      const user = { ...validUsers[0], password: PASS, invalidProp: 'not valid' };

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('tooManyProps');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 400 status code when the request is missing the display_name property', done => {
      
      const user = { ...validUsers[0], password: PASS };
      delete user.display_name;

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try {

            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a missingDisplayName property when the request is missing the display_name property', done => {

      const user = { ...validUsers[0], password: PASS };
      delete user.display_name;

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('missingDisplayName');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 400 status code when the request is missing the email property', done => {
      
      const user = { ...validUsers[0], password: PASS };
      delete user.email;

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try {

            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a missingEmail property when the request is missing the email property', done => {

      const user = { ...validUsers[0], password: PASS };
      delete user.email;

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('missingEmail');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 400 status code when the request is missing the password property', done => {
      
      const user = { ...validUsers[0] };
      delete user.password;

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try {

            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a missingPassword property when the request is missing the password property', done => {

      const user = { ...validUsers[0] };
      delete user.password;

      chai.request(server)
        .post(routes.registerUser('email'))
        .send(user)
        .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('missingPassword');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

  });

  describe(`${ routes.loginUser('email') }`, () => {

    const PASS = 'hkTQ%*03';

    const validUsers = [{
      display_name: 'tuser00',
      email:        'test.user00@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      display_name: 'tuser01',
      email:        'test.user01@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      display_name: 'tuser02',
      email:        'test.user02@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      display_name: 'tuser03',
      email:        'test.user03@mail.com',
    }];

    const invalidUsers = [{

    }];

    beforeEach('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    beforeEach('add data to users table', done => {
      db('users').insert(validUsers)
        .then(data => done())
        .catch(err => done(err));
    });

    it('should return json data', done => {

      const { email } = validUsers[0];

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, PASS, })
        .then(res => {

          try {
            expect(res).to.be.json;
            done();
          } catch (err) {
            done(err);
          }

        }).catch(err => done(err));
    });

    it(`should respond with a 200 status code`, done => {

      const { email, } = validUsers[1];

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password: PASS, })
        .then(res => {

          try {
            expect(res).to.have.status(200);
            done();
          } catch (err) {
            done(err);
          }

        }).catch(err => done(err));


    });

    it('should contain a user_id property', done => {

      const { email, } = validUsers[1];

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password: PASS, })
        .then(res => {

          try {
            expect(res.body).to.haveOwnProperty('user_id');
            done();
          } catch (err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should contain a token property', done => {

      const { email, } = validUsers[1];

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password: PASS, })
        .then(res => {

          try {
            expect(res.body).to.haveOwnProperty('token');
            done();
          } catch (err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 400 status code when the password is incorrect', done => {

      const { email, } = validUsers[1];

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password: '' })
        .then(res => {

          try {
            
            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a incorrectPassword property when the password is incorrect', done => {

      const { email, } = validUsers[1];

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password: '' })
        .then(res => {

          try {
            
            expect(res.body).to.haveOwnProperty('incorrectPassword');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 404 status code when an email does not exist', done => {

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email: 'invalid@email.com', password: PASS })
        .then(res => {

          try {
            
            expect(res).to.have.status(404);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with emailDoesNotExist property when an email does not exist', done => {

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email: 'invalid@email.com', password: PASS })
        .then(res => {

          try {
            
            expect(res.body).to.haveOwnProperty('emailDoesNotExist');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 400 status code when request has too many props', done => {

      const { email, } = validUsers[1];

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password: PASS, invalidProp: 'not valid' })
        .then(res => {

          try {
            
            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with tooManyProps property request contains too many props', done => {

      const { email, } = validUsers[1];

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password: PASS, invalidProp: 'not valid' })
        .then(res => {

          try {
            
            expect(res.body).to.haveOwnProperty('tooManyProps');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 400 status code when request is missing email property', done => {

      const { email, } = validUsers[1];

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ password: PASS })
        .then(res => {

          try {
            
            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with missingEmail property when request is missing email property', done => {

      const { email, } = validUsers[1];

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ password: PASS })
        .then(res => {

          try {
            
            expect(res.body).to.haveOwnProperty('missingEmail');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 400 status code when request is missing password property', done => {

      const { email, } = validUsers[1];

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email })
        .then(res => {

          try {
            
            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with missingPassword property when request is missing password property', done => {

      const { email, } = validUsers[1];

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email })
        .then(res => {

          try {
            
            expect(res.body).to.haveOwnProperty('missingPassword');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 400 status code when a password is not associated with the email', done => {

      const { email, } = validUsers[3];

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password: PASS })
        .then(res => {

          try {
            
            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with passwordNotAssociated property when a password is not associated with the email', done => {

      const { email } = validUsers[3];

      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password: PASS })
        .then(res => {

          try {
            
            expect(res.body).to.haveOwnProperty('passwordNotAssociated');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

    });

  });

  describe(`${ routes.editUser() }`, () => {

    const PASS = 'hkTQ%*03';

    const validUsers = [{
      user_id:      0,
      display_name: 'tuser00',
      email:        'test.user00@mail.com',
      is_admin:     false,
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      user_id:      1,
      display_name: 'tuser01',
      email:        'test.user01@mail.com',
      is_admin:     false,
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      user_id:      2,
      display_name: 'tuser02',
      email:        'test.user02@mail.com',
      is_admin:     true,
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      user_id:      3,
      display_name: 'tuser03',
      is_admin:     false,
      email:        'test.user03@mail.com',
    }];

    const invalidUsers = [{

    }];

    beforeEach('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    beforeEach('add data to users table', done => {
      db('users').insert(validUsers)
        .then(data => done())
        .catch(err => done(err));
    });

    it('should respond with json data', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const editUser = {
        display_name: '00tuser',
        email: '00test.user@mail.com',
        password: 'TQhk03%*'
      };

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send(editUser)
          .then(res => {

          try {

            expect(res).to.have.json;
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code', done => {
      
      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const editUser = {
        display_name: '00tuser',
        email: '00test.user@mail.com',
        password: 'TQhk03%*'
      };

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send(editUser)
          .then(res => {

          try {

            expect(res).to.have.status(200);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when request body contains no props', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send({})
          .then(res => {

          try {

            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should contain a noPropsFound property when request body contains no props', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send({})
          .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('noPropsFound');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when request body contains invalid props', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send({ invalidProp: 'not valid' })
          .then(res => {

          try {

            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should contain an invalidProps property when request body contains invalid props', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send({ invalidProp: 'not valid' })
          .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('invalidProps');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 404 status code when the user id does not exist', done => {

      const { email, password, } = Object.assign({}, validUsers[2], { password: PASS });
      const editUser = {
        display_name: '00tuser',
        email: '00test.user@mail.com',
        password: 'TQhk03%*'
      };

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(`/users/404/edit`)
          .set('Authorization', `Bearer ${ jwt }`)
          .send(editUser)
          .then(res => {

          try {

            expect(res).to.have.status(404);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should contain an userIdDoesNotExist property when request body contains invalid props', done => {

      const { email, password, } = Object.assign({}, validUsers[2], { password: PASS });
      const editUser = {
        display_name: '00tuser',
        email: '00test.user@mail.com',
        password: 'TQhk03%*'
      };

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(`/users/404/edit`)
          .set('Authorization', `Bearer ${ jwt }`)
          .send(editUser)
          .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('userIdDoesNotExist');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when the display name already exists', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const editUser = {
        display_name: 'tuser00',
        email: '00test.user@mail.com',
        password: 'TQhk03%*'
      };

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send(editUser)
          .then(res => {

          try {

            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should contain a displayNameExists property when the display name already exists', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const editUser = {
        display_name: 'tuser00',
        email: '00test.user@mail.com',
        password: 'TQhk03%*'
      };

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send(editUser)
          .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('displayNameExists');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when the display name already exists', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const editUser = {
        display_name: '00tuser',
        email: 'test.user00@mail.com',
        password: 'TQhk03%*'
      };

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send(editUser)
          .then(res => {

          try {

            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should contain an emailExists property when the display name already exists', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const editUser = {
        display_name: '00tuser',
        email: 'test.user00@mail.com',
        password: 'TQhk03%*'
      };

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send(editUser)
          .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('emailExists');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when the display name already exists', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const editUser = {
        display_name: 'not valid',
        email: '00test.user@mail.com',
        password: 'TQhk03%*'
      };

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send(editUser)
          .then(res => {

          try {

            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should contain an invalidDisplayName property when the display name already exists', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const editUser = {
        display_name: 'not valid',
        email: '00test.user@mail.com',
        password: 'TQhk03%*'
      };

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send(editUser)
          .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('invalidDisplayName');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });
    
    it('should respond with a 400 status code when the display name already exists', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const editUser = {
        display_name: '00tuser',
        email: 'not valid',
        password: 'TQhk03%*'
      };

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send(editUser)
          .then(res => {

          try {

            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should contain an invalidEmail property when the display name already exists', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const editUser = {
        display_name: '00tuser',
        email: 'not valid',
        password: 'TQhk03%*'
      };

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send(editUser)
          .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('invalidEmail');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 400 status code when the display name already exists', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const editUser = {
        display_name: '00tuser',
        email: '00test.user@mail.com',
        password: 'not valid'
      };

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send(editUser)
          .then(res => {

          try {

            expect(res).to.have.status(400);
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should contain an invalidPassword property when the display name already exists', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const editUser = {
        display_name: '00tuser',
        email: '00test.user@mail.com',
        password: 'not valid'
      };

       // Login
       chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

         // Get JWT.
         const jwt = loginRes.body.token;

        // Edit user
        chai.request(server)
          .put(routes.editUser(user_id))
          .set('Authorization', `Bearer ${ jwt }`)
          .send(editUser)
          .then(res => {

          try {

            expect(res.body).to.haveOwnProperty('invalidPassword');
            done();

          } catch(err) {
            done(err);
          }

        }).catch(err => done(err));

       }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 401 status code when the user is not authorized', done => {

      const { email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const { user_id, } = validUsers[1];
      const editUser = {
        display_name: '00tuser',
        email: '00test.user@mail.com',
        password: 'TQhk03%*'
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          // Get JWT.
          const jwt = loginRes.body.token;

          // Remove user
          chai.request(server)
            .put(routes.editUser(user_id))
            .set('Authorization', `Bearer ${ jwt }`)
            .send(editUser)
            .then(editRes => {

              try {
                expect(editRes).to.have.status(401);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(editErr => done(editErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an unauthorized property when the user is not authorized', done => {

      const { email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const { user_id, } = validUsers[1];
      const editUser = {
        display_name: '00tuser',
        email: '00test.user@mail.com',
        password: 'TQhk03%*'
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          // Get JWT.
          const jwt = loginRes.body.token;

          // Remove user
          chai.request(server)
            .put(routes.editUser(user_id))
            .set('Authorization', `Bearer ${ jwt }`)
            .send(editUser)
            .then(editRes => {

              try {
                expect(editRes).to.haveOwnProperty('unauthorized');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(editErr => done(editErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code when user is admin but not the owner', done => {

      const { email, password, } = Object.assign({}, validUsers[2], { password: PASS });
      const { user_id, } = validUsers[0];
      const editUser = {
        display_name: '00tuser',
        email: '00test.user@mail.com',
        password: 'TQhk03%*'
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          // Get JWT.
          const jwt = loginRes.body.token;

          // Remove user
          chai.request(server)
            .put(routes.editUser(user_id))
            .set('Authorization', `Bearer ${ jwt }`)
            .send(editUser)
            .then(editRes => {

              try {
                expect(editRes).to.have.status(200);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(editErr => done(editErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code when user is admin and the owner', done => {

      const { email, password, } = Object.assign({}, validUsers[2], { password: PASS });
      const { user_id, } = validUsers[2];
      const editUser = {
        display_name: '00tuser',
        email: '00test.user@mail.com',
        password: 'TQhk03%*'
      };

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          // Get JWT.
          const jwt = loginRes.body.token;

          // Remove user
          chai.request(server)
            .put(routes.editUser(user_id))
            .set('Authorization', `Bearer ${ jwt }`)
            .send(editUser)
            .then(editRes => {

              try {
                expect(editRes).to.have.status(200);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(editErr => done(editErr));

        }).catch(loginErr => done(loginErr));

    });

  });

  describe(`${ routes.removeUser() }`, () => {

    const PASS = 'hkTQ%*03';

    const validUsers = [{
      user_id:      0,
      display_name: 'tuser00',
      email:        'test.user00@mail.com',
      is_admin:     false,
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      user_id:      1,
      display_name: 'tuser01',
      email:        'test.user01@mail.com',
      is_admin:     false,
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      user_id:      2,
      display_name: 'tuser02',
      email:        'test.user02@mail.com',
      is_admin:     true,
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      user_id:      3,
      display_name: 'tuser03',
      is_admin:     false,
      email:        'test.user03@mail.com',
    }];

    const invalidUsers = [{

    }];

    beforeEach('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    beforeEach('add data to users table', done => {
      db('users').insert(validUsers)
        .then(data => done())
        .catch(err => done(err));
    });

    it('should respond with json data', done => {
      
      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          // Get JWT.
          const jwt = loginRes.body.token;

          // Remove user
          chai.request(server)
            .delete(routes.removeUser(user_id))
            .set('Authorization', `Bearer ${ jwt }`)
            .then(deleteRes => {

              try {

                expect(deleteRes).to.be.json;
                done();

              } catch (err) {
                done(err);
              }

            }).catch(deleteErr => done(deleteErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code after removing a user', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[0], { password: PASS });

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          // Get JWT.
          const jwt = loginRes.body.token;

          // Remove user
          chai.request(server)
            .delete(routes.removeUser(user_id))
            .set('Authorization', `Bearer ${ jwt }`)
            .then(deleteRes => {

              try {

                expect(deleteRes).to.have.status(200);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(deleteErr => done(deleteErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code when user is admin but not the owner', done => {

      const { email, password, } = Object.assign({}, validUsers[2], { password: PASS });
      const { user_id, } = validUsers[0];

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          // Get JWT.
          const jwt = loginRes.body.token;

          // Remove user
          chai.request(server)
            .delete(routes.removeUser(user_id))
            .set('Authorization', `Bearer ${ jwt }`)
            .then(deleteRes => {

              try {

                expect(deleteRes).to.have.status(200);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(deleteErr => done(deleteErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 200 status code when user is admin and the owner', done => {

      const { user_id, email, password, } = Object.assign({}, validUsers[2], { password: PASS });

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          // Get JWT.
          const jwt = loginRes.body.token;

          // Remove user
          chai.request(server)
            .delete(routes.removeUser(user_id))
            .set('Authorization', `Bearer ${ jwt }`)
            .then(deleteRes => {

              try {

                expect(deleteRes).to.have.status(200);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(deleteErr => done(deleteErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 401 status code when user is not authorized', done => {

      const { email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const { user_id, } = validUsers[1];

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          // Get JWT.
          const jwt = loginRes.body.token;

          // Remove user
          chai.request(server)
            .delete(routes.removeUser(user_id))
            .set('Authorization', `Bearer ${ jwt }`)
            .then(deleteRes => {

              try {

                expect(deleteRes).to.have.status(401);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(deleteErr => done(deleteErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with an unauthorized property when user is not authorized', done => {

      const { email, password, } = Object.assign({}, validUsers[0], { password: PASS });
      const { user_id, } = validUsers[1];

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          // Get JWT.
          const jwt = loginRes.body.token;

          // Remove user
          chai.request(server)
            .delete(routes.removeUser(user_id))
            .set('Authorization', `Bearer ${ jwt }`)
            .then(deleteRes => {

              try {

                expect(deleteRes.body).to.haveOwnProperty('unauthorized');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(deleteErr => done(deleteErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a 404 status code when a user does not exist', done => {

      const { email, password, } = Object.assign({}, validUsers[2], { password: PASS });

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          // Get JWT.
          const jwt = loginRes.body.token;

          // Remove user
          chai.request(server)
            .delete(`/users/404/remove`)
            .set('Authorization', `Bearer ${ jwt }`)
            .then(deleteRes => {

              try {

                expect(deleteRes).to.have.status(404);
                done();

              } catch (err) {
                done(err);
              }

            }).catch(deleteErr => done(deleteErr));

        }).catch(loginErr => done(loginErr));

    });

    it('should respond with a userIdDoesNotExist property when a user does not exist', done => {

      const { email, password, } = Object.assign({}, validUsers[2], { password: PASS });

      // Login
      chai.request(server)
        .post(routes.loginUser('email'))
        .send({ email, password })
        .then(loginRes => {

          // Get JWT.
          const jwt = loginRes.body.token;

          // Remove user
          chai.request(server)
            .delete(`/users/404/remove`)
            .set('Authorization', `Bearer ${ jwt }`)
            .then(deleteRes => {

              try {

                expect(deleteRes.body).to.haveOwnProperty('userIdDoesNotExist');
                done();

              } catch (err) {
                done(err);
              }

            }).catch(deleteErr => done(deleteErr));

        }).catch(loginErr => done(loginErr));

    });

  });

});