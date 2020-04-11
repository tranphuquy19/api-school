import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SchoolModule } from './school/school.module';
import { PersonModule } from './person/person.module';
import { RolModule } from './rol/rol.module';
import { LevelModule } from './level/level.module';
import { TokensModule } from './token/token.module';
import { GradeModule } from './grade/grade.module';
import { YearModule } from './year/year.module';
import { CourseModule } from './course/course.module';
import { AlumnListModule } from './alumn-list/alumn-list.module';
import { WeekModule } from './week/week.module';
import { TabModule } from './tab/tab.module';
import { AttributeModule } from './attribute/attribute.module';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    SchoolModule,
    PersonModule,
    RolModule,
    LevelModule,
    TokensModule,
    GradeModule,
    YearModule,
    CourseModule,
    AlumnListModule,
    WeekModule,
    TabModule,
    AttributeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
