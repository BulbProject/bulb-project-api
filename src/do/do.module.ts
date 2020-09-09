import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { VersionsPackageRepositoryModule } from 'shared/repositories/versions-package';
import { CategoryVersionRepositoryModule } from 'shared/repositories/category-version';

import { AlgorithmsModule } from './algorithms';

import { DoController } from './do.controller';
import { documentsConfig, DocumentsService, DocxGeneratorService } from './services';

@Module({
  imports: [
    ConfigModule.forFeature(documentsConfig),
    AlgorithmsModule,
    VersionsPackageRepositoryModule,
    CategoryVersionRepositoryModule,
  ],
  controllers: [DoController],
  providers: [ValidationPipe, DocxGeneratorService, DocumentsService],
})
export class DoModule {}
