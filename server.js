import express from 'express';
import mongoose from 'mongoose';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import BookmarkController from './controllers/BookmarkController';
import FollowController from './controllers/FollowController';
import MessageController from './controllers/MessageController';
import LikeController from './controllers/LikeController';
const cors = require('cors');
const session = require("express-session");
const app = express();
// app.use(cors({
//     credentials: true,
//     origin: process.env.CORS_ORIGIN
// }));
//app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*, http://localhost:3000/');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
const corsConfig = {
    credentials: true,
    origin: 'http://localhost:3000',
};
app.use(cors(corsConfig));
app.use(express.json());
//connect to native database
//mongoose.connect('mongodb://localhost:27017/tuit-db');
// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = "1w";
const DB_PASSWORD = "5500";
const HOST = "cluster0.9xnxk7s.mongodb.net";
const DB_NAME = "tuit-db";
const DB_QUERY = "retryWrites=true&w=majority";
//const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
const connectionString = `mongodb+srv://1w:5500@cluster0.9xnxk7s.mongodb.net/?retryWrites=true&w=majority`;
// connect to the database
mongoose.connect(connectionString);
let sess = {
    secret: process.env.SECRET,
    cookie: {
        secure: false
    }
};
if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}
app.get('/', (req, res) => res.send('Welcome to Foundation of Software Engineering'));
//create RESTful APIs
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const likeController = LikeController.getInstance(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
