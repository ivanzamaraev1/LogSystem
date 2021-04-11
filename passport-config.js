const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(user)
    try {
      if (await bcrypt.compare(req.body.password, user.password)){
        return done(null, user)
      }else {
        return done(null, false, {message: 'Password is incorrect'})
      }
    }catch {
      return done(null, false, {message: 'Not Allowed'})
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize