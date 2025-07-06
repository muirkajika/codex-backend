import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notebook } from './entities/notebook.entity';
import { CreateNotebookDto } from './dto/create-notebook.dto';

@Injectable()
export class NotebooksService {
  constructor(
    @InjectRepository(Notebook)
    private readonly notebookRepository: Repository<Notebook>,
  ) {}

  // This function creates ONE notebook and should return ONE notebook
  async create(createNotebookDto: CreateNotebookDto): Promise<Notebook> {
    const notebook = this.notebookRepository.create(createNotebookDto);
    return this.notebookRepository.save(notebook);
  }

  // This function finds ALL notebooks and should return an ARRAY of them
  async findAll(): Promise<Notebook[]> {
    return this.notebookRepository.find();
  }
}
