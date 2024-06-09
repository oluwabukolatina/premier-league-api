import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import morgan from 'morgan';
import AuthRoute from './component/user/auth/auth.route';
import FixtureRoute from './component/fixture/fixture.route';
import TeamRoute from './component/team/team.route';
import welcomeMessage from './middleware/welcome.middleware';
import notFoundMiddleware from './middleware/not-found.middleware';
import errorMiddleware from './middleware/error.middleware';

dotenv.config();

class App {
  public app: express.Application;

  public authRoute: AuthRoute = new AuthRoute();

  public fixtureRoute: FixtureRoute = new FixtureRoute();

  public teamRoute: TeamRoute = new TeamRoute();

  constructor() {
    this.app = express();
    this.config();
    this.authRoute.routes(this.app);
    this.fixtureRoute.routes(this.app);
    this.teamRoute.routes(this.app);
    this.app.disable('x-powered-by');
    this.app.set('trust proxy', true);
    this.app.get('/', welcomeMessage);
    this.app.get('*', notFoundMiddleware);
    this.app.use(notFoundMiddleware);
    this.app.use(errorMiddleware);
  }

  private config = (): void => {
    this.app.use(helmet());
    this.app.use(mongoSanitize());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  };
}

export default new App().app;
