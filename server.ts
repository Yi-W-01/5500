/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import User from './models/User';

const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

//connect to native database
mongoose.connect('mongodb://localhost:27017/tuit-db');

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));

//create RESTful APIs
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);


/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
