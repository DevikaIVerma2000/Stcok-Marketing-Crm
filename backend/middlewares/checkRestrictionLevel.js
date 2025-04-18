const checkRestrictionLevel = (restrictions) => (req, res, next) => {
    const user = req.user;

    if (!user || !user.role || restrictions.includes(user.role.restriction_level)) {
        return next();
    }

    res.status(403).send('Unauthorized');
};

module.exports = checkRestrictionLevel;