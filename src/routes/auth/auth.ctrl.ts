import { Request, Response } from 'express';
export const testFacebook = (req: Request, res: Response) => {
  console.log('testFacebook');
  res.sendFile('./views/facebookLogin.html', { root: '.' });
};
