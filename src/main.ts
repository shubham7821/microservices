import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    origin: [
      'http://localhost:4200',
      'http://localhost:3001',
      'http://localhost:3000',
      'http://localhost:4001',
      'https://localhost',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  //app.use(cors(options))
  app.enableCors(options);
  await app.listen(4000);
}
bootstrap();
