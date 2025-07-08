import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- START OF CORS CONFIGURATION ---
  // This is the crucial change. We are now explicitly telling the
  // backend to trust requests coming from our frontend's domain.
  app.enableCors({
    origin: 'https://links.flexxor.duckdns.org', // Your frontend's public URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // --- END OF CORS CONFIGURATION ---

  // Set a global prefix for all routes, e.g., /notebooks
  // The backend will be served at the root, so we remove the /api prefix
  // app.setGlobalPrefix('api'); // <-- We will remove this for a cleaner setup

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
