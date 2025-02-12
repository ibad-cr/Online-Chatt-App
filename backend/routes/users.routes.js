
import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUsersForSidebar, updateUserInformation } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', protectRoute, getUsersForSidebar);
router.put('/update', protectRoute, updateUserInformation);

export default router;