const app = require('../server');
const db = require('../db');

async function main () {
   const database =  await db();
   await app(database).listen(3000, (err) => {
        if (err) console.log(err);
        console.log('app in running on port: 3000')
    });
}

main();



