import express, { Express } from 'express';
import compression from 'compression'; // compresses requests
import session from 'express-session';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import path from 'path';
import errorhandler from 'errorhandler';
import lusca from 'lusca';
import routes from './routes';
import passport from 'passport';
import expressValidator from 'express-validator';
import db from './database';
import * as passportConfig from './config/passport';

export default class Server {
  private app: Express;
  private static readonly DEFAULT_PORT = 3300;

  constructor() {
    this.app = express();
    this.middleware();
    this.initDb();
  }

  private async initDb() {
    try {
      await db.authenticate();
      console.log('🛳 DB connection has been established successfully.');
    } catch (e) {
      console.error('Unable to connect to the database:', e);
    }
  }

  private middleware() {
    const { app } = this;
    const { SESSION_SECRET, NODE_ENV } = process.env;

    // express configuration
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());
    app.use(
      session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(lusca.xframe('SAMEORIGIN'));
    app.use(lusca.xssProtection(true));
    app.use((req, res, next) => {
      res.locals.user = req.user;
      next();
    });
    app.use(
      express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
    );

    // primary app router
    app.use('/', routes);
    app.get('/me', passportConfig.isAuthenticated, (req, res, next) => {
      res.json(req.user);
    });

    // error handler
    NODE_ENV === 'development' && app.use(errorhandler());
  }

  listen(port = Server.DEFAULT_PORT) {
    const { app } = this;
    const env = app.get('env');
    app.set('port', port);
    app.listen(port);
    console.log(`🌏⠀App is running at http://localhost:${port} in ${env} mode`);
  }
}
