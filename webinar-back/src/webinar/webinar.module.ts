import { Module } from '@nestjs/common';
import { WebinarService } from './webinar.service';
import { WebinarController } from './webinar.controller';
import { CloudinaryModule } from '@app/shared/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { webinarEntity } from '@app/shared/entities/webinar.entity';
import { SubCategoryEntity } from '@app/shared/entities/subCategory.entity';
import { webinarRepository } from '@app/shared/interfaces/repos/webinar.repository';
import { episodeRepository } from '@app/shared/interfaces/repos/episode.repository';
import { EpisodeEntity } from '@app/shared/entities/episode.entity';
import { SharedModule } from '@app/shared';
import { jwtAuthModule } from '@app/shared/strategies/jwtauth.module';
import { RabbitmqModule } from '@app/shared/rabbitmq.module';

@Module({
  imports: [
    // CloudinaryModule,
    TypeOrmModule.forFeature([webinarEntity]),
    RabbitmqModule.registerRmq("CATEGORY_SERVICE", "category_queue"),
    RabbitmqModule.registerRmq("USER_SERVICE", "user_queue"),
    RabbitmqModule.registerRmq("EPISODE_SERVICE", "episode_queue"),
    RabbitmqModule.registerRmq("WEBINAR_SERVICE", "webinar_queue"),
    jwtAuthModule,
    SharedModule
  ],
  providers: [WebinarService,webinarRepository],
  controllers: [WebinarController]
})
export class WebinarModule {}
