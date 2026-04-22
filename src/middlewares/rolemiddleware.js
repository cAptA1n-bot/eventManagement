const roleMiddleware = (req, res, next) => {
    if (req.user.role !== 'superAdmin') {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

export default roleMiddleware;