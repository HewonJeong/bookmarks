import {
  postBookmark,
  getBookmarks,
  deleteBookmark,
  checkBody,
} from './bookmarks.ctrl';
import { Router } from 'express';
import { isAuthenticated } from '../../config/passport';

const router = Router();

router.post('/', isAuthenticated, checkBody, postBookmark);
router.get('/:userId', getBookmarks);
router.delete('/:id', isAuthenticated, deleteBookmark);

export default router;
