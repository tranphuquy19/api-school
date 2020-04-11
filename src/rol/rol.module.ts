import { Module, forwardRef } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolProvider } from './rol.provider';
import { DatabaseModule } from '../shared/database/database.module';
import { RolController } from './rol.controller';
import { SharedModule } from '../shared/shared.module';
import { PersonProvider } from '../person/person.provider';
import { SchoolProvider } from '../school/school.provider';
@Module({
  providers: [
    RolService,
    PersonProvider,
    RolProvider,
    SchoolProvider,
  ],
  imports: [
    DatabaseModule,
    SharedModule,
  ],
  controllers: [
    RolController,
  ],
  exports:[
    RolService,
    RolProvider,
  ],
})
export class RolModule {}
