

const GraphqlStrategy = require('./strategies');
const User = require('../../database/models/user');

exports.init = (passport) => {

    passport.serializeUser((user,done) => {
        // console.log("--------serializeUser--- : ",user);
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        // console.log("--------deserializeUser--- : ",id);
        User.findById(id, (error, user) => {
            // console.log("--------user--- : ",user);
            done(error, user);
        });
    });

    passport.use('graphql', new GraphqlStrategy(({email,password}, done) => {
        console.log("Calling verify function of strategy");

        User.findOne({email}, (error , user) => {
            if (error) { return done(error)}
            if (!user) { return done(null, false)}

            // return done(null, user);
            user.validatePassword(password, (error, isMatching) => {
                if (error) { return done(error); }
                if (!isMatching) { return done(null, false);}

                return done(null, user);
            });
        });
    }));
}