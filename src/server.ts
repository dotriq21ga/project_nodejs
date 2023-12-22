import express from 'express';
import ApiRouter from './routes/ApiRouter';

export class Server {
    public app = express();
    public router = ApiRouter;
}
