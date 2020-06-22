import express from 'express';
import auth from '../../middlewares/authentication';
import UsersController from './controller';


const app = express();
app.get('/', [auth.verifyToken], UsersController.Fetch);
app.get('/:id', [auth.verifyToken], UsersController.FetchOne);
app.post('/',  UsersController.Create);
app.put('/:id', UsersController.Update);
app.delete('/:id', UsersController.Delete);

export default app;
