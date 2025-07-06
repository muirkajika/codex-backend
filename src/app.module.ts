import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotebooksModule } from '@/notebooks/notebooks.module';

@Module({
  imports: [
    // Makes .env variables available globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configures the database connection using variables from .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'), // e.g., postgresql://user:pass@host:5432/db
        autoLoadEntities: true, // Automatically load all entities
        synchronize: true, // IMPORTANT: true for dev (auto-creates tables), false for prod
      }),
    }),
    NotebooksModule, // Import our new feature module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
