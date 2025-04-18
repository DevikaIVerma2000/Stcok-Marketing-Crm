const checkClearance = (permissions) => (req, res, next) => {
    const user = req.user;

    if (user?.clearance_permission || (user?.role && permissions.includes(user.role.clearance_permission))) {
        return next();
    }

    res.status(403).send('Unauthorized');
};

module.exports = checkClearance;