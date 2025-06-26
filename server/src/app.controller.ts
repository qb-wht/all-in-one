import {Body, Controller, Post} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('project/create')
  async create(@Body() body: {title: string}) {
    return this.appService.createProject(body.title);
  }
}
