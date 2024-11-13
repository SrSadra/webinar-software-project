import { Module } from '@nestjs/common';
import { WebinarService } from './webinar.service';
import { WebinarController } from './webinar.controller';

@Module({
  providers: [WebinarService],
  controllers: [WebinarController]
})
export class WebinarModule {}
