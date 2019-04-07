/**
 * Permission middleware to check user access 
 */
module.exports = (req, res, next) => {
   if(req.session.user.role == 'lead dev') 
      return next();
   res.json('You do not have permission!!!!');
}
// check the user login session
module.exports.checkLogin = (req, res, next) => {
   if(!req.session.user) {
      return next();
   }
   res.send('You already Login');
}
