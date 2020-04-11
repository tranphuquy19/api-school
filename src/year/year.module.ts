import { Module, forwardRef } from '@nestjs/common';
import { YearService } from './year.service';
import { YearProvider } from './year.provider';
import { DatabaseModule } from '../shared/database/database.module';
import { YearController } from './year.controller';
import { SharedModule } from '../shared/shared.module';
import { SchoolProvider } from '../school/school.provider';
@Module({
  providers: [
    YearProvider,
    YearService,
    SchoolProvider,
  ],
  imports: [
    DatabaseModule,
    SharedModule,
  ],
  controllers: [
    YearController,
  ],
  exports:[
    YearService,
    YearProvider,
  ],
})
export class YearModule {}
