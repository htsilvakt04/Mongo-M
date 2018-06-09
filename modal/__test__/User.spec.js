const User = require('../User');
const db = require('../../db');
const app = require('../../server');
const mongoose = require('mongoose');

beforeAll(async () => {
    const database  = await db();
    app(database).listen(3000, (err) => {
        if (err) console.log(err);
        console.log('app in running on port: 3000')
    });
})

afterAll( done => {
    mongoose.disconnect(done)
})


describe('User Model', () => {
    describe('save a basic user', async () => {
        const dataToSave = {
            name: 'Trung Pham',
            email: 'htsilvakt04@gmail.com',
            password: '123456',
        }
        const user = await User.create(dataToSave).then((user, err) => user);
        expect(user).toMatchObject(dataToSave);
    });
    describe('save user through Social', () => {
        const dataToSave = {
            client: {
                facebook: {
                    client: 'facebook',
                    access_token: '123321!dwad'
                }
            }
        }
        it('Should fill in basic info and it-self', async () => {

        })
        it('Should fill just it-self info', () => {

        })
    });
});
