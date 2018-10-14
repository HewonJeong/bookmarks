import { Request, Response, NextFunction } from 'express';
import Bookmark from '../../database/models/Bookmark';

export const checkBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

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
) => {};

export const getBookmarks = (req: Request, res: Response) => {};
