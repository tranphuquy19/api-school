import { Module, forwardRef } from '@nestjs/common';
import { AlumnListService } from './alumn-list.service';
import { AlumnListProvider } from './alumn-list.provider';
import { DatabaseModule } from '../shared/database/database.module';
import { AlumnListController } from './alumn-list.controller';
import { SharedModule } from '../shared/shared.module';
import { UsersProvider } from '../users/users.provider';
import { YearProvider } from '../year/year.provider';
import { GradeProvider } from '../grade/grade.provider';
@Module({
  providers: [
    AlumnListProvider,
    AlumnListService,
    UsersProvider,
    YearProvider,
    GradeProvider,
  ],
  imports: [
    DatabaseModule,
    SharedModule,
  ],
  controllers: [
    AlumnListController,
  ],
  exports:[
    AlumnListService,
    AlumnListProvider,
  ],
})
export class AlumnListModule {}
