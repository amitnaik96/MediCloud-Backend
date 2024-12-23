import { Router } from 'express';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';
const router = Router();

router.get('/isadmin', adminMiddleware, (req, res) => {
    res.json({
        message : 'user is admin'
    });
});

router.get('/me', authMiddleware, (req, res) => {
    res.json({
        message : 'you are logged in'
    })
})

export default router;
