import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotebooksService } from './notebooks.service';
import { NotebooksController } from './notebooks.controller';
import { Notebook } from './entities/notebook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notebook])],
  controllers: [NotebooksController],
  providers: [NotebooksService],
})
export class NotebooksModule {}