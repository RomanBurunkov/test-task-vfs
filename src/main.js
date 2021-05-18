import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const appSetup = (app) => {
  // app.use(helmet());
  // app.use(requestIp.mw());
  // app.useGlobalFilters(new ExceptionFilter());
  app.setGlobalPrefix('api');
  return app;
};

const getLogLevels = () => (process.env.NODE_ENV === 'production'
  ? ['log', 'warn', 'error']
  : ['log', 'warn', 'error', 'debug', 'verbose']);

async function bootstrap() {
  const app = appSetup(await NestFactory.create(AppModule, { logger: getLogLevels() }));
  const config = app.get('ConfigService');
  await app.listen(config.get('port'), config.get('host'));
}
bootstrap();
