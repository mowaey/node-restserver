// *****************
//  Port
// *****************
process.env.PORT = process.env.PORT || 3000;



// *****************
//  Environment
// *****************
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



// ************************
//  Token expires
// ************************
// 60 seconds
// 60 minutes
// 24 hours
// 30 days
process.env.CADUCIDAD_TOKEN = '48h';



// ********************************
//  SEED of authentication
// ********************************
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';



// *****************
//  Data Bases
// *****************
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffee';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;



// ****************************
//  Google Client ID
// ****************************
process.env.CLIENT_ID = process.env.CLIENT_ID || '965938443250-6vu6bo8v59f8c2g5tpjl1fjfdj1ci17n.apps.googleusercontent.com';