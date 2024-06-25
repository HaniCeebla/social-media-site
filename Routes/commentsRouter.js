import {Router} from 'express'
import {  getAllcomments, createcomments, updatecomments, deletecomments,getOnecommentsDetails } from '../controllers/commentsControllers.js';

const routes =Router();


// get all  comments


routes.get('/all', getAllcomments);

// create new comments

routes.post('/new', createcomments); 

//get one  comments

routes.get('/getOne',getOnecommentsDetails);
// update comments

routes.put('/edit',updatecomments);

// delete comments route


routes.delete('/delete', deletecomments);



// export hte router
export default routes;