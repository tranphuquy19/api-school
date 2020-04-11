import { Module, forwardRef } from '@nestjs/common';
import { WeekService } from './week.service';
import { WeekProvider } from './week.provider';
import { DatabaseModule } from '../shared/database/database.module';
import { WeekController } from './week.controller';
import { SharedModule } from '../shared/shared.module';
import { CourseProvider } from '../course/course.provider';
@Module({
  providers: [
    WeekProvider,
    WeekService,
    CourseProvider,
  ],
  imports: [
    DatabaseModule,
    SharedModule,
  ],
  controllers: [
    WeekController,
  ],
  exports:[
    WeekService,
    WeekProvider,
  ],
})
export class WeekModule {}
