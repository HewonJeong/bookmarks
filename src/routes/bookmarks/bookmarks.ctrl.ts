import { Request, Response, NextFunction } from 'express';

export const checkBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const postBookmark = async (req: Request, res: Response) => {};

export const deleteBookmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const getBookmarks = (req: Request, res: Response) => {};
