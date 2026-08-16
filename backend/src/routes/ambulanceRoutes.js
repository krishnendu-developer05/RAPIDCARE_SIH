import { Router } from 'express';
import { getAmbulances } from '../controllers/ambulanceController.js';

const router = Router();

router.get('/', getAmbulances);

export default router;
