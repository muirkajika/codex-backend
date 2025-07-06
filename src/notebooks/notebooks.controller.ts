import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { Notebook } from './entities/notebook.entity';

@Controller('notebooks')
export class NotebooksController {
  constructor(private readonly notebooksService: NotebooksService) {}

  @Post()
  create(@Body() createNotebookDto: CreateNotebookDto): Promise<Notebook> {
    return this.notebooksService.create(createNotebookDto);
  }

  @Get()
  findAll(): Promise<Notebook[]> {
    return this.notebooksService.findAll();
  }
}