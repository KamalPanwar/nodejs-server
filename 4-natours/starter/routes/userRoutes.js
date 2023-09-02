import express from 'express';
import {
  upateUser,
  getAllUsers,
  createNewUser,
  deleteUser,
  getUser,
} from '../controllers/userController.js';
const router = express.Router();

router.route('/').get(getAllUsers).post(createNewUser);
router
  .route('/:id')
  .get(getUser)
  .patch(upateUser)
  .delete(deleteUser);

export default router;
