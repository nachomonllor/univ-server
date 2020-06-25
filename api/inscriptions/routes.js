import express from 'express';
import InscriptionsController from './controller';
import auth from '../../middlewares/authentication';

const app = express();
app.get('/', [auth.verifyToken], InscriptionsController.Fetch);
app.get('/:id', [auth.verifyToken], InscriptionsController.FetchOne);
app.post('/', [auth.verifyToken], InscriptionsController.Create);
app.put('/:id', [auth.verifyToken], InscriptionsController.Update);
app.delete('/:id', [auth.verifyToken], InscriptionsController.Delete);
export default app;
