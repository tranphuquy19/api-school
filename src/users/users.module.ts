import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersProvider } from './users.provider';
import { DatabaseModule } from '../shared/database/database.module';
import { UsersController } from './users.controller';
import { SharedModule } from '../shared/shared.module';
import { PersonProvider } from '../person/person.provider';
import { RolProvider } from '../rol/rol.provider';
@Module({
  providers: [
    UsersProvider,
    UsersService,
    PersonProvider,
    RolProvider,
  ],
  imports: [
    DatabaseModule,
    SharedModule,
  ],
  controllers: [
    UsersController,
  ],
  exports:[
    UsersService,
    UsersProvider,
  ],
})
export class UsersModule {}
