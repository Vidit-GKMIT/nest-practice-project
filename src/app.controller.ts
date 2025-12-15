import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { healthResponse } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHello(): healthResponse {
    return this.appService.getHello();
  }
}
