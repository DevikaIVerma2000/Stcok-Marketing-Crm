const checkRole = (permissions) => {
    return (req, res, next) => {
        const user = req.user; 

        // Check if user or role exists
        if (!user || !user.role) {
            return res.status(403).send('Access denied');
        }

        // Check if user has any of the required permissions
        for (let permission of permissions) {
            if (user.role[permission] === 1) {
                return next(); 
            }
        }

        // If no permissions match, deny access
        return res.status(403).send('Access denied');
    };
};

module.exports = checkRole;