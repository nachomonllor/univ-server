import express from 'express';
import auth from '../../middlewares/authentication';
import StudentController from './controller';


const app = express();
app.get('/', [auth.verifyToken], StudentController.Fetch);
app.get('/:id', [auth.verifyToken], StudentController.FetchOne);
app.post('/',  StudentController.Create);
app.put('/:id', StudentController.Update);
app.delete('/:id', StudentController.Delete);

export default app;
