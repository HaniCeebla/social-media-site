import  express  from "express";
import UserRouter from './Routes/UserRouter.js';
import PostsRouter from './Routes/PostsRouter.js';
import commentsRouter from './Routes/commentsRouter.js';
import LikesRouter from './Routes/LikesRouter.js';
import replaycommentsRouter from './Routes/replaycommentsRouter.js';
import  commentlikesRouter from './Routes/commentlikesRouter.js'; 
import bodyParser from "body-parser";

const app = express();

app. use (express.json ());
app.use (bodyParser.json ());

app.use('/api/users',UserRouter)

app.use('/api/Posts', PostsRouter)

app.use('/api/comments', commentsRouter)

app.use('/api/Likes',LikesRouter)

app.use('/api/replaycomments', replaycommentsRouter)

app.use ('/api/commentlikes',commentlikesRouter)


//listen port 6000//

app.listen(process.env.PORT,()=>{
    console.log ('Server is listening on port ' + process.env.PORT);
});