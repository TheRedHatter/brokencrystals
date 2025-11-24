import { Module } from '@nestjs/common';
import { SafeFilesService } from './safe-files.service';
import { SafeFilesController } from './safe-files.controller';

@Module({
  providers: [SafeFilesService],
  controllers: [SafeFilesController]
})
export class SafeFilesModule {}
