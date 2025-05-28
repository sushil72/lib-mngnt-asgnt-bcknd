module.exports = function(allowedRoles = []) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(403).json({ error: 'Unauthorized: No user info found' });
      }
  
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied: Insufficient permissions' });
      }
      
      next();
    };
  };
  