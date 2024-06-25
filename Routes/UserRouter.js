import {Router}from 'express'

import { createUser, getUserDetails, updateUser, changePassword,promoteUser,activeUser,deactivateUser, loginUser} from '../controllers/UserControllers.js'
import { authenticator,authorizer }   from '../helpers/jwt.js';

const routes=Router();

//create a new user

routes.post ('/new',createUser);

// logginin 

routes.post ('/login',loginUser)


//gets the user details

routes.get('/:userId',authenticator,authorizer('User'),getUserDetails);

//updates the user
routes.put('/edit',updateUser);

//ACTIVE USER

routes.put('/activate/:userId', authenticator, authorizer('user'), activeUser);

//deactivate user

routes.put('/deactivate/:userId', deactivateUser);

//promoteuser

routes.put('/promote/:userId', authenticator, authorizer('ADMIN'), promoteUser);

//bedel passwordka 

routes.put('/change-password/:userId', authenticator, changePassword);

export default routes