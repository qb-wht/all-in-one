import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAll() {
    return this.appService.getAllDocs('my_remote_db');
  }

  @Post()
  async create(@Body() body: any) {
    return this.appService.createDoc('my_remote_db', body);
  }
}
