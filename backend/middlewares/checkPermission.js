const checkPermission = (permissions) => (req, res, next) => {
    const user = req.user;

    if (!user || !user.role || permissions.includes(user.role.role)) {
        return next();
    }

    res.status(403).send('Unauthorized');
};

module.exports = checkPermission;