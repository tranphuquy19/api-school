import { Module, forwardRef } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseProvider } from './course.provider';
import { DatabaseModule } from '../shared/database/database.module';
import { CourseController } from './course.controller';
import { SharedModule } from '../shared/shared.module';
import { UsersProvider } from '../users/users.provider';
import { YearProvider } from '../year/year.provider';
import { GradeProvider } from '../grade/grade.provider';
@Module({
  providers: [
    CourseProvider,
    CourseService,
    UsersProvider,
    YearProvider,
    GradeProvider,
  ],
  imports: [
    DatabaseModule,
    SharedModule,
  ],
  controllers: [
    CourseController,
  ],
  exports:[
    CourseService,
    CourseProvider,
  ],
})
export class CourseModule {}
