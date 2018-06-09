require('dotenv').config();
const { hydrateFBToken, constructDataFB, checkValidFBToken } = require('../util');

const token = 'EAAarJ2ftUqUBADZBqSmviI7A8HNqdGOaTIyAk365xecMV3ZCkifytkxJJPp7l1aUtWp6Cdb82xlE2zkHIVtq0i4kQqlZAhnEWDi80Chkm5k554yFy7hTdZBYJBYP3PpWqmuUPFRnmctCNzT1WB30wdlbuCJ2vxfUdPLAhaJ15hyl7rtZALZCyyyZCqblqequY0NeokvZBZCh0bcDeygMuXSLn54JVkytkIdwZD';
const expiredToken = 'EAAarJ2ftUqUBAORPt4lmZB095DxgJsy5zEdOf33FYnkAaZC2NriAhZC4KatJ7aRkooeBONK0wALMlCG0Tji6z4c3luzrYmhOdh2GJxuHtSnVDVoiGBd1KFNOQebHfLHOj6B65XoUnq!dedw';

describe('hydrateFBToken()', () => {
    it('Should return a string token', () => {
        const actual = hydrateFBToken({
            accessToken: token,
            userID: '2070062783229321',
            expiresIn: 6043,
            reauthorize_required_in: 7620703
        });

        expect(actual).toEqual(token);
    });
    
    it('should return null', () => {
        const actual = hydrateFBToken({});
        const expected = null;

        expect(actual).toEqual(expected);
    })
});

describe('constructDataFB()', () => {
    it('Should return exact format', () => {
        const actual = constructDataFB(token);
        const expected = {
            params: {
                input_token: token,
                access_token: process.env.FACE_BOOK_APP_TOKEN // App_access_token
            }
        };
        expect(actual).toEqual(expected);
    })
});

describe('checkValidFBToken()', () => {

    it('return object contain isValid: false', async () => {
        const dataToSend = constructDataFB(expiredToken);

        const actual = await checkValidFBToken(dataToSend);
        const expected = {
            isValid: false
        };
            
        expect(actual).toEqual(expected);
    })
    it('return valid field', async () => {
        const dataToSend = constructDataFB(token);
        const actual = await checkValidFBToken(dataToSend);
        const expected = {
            isValid: true
        };
        expect(actual).toMatchObject(expected);
    })
});