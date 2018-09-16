import { Router, Response, Request } from 'express';
import auth from './auth';
const routes = Router();

routes.use('/auth', auth);

routes.get('/', (req: Request, res: Response) => {
  res.send('GET request to the homepage');
});

routes.post('/', (req: Request, res: Response) => {
  res.send('POST request to the homepage');
});

export default routes;
