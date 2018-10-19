import { Request, Response, NextFunction } from 'express';
import Bookmark from '../../database/models/Bookmark';

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
  const keys = ['title', 'url', 'description', 'image'];
  keys.forEach(key => req.checkBody(key, `${key} is empty😵`).notEmpty());
  const errors = req.validationErrors();
  if (errors) {
    res.status(422).json({ errors });
  } else {
    next();
  }
};

export const postBookmark = async (req: Request, res: Response) => {
  type Body = {
    title: string;
    url: string;
    description: string;
    image: string;
  };
  const body: Body = req.body;
  try {
    const bookmark = await Bookmark.create({
      ...body,
      createdBy: req.user.id,
    });
    res.json(bookmark);
  } catch (e) {
    res.status(500);
    res.json(
      new Error(
        'Internel server error during writing bookmark object to the database'
      )
    );
  }
};

export const deleteBookmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  type Params = { id: string };
  const params: Params = req.params;
  const { id } = params;
  const userId: string = req.user.id;

  try {
    const result = await Bookmark.destroy({ where: { id, createdBy: userId } });
    if (result === 0) {
      res.status(400);
      throw new Error(`There\'s no available item to delete: ${id}'`);
    }
    res.end();
  } catch (e) {
    res.statusCode === 200 && res.status(500);
    res.json({ error: e.message || 'error during deleting a bookmark' });
  }
};

export const getBookmarks = (req: Request, res: Response) => {};
