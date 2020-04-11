import { Module, forwardRef } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeProvider } from './attribute.provider';
import { DatabaseModule } from '../shared/database/database.module';
import { AttributeController } from './attribute.controller';
import { SharedModule } from '../shared/shared.module';
import { TabProvider } from '../tab/tab.provider';
@Module({
  providers: [
    AttributeProvider,
    AttributeService,
    TabProvider,
  ],
  imports: [
    DatabaseModule,
    SharedModule,
  ],
  controllers: [
    AttributeController,
  ],
  exports:[
    AttributeService,
    AttributeProvider,
  ],
})
export class AttributeModule {}
