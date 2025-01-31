import { Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeEntity } from '@app/shared/entities/episode.entity';
import { SharedModule } from '@app/shared';
import { episodeRepository } from '@app/shared/interfaces/repos/episode.repository';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from '@app/shared/cloudinary/cloudinary.module';
import { webinarFilesEntity } from '@app/shared/entities/webinarFiles.entity';
import { episodeFileRepository } from '@app/shared/interfaces/repos/episodeFile.repository';
import { RabbitmqModule } from '@app/shared/rabbitmq.module';
import { CommentRepository } from '@app/shared/interfaces/repos/comment.repository';
import { EpisodeComments } from '@app/shared/entities/episodeComment.entity';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([EpisodeEntity,webinarFilesEntity,webinarFilesEntity, EpisodeComments]), 
    RabbitmqModule.registerRmq("EPISODE_SERVICE", "episode_queue"),
    RabbitmqModule.registerRmq("USER_SERVICE", "user_queue"),
    // CloudinaryModule
  ],
  providers: [EpisodeService, episodeRepository,episodeFileRepository,CommentRepository],
  controllers: [EpisodeController]
})
export class EpisodeModule {}
