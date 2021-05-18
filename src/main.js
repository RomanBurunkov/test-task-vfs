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

const getLogLevels = () => (process.env.NODE_ENV === 'production'
  ? ['log', 'warn', 'error']
  : ['log', 'warn', 'error', 'debug', 'verbose']);

async function bootstrap() {
  const app = appSetup(await NestFactory.create(AppModule, { logger: getLogLevels() }));
  const config = app.get('ConfigService');
  app.use(session({
    secret: config.get('secret'),
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true },
   }));
  await app.listen(config.get('port'), config.get('host'));
}
bootstrap();
