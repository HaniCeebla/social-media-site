import {Router} from 'express'
import { getAllPosts, 
    createPosts,
    updatePosts,
    deletePosts,
    getOnePostsDetails,
    } from '../controllers/PostsControllers.js';

import { authenticator,authorizer } from '../helpers/jwt.js';

const routes =Router();


// get all posts


routes.get('/all',  getAllPosts);

// create new post

routes.post('/new', authenticator, createPosts); 

// routes.post('like/:postsId', likePost);

// routes.delete('like/:postsId', unlikePost);


//get one posts

routes.get('/getOne', authenticator,authorizer('User'), getOnePostsDetails);
// update post

routes.put('/edit', authenticator,authorizer('User'), updatePosts);
// 
// delete post route
routes.delete('/delete', authenticator,authorizer('User'), deletePosts);



// export hte router
export default routes;