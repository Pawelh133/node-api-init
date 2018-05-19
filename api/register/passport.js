import passport from 'passport';
import * as passportJWT from 'passport-jwt';

const stategyJWT = passportJWT.Strategy;
const exctratJWT = passportJWT.ExtractJwt;

passport.serializeUser((user, done) => {
  done(null, user.username)
})

  /*
  passport.deserializeUser(function (username, done) {
    done(null, username)
  })
  */

 let opts = {}

 // Setup JWT options
 opts.jwtFromRequest = exctratJWT.fromAuthHeaderAsBearerToken();
 opts.secretOrKey = process.env.SECRET;
 
 passport.use(new stategyJWT(opts, (jwtPayload, done) => {
   //If the token has expiration, raise unauthorized
   const expirationDate = new Date(jwtPayload.exp * 1000)
   if(expirationDate < new Date()) {
     return done(null, false);
   }
   const user = jwtPayload
   done(null, user)
 }))