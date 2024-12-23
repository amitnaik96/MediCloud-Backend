import { Router } from 'express';
const router = Router();

router.post('/signout', (req, res) => {
    res.clearCookie("token", {
        httpOnly: true, 
        path: '/',       
    });

    res.json({
        message : 'user logged out!'
    });
});

export default router;