
const mongoose = require('mongoose');
const session = require('express-session');
const MongodbStore = require('connect-mongodb-session')(session);
const config = require('../config/dev');

require('./models/portfolio');
require('./models/user');
require('./models/forumCategory');
require('./models/topic');
require('./models/post');

exports.connect = () => {
    mongoose.connect(config.DB_URI, {
        //useCreatendex: true, 
        //useFindAndModify: false, 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
     }, ( ) => {
        console.log('Connect to DB');
    })
}

exports.initSessionStore = () => {
    const store = new MongodbStore({
        uri : config.DB_URI,
        collection : 'portfolioSessions'
    });
    return store;
}