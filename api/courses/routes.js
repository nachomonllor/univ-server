import express from 'express';
import CoursesController from './controller';
import auth from '../../middlewares/authentication';

const app = express();
app.get('/', [auth.verifyToken], CoursesController.Fetch);
app.get('/:id', [auth.verifyToken], CoursesController.FetchOne);
app.post('/', [auth.verifyToken], CoursesController.Create);
app.put('/:id', [auth.verifyToken], CoursesController.Update);
app.delete('/:id', [auth.verifyToken], CoursesController.Delete);
export default app;
