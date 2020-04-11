import { Module, forwardRef } from '@nestjs/common';
import { PersonService } from './person.service';
import { DatabaseModule } from '../shared/database/database.module';
import { PersonController } from './person.controller';
import { SharedModule } from '../shared/shared.module';
import { PersonProvider } from './person.provider';
import { SchoolProvider } from '../school/school.provider';
@Module({
  providers: [
    PersonProvider,
    PersonService,
    SchoolProvider,
  ],
  imports: [
    DatabaseModule,
    SharedModule,
  ],
  controllers: [
    PersonController,
  ],
  exports:[
    PersonService,
    PersonProvider,
  ],
})
export class PersonModule {}
