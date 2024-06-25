

import express from 'express';
import { findLike, createLike, deleteLike } from '../controllers/LikesController.js';

const router = express.Router();

router.get('/find/:usersId', async (req, res) => {
  const usersId = req.params.usersId;
  const like = await findLike(usersId);
  res.json(like);
});

router.post('/create/:usersId', async (req, res) => {
  const usersId = req.params.usersId;
  const newLike = await createLike(usersId);
  res.json(newLike);
});

router.delete('/delete/:usersId', async (req, res) => {
  const usersId = req.params.usersId;
  const deletedLike = await deleteLike(usersId);
  res.json(deletedLike);
});

export default router;
