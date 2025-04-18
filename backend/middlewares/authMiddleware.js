const checkRole = (permissions) => (req, res, next) => {
    const user = req.user;

    if (!user || !user.role || !permissions.some(p => user.role[p] === 1)) {
        return res.status(403).send('Access denied');
    }

    next();
};

const checkRestrictionLevel = (restrictions) => (req, res, next) => {
    const user = req.user;

    if (!user || !user.role || restrictions.includes(user.role.restriction_level)) {
        return next();
    }

    res.status(403).send('Unauthorized');
};

const checkClearance = (permissions) => (req, res, next) => {
    const user = req.user;

    if (!user || !user.role || permissions.includes(user.role.clearance_permission)) {
        return next();
    }

    res.status(403).send('Unauthorized');
};

const checkPermission = (roles) => (req, res, next) => {
    const user = req.user;

    if (!user || !user.role || roles.includes(user.role.role)) {
        return next();
    }

    res.status(403).send('Unauthorized');
};

module.exports = {
    checkRole,
    checkRestrictionLevel,
    checkClearance,
    checkPermission
};