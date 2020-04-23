// *****************
//  Port
// *****************
process.env.PORT = process.env.PORT || 3000;



// *****************
//  Environment
// *****************
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



// *****************
//  Data Bases
// *****************
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffee';
} else {
    urlDB = 'mongodb+srv://mowaey:USfnOqrQO6TWO7hs@cluster0-tew9r.mongodb.net/coffee';
}

process.env.URLDB = urlDB;