import {Router} from 'express'
import { createcommentlikes, deletecommentlikes, getAllcommentlikes, getOnecommentlikesDetails, updatecommentlikes } from '../controllers/commentlikesControllers.js';


const routes =Router();


// get all  commentlikes


routes.get('/all', getAllcommentlikes);

// create newcommentlikes

routes.post('/new', createcommentlikes); 

//get one  commentlikes

routes.get('/getOne',getOnecommentlikesDetails);
// update commentlikes

routes.put('/edit',updatecommentlikes);

// delete commentlikes route


routes.delete('/commentlikes/:id', deletecommentlikes);



// export hte router
export default routes;