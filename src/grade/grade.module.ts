import { Module, forwardRef } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeProvider } from './grade.provider';
import { DatabaseModule } from '../shared/database/database.module';
import { GradeController } from './grade.controller';
import { SharedModule } from '../shared/shared.module';
import { LevelProvider } from '../level/level.provider';
@Module({
  providers: [
    GradeProvider,
    GradeService,
    LevelProvider,
  ],
  imports: [
    DatabaseModule,
    SharedModule,
  ],
  controllers: [
    GradeController,
  ],
  exports:[
    GradeService,
    GradeProvider,
  ],
})
export class GradeModule {}
