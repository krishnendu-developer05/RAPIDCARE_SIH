import { Router } from 'express';
import {
  createBooking,
  getBookingById,
  updateBookingStatus,
} from '../controllers/bookingController.js';

const router = Router();

router.post('/', createBooking);
router.get('/:id', getBookingById);
router.patch('/:id/status', updateBookingStatus);

export default router;
