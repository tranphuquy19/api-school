import { Module, forwardRef } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelProvider } from './level.provider';
import { DatabaseModule } from '../shared/database/database.module';
import { LevelController } from './level.controller';
import { SharedModule } from '../shared/shared.module';
import { SchoolProvider } from '../school/school.provider';
@Module({
  providers: [
    LevelProvider,
    LevelService,
    SchoolProvider,
  ],
  imports: [
    DatabaseModule,
    SharedModule,
  ],
  controllers: [
    LevelController,
  ],
  exports:[
    LevelService,
    LevelProvider,
  ],
})
export class LevelModule {}
