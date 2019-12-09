const validate = require('../../modules/modules').validate;
const errors   = require('../../modules/modules').errors;
const expect   = require('chai').expect;
const bcrypt   = require('bcrypt');
const salt     = parseInt(process.env.PASS_SALT) || 10;

describe('Testing the validation module functions', () => {

  describe('editAlbumData function', () => {

    it('should return true when all valid props are passed', () => {

      const validProps = {
        title: 'valid',
        description: 'valid',
        access: 'private'
      };

      expect(validate.editAlbumProps(validProps)).to.equal(true);

    });

    it(`should return ${ errors.invalidProps } when invalid props are passed`, () => {
      
      const validProps = {
        title: 'valid',
        description: 'valid',
        invalidProp: 'not valid',
      };

      expect(validate.editAlbumProps(validProps)).to.equal(errors.invalidProps);

    });

    it(`should return ${ errors.noPropsFound } when no props are passed`, () => {

      expect(validate.editAlbumProps({})).to.equal(errors.noPropsFound);

    });

    it(`should return ${ errors.tooManyProps } when too many props are passed`, () => {

      const invalidProps = {
        title: 'valid',
        description: 'valid',
        access: 'private',
        invalidProp: 'not valid'
      };

      expect(validate.editAlbumProps(invalidProps)).to.equal(errors.tooManyProps);

    });

  });

  describe('registerUserData function', () => {

    const VALID_USERS = [{
      display_name: 'test',
      email: 'test@mail.com',
      password: 'gh43##5A!SG$u77*ke'
    }];

    const INVALID_USERS = [{
      display_name: 'test',
      email: 'test@mail.com',
      password: 'gh43##5A!SG$u77*ke',
      invalidProp: '',
    }, {
      email: '',
      password: '',
    }, {
      display_name: '',
      password: '',
    }, {
      display_name: '',
      email: '',
    }];

    it(`should return ${ errors.invalidRegisterType }`, () => {
      expect(validate.registerUserData(VALID_USERS[0], 'invalid type')).to.equal(errors.invalidRegisterType);
    });

    it(`should return ${ errors.tooManyProps }`, () => {
      expect(validate.registerUserData(INVALID_USERS[0], 'email')).to.equal(errors.tooManyProps);
    });

    it(`should return ${ errors.missingDisplayName }`, () => {
      expect(validate.registerUserData(INVALID_USERS[1], 'email')).to.equal(errors.missingDisplayName);
    });

    it(`should return ${ errors.missingEmail }`, () => {
      expect(validate.registerUserData(INVALID_USERS[2], 'email')).to.equal(errors.missingEmail);
    });

    it(`should return ${ errors.missingPassword }`, () => {
      expect(validate.registerUserData(INVALID_USERS[3], 'email')).to.equal(errors.missingPassword);
    });

    it('should return true', () => {
      expect(validate.registerUserData(VALID_USERS[0], 'email')).to.equal(true);
    });

  });

  describe('loginUserData function', () => {

    const VALID_USERS = [{
      email: 'test@mail.com',
      password: 'gh43##5A!SG$u77*ke'
    }];

    const INVALID_USERS = [{
      email: 'test@mail.com',
      password: 'gh43##5A!SG$u77*ke',
      invalidProp: '',
    }, {
      email: '',
      password: '',
    }, {
      display_name: '',
      password: '',
    }, {
      display_name: '',
      email: '',
    }];

    it(`should return ${ errors.invalidRegisterType }`, () => {
      expect(validate.loginUserData(VALID_USERS[0], 'invalid type')).to.equal(errors.invalidRegisterType);
    });

    it(`should return ${ errors.tooManyProps }`, () => {
      expect(validate.loginUserData(INVALID_USERS[0], 'email')).to.equal(errors.tooManyProps);
    });

    it(`should return ${ errors.missingEmail }`, () => {
      expect(validate.loginUserData(INVALID_USERS[2], 'email')).to.equal(errors.missingEmail);
    });

    it(`should return ${ errors.missingPassword }`, () => {
      expect(validate.loginUserData(INVALID_USERS[3], 'email')).to.equal(errors.missingPassword);
    });

    it('should return true', () => {
      expect(validate.loginUserData(VALID_USERS[0], 'email')).to.equal(true);
    });

  });

  describe('editUserData function', () => {

    const validData = [{
      display_name: 'tuser00',
      email: 'test.user@mail.com',
      password: 'gh43##5A!SG$u77*ke'
    }];

    it('should return true when valid data is passed', () => {
      expect(validate.editUserData(validData[0])).to.equal(true);
    });

    it(`should return ${ errors.tooManyProps } when too many props are passed`, () => {
      const userObj = validData[0];
      expect(validate.editUserData({ ...userObj, invalidProp: 'not valid' })).to.equal(errors.tooManyProps);
    });

    it(`should return ${ errors.noPropsFound } when no props are passed`, () => {
      expect(validate.editUserData({})).to.equal(errors.noPropsFound);
    });

    it(`should return ${ errors.invalidProps } when invalid props are sent`, () => {
      expect(validate.editUserData({ invalidProp: 'not valid' })).to.equal(errors.invalidProps);
    });

  });

  describe('password function', () => {

    const VALID_PASSWORDS   = ['hkTQ%*03', 'TQ%*03hk'];
    const INVALID_PASSWORDS = [
      'hkTQ%*0',                   // 0 Too short
      'hkTQ%*03hkTQ%*03hkTQ%*031', // 1 Too long
      '2%8@%*03',                  // 2 No letters
      'HKTQ%*03',                  // 3 No lower case letters
      'hktq%*03',                  // 4 No upper case letters
      'hkTQ%*G&',                  // 5 No numbers
      'hkTQg703',                  // 6 No symbols
      'hk TQ% *03',                // 7 Contains spaces
      '12PassWord!@',              // 8 Blacklisted
    ];
    
    it('should return true when a password is valid', () => {

      const password = VALID_PASSWORDS[0];

      expect(validate.password(password)).to.equal(true);

    });

    it('should return false when a password is not at least 8 characters', () => {

      const password = INVALID_PASSWORDS[0];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when a password is more than 24 characters', () => {

      const password = INVALID_PASSWORDS[1];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when a password does not contain letters', () => {

      const password = INVALID_PASSWORDS[2];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when a password does not contain lower case letters', () => {

      const password = INVALID_PASSWORDS[3];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when a password does not contain upper case letters', () => {

      const password = INVALID_PASSWORDS[4];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when a password does not contain numbers', () => {

      const password = INVALID_PASSWORDS[5];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when a password does not contain symbols', () => {

      const password = INVALID_PASSWORDS[6];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when a password contains spaces', () => {

      const password = INVALID_PASSWORDS[7];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when password matches a blacklisted password', () => {

      const password = INVALID_PASSWORDS[8];

      expect(validate.password(password, [password])).to.equal(false);

    });

    it('should return true when the password and hash match', () => {

      const password = VALID_PASSWORDS[0];
      const hash     = bcrypt.hashSync(password, salt);

      expect(validate.password(password, [], hash)).to.equal(true);

    });

    it('should return false when the password and hash don\'t match', () => {

      const passwordOne = VALID_PASSWORDS[0];
      const passwordTwo = VALID_PASSWORDS[1];
      const hash        = bcrypt.hashSync(passwordOne, salt);

      expect(validate.password(passwordTwo, [], hash)).to.equal(false);

    });

  });

  describe('createAlbumData function', () => {

    it('should return true when valid album data is passed', () => {

      const validData = {
        title: 'A title',
        description: 'A short album descrpition',
        access: 'public',
      };

      expect(validate.createAlbumData(validData)).to.equal(true);

    });

    it(`should return with ${ errors.noPropsFound } when no props are passed`, () => {

      expect(validate.createAlbumData({})).to.equal(errors.noPropsFound);

    });

    it(`should return with ${ errors.tooManyProps } when too many props are passed`, () => {

      const invalidProps = {
        user_id: 0,
        title: 'A title',
        description: 'A short album descrpition',
        access: 'public',
        invalidProp: 'not valid',
      };

      expect(validate.createAlbumData(invalidProps)).to.equal(errors.tooManyProps);

    });

    it(`should return with ${ errors.invalidProps } when an invalid prop is passed`, () => {

      const invalidProps = {
        title: 'A title',
        description: 'A short album descrpition',
        invalidProp: 'not valid',
      };

      expect(validate.createAlbumData(invalidProps)).to.equal(errors.invalidProps);

    });

    it(`should return with ${ errors.missingAlbumTitle } when the album title is not passed`, () => {

      const invalidProps = {
        description: 'A short album descrpition',
        access: 'public',
      };

      expect(validate.createAlbumData(invalidProps)).to.equal(errors.missingAlbumTitle);

    });

  });

  describe('albumDescription function', () => {

    it('should return true when the description is valid', () => {

      const validDescription = 'valid description';

      expect(validate.albumDescription(validDescription)).to.equal(true);

    });

    it('should return false when the description is more than 300 characters', () => {

      let invalidDescription;

      for(let i = 0; i !== 50; i++) invalidDescription += 'abc123';

      expect(validate.albumDescription(invalidDescription)).to.equal(false);

    });

    it('should return false when the description is not a string', () => {

      const invalidDescription = 12345;

      expect(validate.albumDescription(invalidDescription)).to.equal(false);

    });

  });

  describe('albumTitle function', () => {

    it('should return true when the title is valid', () => {

      const validTitle = 'valid title';

      expect(validate.albumTitle(validTitle)).to.equal(true);

    });

    it('should return false when the title is more than 120 characters', () => {

      let invalidTitle;

      for(let i = 0; i < 20; i++) invalidTitle += 'abc123';

      expect(validate.albumTitle(invalidTitle)).to.equal(false);

    });

    it('should return false when the title is not a string', () => {

      const invalidTitle = 12345;

      expect(validate.albumTitle(invalidTitle)).to.equal(false);

    });

  });

  describe('albumAccess function', () => {

    it('should return true when access is set to public', () => {

      const access = 'public';

      expect(validate.albumAccess(access)).to.equal(true);

    });

    it('should return true when access is set to private', () => {

      const access = 'private';

      expect(validate.albumAccess(access)).to.equal(true);

    });

    it('should return false when access is not public or private', () => {

      const access = 'not valid';

      expect(validate.albumAccess(access)).to.equal(false);

    });

    it('should return false when access is not a string', () => {

      const access = 12345;

      expect(validate.albumAccess(access)).to.equal(false);

    });

  });

  describe('metaName function', () => {

    it('should return true when meta name is valid', () => {

      const validName = 'Valid Name';

      expect(validate.metaName(validName)).to.equal(true);

    });

    it('should return false when the meta name is not a string', () => {

      const invalidName = 12345;

      expect(validate.metaName(invalidName)).to.equal(false);

    });

    it('should return false when the meta name is less than 2 characters', () => {

      const invalidName = 'a';

      expect(validate.metaName(invalidName)).to.equal(false);

    });

    it('should return false when the meta name is more than 120 characters', () => {

      let invalidName;
      for(let i = 0; i <= 20; i++) invalidName += 'invalid';

      expect(validate.metaName(invalidName)).to.equal(false);

    });

  });

  describe('metaValue function', () => {

    it('should return false when the description is not a string', () => {

      const invalidValue = 1234;

      expect(validate.metaValue(invalidValue)).to.equal(false);

    });

    it('should return false when the description is less than 2 characters', () => {

      const invalidValue = 'a';

      expect(validate.metaValue(invalidValue)).to.equal(false);

    });

    it('should return false when the description is longer than 300 characters', () => {

      let invalidValue;
      for (let i = 0; i < 20; i++) invalidValue += 'not a valid description';

      expect(validate.metaValue(invalidValue)).to.equal(false);

    });

    it('shoud return true when the description is valid', () => {

      const validValue = 'This is valid';

      expect(validate.metaValue(validValue)).to.equal(true);

    });

  });

  describe('createAlbumMetaData function', () => {

    it('should return true if the props are valid', () => {

      const validProps = [{
        name: 'Test name',
        value: 'Test value',
      }];

      expect(validate.addAlbumMetaData(validProps)).to.equal(true);

    });

    it(`should return ${ errors.tooManyProps } when too many props are passed`, () => {

      const invalidProps = [{
          name: 'test name',
          value: 'test value'
        }, {
          name: 'test name two',
          value: 'test value two',
          invalidProp: 'not valid',
      }];

        expect(validate.addAlbumMetaData(invalidProps)).to.equal(errors.tooManyProps);

    });

    it(`should return ${ errors.missingMetaName } when invalid props are passed`, () => {

      const invalidProps = [{
        value: 'test value'
      }, {
        name: 'test name',
        value: 'test value' 
      }];

      expect(validate.addAlbumMetaData(invalidProps)).to.equal(errors.missingMetaName);

    });

    it(`should return ${ errors.missingMetaValue } when invalid props are passed`, () => {

      const invalidProps = [{
        name: 'test value'
      }, {
        name: 'test name',
        value: 'test value' 
      }];

      expect(validate.addAlbumMetaData(invalidProps)).to.equal(errors.missingMetaValue);

    });

  });

  describe('mediaCaption function', () => {

    it('should return true when the caption is valid', () => {

      const validCaption = 'valid description';

      expect(validate.mediaCaption(validCaption)).to.equal(true);

    });

    it('should return false when the caption is more than 300 characters', () => {

      let invalidCaption;

      for(let i = 0; i !== 50; i++) invalidCaption += 'abc123';

      expect(validate.mediaCaption(invalidCaption)).to.equal(false);

    });

    it('should return false when the caption is not a string', () => {

      const invalidCaption = 12345;

      expect(validate.mediaCaption(invalidCaption)).to.equal(false);

    });

  });

  describe('mediaTitle function', () => {

    it('should return true when the title is valid', () => {

      const validTitle = 'valid title';

      expect(validate.mediaTitle(validTitle)).to.equal(true);

    });

    it('should return false when the title is more than 120 characters', () => {

      let invalidTitle;

      for(let i = 0; i < 20; i++) invalidTitle += 'abc123';

      expect(validate.mediaTitle(invalidTitle)).to.equal(false);

    });

    it('should return false when the title is not a string', () => {

      const invalidTitle = 12345;

      expect(validate.mediaTitle(invalidTitle)).to.equal(false);

    });

  });

  describe('addMediaProps function', () => {

    it('should return true when the properties are valid', () => {

      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A short caption for a photo",
           "keywords": ["keyword one", "keyword two", "keyword three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword one", "keyword two", "keyword three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      expect(validate.addMediaProps(media)).to.equal(true);

    });

    it(`should return ${ errors.noPropsFound } when no props are passed`, () => {

      expect(validate.addMediaProps({})).to.equal(errors.noPropsFound);

    });

    it(`should return ${ errors.invalidProps } when invalid props are passed`, () => {

      const media = {
        invalidProp: 'not valid',
        "albums": [0, 1, 2, 3],
        "media": [{
           "title": "A Photo Title",
           "caption": "A short caption for a photo",
           "keywords": ["keyword one", "keyword two", "keyword three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword one", "keyword two", "keyword three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      expect(validate.addMediaProps(media)).to.equal(errors.invalidProps);

    });

    it(`should return ${ errors.invalidProps } when invalid props are passed`, () => {

      const media = {
        
        "albums": [0, 1, 2, 3],
        "media": [{
          invalidProp: 'not valid',
           "title": "A Photo Title",
           "caption": "A short caption for a photo",
           "keywords": ["keyword one", "keyword two", "keyword three"],
           "meta": [{
              "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword one", "keyword two", "keyword three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      expect(validate.addMediaProps(media)).to.equal(errors.invalidProps);

    });

    it(`should return ${ errors.invalidProps } when invalid props are passed`, () => {

      const media = {
        
        "albums": [0, 1, 2, 3],
        "media": [{
          "title": "A Photo Title",
          "caption": "A short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            invalidProp: 'not valid',
            "name": "Location",
              "value": "Mexico"
           }]
        }, {
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword one", "keyword two", "keyword three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      expect(validate.addMediaProps(media)).to.equal(errors.invalidProps);

    });

    it(`should return ${ errors.invalidProps } when invalid props are passed`, () => {

      const media = {
        
        "albums": [0, 1, 2, 3],
        "media": [{
          "title": "A Photo Title",
          "caption": "A short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "Location",
            "value": "Mexico"
          }]
        }, {
            invalidProp: 'not valid',
           "title": "A Photo Another Title",
           "caption": "Another short caption for a photo",
           "keywords": ["keyword one", "keyword two", "keyword three"],
           "meta": [{
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      expect(validate.addMediaProps(media)).to.equal(errors.invalidProps);

    });

    it(`should return ${ errors.invalidProps } when invalid props are passed`, () => {

      const media = {
        
        "albums": [0, 1, 2, 3],
        "media": [{
          "title": "A Photo Title",
          "caption": "A short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "Location",
            "value": "Mexico"
          }]
        }, {
          "title": "A Photo Another Title",
          "caption": "Another short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
              invalidProp: 'not valid',
              "name": "People",
              "value": "Family"
           }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      expect(validate.addMediaProps(media)).to.equal(errors.invalidProps);

    });

    it(`should return ${ errors.invalidProps } when invalid props are passed`, () => {

      const media = {
        
        "albums": [0, 1, 2, 3],
        "media": [{
          "title": "A Photo Title",
          "caption": "A short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "Location",
            "value": "Mexico"
          }]
        }, {
          "title": "A Photo Another Title",
          "caption": "Another short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "People",
            "value": "Family"
          }, {
              invalidProp: 'not valid',
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      expect(validate.addMediaProps(media)).to.equal(errors.invalidProps);

    });

    it(`should return ${ errors.missingAlbums } when albums is not passed`, () => {

      const media = {
        // "albums": [0, 1, 2, 3],
        "media": [{
          "title": "A Photo Title",
          "caption": "A short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "Location",
            "value": "Mexico"
          }]
        }, {
          "title": "A Photo Another Title",
          "caption": "Another short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "People",
            "value": "Family"
          }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      expect(validate.addMediaProps(media)).to.equal(errors.missingAlbums);

    });

    it(`should return ${ errors.missingMedia } when media is not passed`, () => {

      const media = {
        "albums": [0, 1, 2, 3],
        };

      expect(validate.addMediaProps(media)).to.equal(errors.missingMedia);

    });

    it(`should return ${ errors.missingMediaTitle } when media title is not passed`, () => {

      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
          // "title": "A Photo Title",
          "caption": "A short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "Location",
            "value": "Mexico"
          }]
        }, {
          "title": "A Photo Another Title",
          "caption": "Another short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "People",
            "value": "Family"
          }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      expect(validate.addMediaProps(media)).to.equal(errors.missingMediaTitle);

    });

    it(`should return ${ errors.missingMediaTitle } when media title is not passed`, () => {

      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
          "title": "A Photo Title",
          "caption": "A short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "Location",
            "value": "Mexico"
          }]
        }, {
          // "title": "A Photo Another Title",
          "caption": "Another short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "People",
            "value": "Family"
          }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      expect(validate.addMediaProps(media)).to.equal(errors.missingMediaTitle);

    });

    it(`should return ${ errors.missingMetaName } when meta name is not passed`, () => {

      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
          "title": "A Photo Title",
          "caption": "A short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            // "name": "Location",
            "value": "Mexico"
          }]
        }, {
          "title": "A Photo Another Title",
          "caption": "Another short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "People",
            "value": "Family"
          }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      expect(validate.addMediaProps(media)).to.equal(errors.missingMetaName);

    });

    it(`should return ${ errors.missingMetaName } when meta name is not passed`, () => {

      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
          "title": "A Photo Title",
          "caption": "A short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "Location",
            "value": "Mexico"
          }]
        }, {
          "title": "A Photo Another Title",
          "caption": "Another short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            // "name": "People",
            "value": "Family"
          }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      expect(validate.addMediaProps(media)).to.equal(errors.missingMetaName);

    });

    it(`should return ${ errors.missingMetaName } when meta name is not passed`, () => {

      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
          "title": "A Photo Title",
          "caption": "A short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "Location",
            "value": "Mexico"
          }]
        }, {
          "title": "A Photo Another Title",
          "caption": "Another short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "People",
            "value": "Family"
          }, {
              // "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      expect(validate.addMediaProps(media)).to.equal(errors.missingMetaName);

    });

    it(`should return ${ errors.missingMetaValue } when meta value is not passed`, () => {

      const media = {
        "albums": [0, 1, 2, 3],
        "media": [{
          "title": "A Photo Title",
          "caption": "A short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "Location",
            "value": "Mexico"
          }]
        }, {
          "title": "A Photo Another Title",
          "caption": "Another short caption for a photo",
          "keywords": ["keyword one", "keyword two", "keyword three"],
          "meta": [{
            "name": "People",
            // "value": "Family"
          }, {
              "name": "Meta Name",
              "value": "Meta Value"
           }]
      }]};

      expect(validate.addMediaProps(media)).to.equal(errors.missingMetaValue);

    });

  });

  describe('keyword function', () => {

    it('should return true when the keyword is valid', () => {

      const keyword = 'valid-keyword';

      expect(validate.keyword(keyword)).to.equal(true);

    });

    it('should return false when the keyword is not a string', () => {

      const keyword = 5432;

      expect(validate.keyword(keyword)).to.equal(false);

    });

    it('should return false when the keyword is less than 2 characters', () => {

      const keyword = 'k';

      expect(validate.keyword(keyword)).to.equal(false);

    });

    it('should return false when the keyword is more than 120 characters', () => {

      let keyword = 'too-long';

      for (let i = 0; i < 16; i++) keyword += 'too-long';

      expect(validate.keyword(keyword)).to.equal(false);

    });

    it('should return false when the keyword contains spaces', () => {

      let keyword = 'not valid';

      expect(validate.keyword(keyword)).to.equal(false);

    });

  });

});