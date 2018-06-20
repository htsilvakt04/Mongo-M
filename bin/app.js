const app = require('../server');
const db = require('../db');
const server_port = process.env.PORT || 3000;

async function main () {
   const database =  await db();
   await app(database).listen(server_port, (err) => {
        if (err) console.log(err);
        console.log('app in running on port: 3000')
    });
    const http = require("https");
    setInterval(function() {
        http.get("https://silva--mongomart.herokuapp.com");
    }, 600000); // every 10 minutes (300000
}

main();



