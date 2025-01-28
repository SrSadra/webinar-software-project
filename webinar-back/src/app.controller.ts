import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  // @Get('*') // will match any route that doesnt match other
  // handleNotFound() {
  //   return '404 Not Found';
  // }
}
