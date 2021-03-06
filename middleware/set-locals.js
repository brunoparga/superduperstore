module.exports = (req, res, next) => {
  res.locals.isAuthenticated = req.user !== undefined;
  res.locals.csrfToken = req.csrfToken();
  if (req.user) {
    res.locals.userEmail = req.user.email;
  }
  next();
};
