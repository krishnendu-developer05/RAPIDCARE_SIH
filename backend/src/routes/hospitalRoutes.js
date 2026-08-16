import { Router } from 'express';
import { getNearbyHospitals, getHospitalById } from '../controllers/hospitalController.js';

const router = Router();

router.get('/nearby', getNearbyHospitals);
router.get('/:id', getHospitalById);

export default router;
