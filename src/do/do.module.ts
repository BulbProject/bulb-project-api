import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AlgorithmsModule } from './algorithms';

import { DoController } from './do.controller';
import { documentsConfig, DocumentsService, DocxGeneratorService } from './services';

@Module({
  imports: [ConfigModule.forFeature(documentsConfig), AlgorithmsModule],
  controllers: [DoController],
  providers: [ValidationPipe, DocxGeneratorService, DocumentsService],
})
export class DoModule {}
