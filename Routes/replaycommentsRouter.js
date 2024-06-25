import {Router} from 'express'
import { createreplaycomments, deletereplaycomments, getAllreplaycomments, getOnereplaycommentsDetails, updatereplaycomments } from '../controllers/replaycommentsControllers.js';

const routes =Router();


// get all  replaycomments


routes.get('/all', getAllreplaycomments);

// create new replaycomments

routes.post('/new', createreplaycomments); 

//get one  replaycomments

routes.get('/getOne',getOnereplaycommentsDetails);
// update comments

routes.put('/edit',updatereplaycomments);

// delete replaycomments route


routes.delete('/delete', deletereplaycomments);



// export hte router
export default routes;