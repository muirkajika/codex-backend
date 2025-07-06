// src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): { status: string } {
    return { status: 'Codex API is running!' };
  }
}