import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
