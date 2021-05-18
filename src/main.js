import helmet from 'helmet';
import session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilter } from './exception.filter';

const appSetup = (app) => {
  app.use(helmet({ contentSecurityPolicy: false }));
  app.useGlobalFilters(new ExceptionFilter());
  app.setGlobalPrefix('api');
  return app;
};

const appUseSession = (app, config) => {
  app.use(session({
    name: 'vfs-app.sid',
    secret: config.get('secret'),
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true },
   }));
};

const getLogLevels = () => (process.env.NODE_ENV === 'production'
  ? ['log', 'warn', 'error']
  : ['log', 'warn', 'error', 'debug', 'verbose']);

async function bootstrap() {
  const app = appSetup(await NestFactory.create(AppModule, { logger: getLogLevels() }));
  const config = app.get('ConfigService');
  appUseSession(app, config);
  await app.listen(config.get('port'), config.get('host'));
}
bootstrap();
