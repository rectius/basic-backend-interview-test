import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import expressWinston from 'express-winston';
import helmet from 'helmet';
import httpStatus from 'http-status';
import APIError from './models/error/APIError';
import routes from './routes/index.route';
import winstonInstance from './config/winston';

// load environment variables from .env file
dotenv.load();

// express
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// compress a HTTP message
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.enable('trust proxy');

// enable detailed API logging in dev env
if (process.env.NODE_ENV === 'development') {
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(expressWinston.logger({
        winstonInstance,
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorStatus: true
    }));
}

// mount all routes on /api path
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new APIError('API not found', httpStatus.NOT_FOUND);
    return next(err);
});

// log error in winston transports except when executing test suite
if (process.env.NODE_ENV !== 'test') {
    app.use(expressWinston.errorLogger({
        winstonInstance
    }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) =>
    res.status(err.status).json({
        message: err.isPublic ? err.message : httpStatus[err.status],
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
);

// Handle uncaughtException
process.on('uncaughtException', (err) => {
    console.log('Caught exception: %j', err);
    process.exit(1);
  });

export default app;