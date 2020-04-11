import { Module, forwardRef } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolProvider } from './school.provider';
import { DatabaseModule } from '../shared/database/database.module';
import { SchoolController } from './school.controller';
import { SharedModule } from '../shared/shared.module';
import { PersonProvider } from '../person/person.provider';
@Module({
  providers: [
    SchoolProvider,
    SchoolService,
    PersonProvider,
  ],
  imports: [
    DatabaseModule,
    SharedModule,
  ],
  controllers: [
    SchoolController,
  ],
  exports:[
    SchoolService,
    SchoolProvider,
  ],
})
export class SchoolModule {}
