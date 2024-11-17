import { Router } from 'express';
import { adminMiddleware } from '../middleware/adminMiddleware';
const router = Router();

router.post('/isadmin', adminMiddleware, (req, res) => {
    res.json({
        admin : true,
        message : 'user is admin'
    });
});

export default router;
