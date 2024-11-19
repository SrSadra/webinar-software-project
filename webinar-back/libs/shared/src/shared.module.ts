import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  providers: [SharedService, CloudinaryService],
  exports: [SharedService],
  imports: [CloudinaryModule],
})
export class SharedModule {}
