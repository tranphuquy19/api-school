import { Module, forwardRef } from '@nestjs/common';
import { TabService } from './tab.service';
import { TabProvider } from './tab.provider';
import { DatabaseModule } from '../shared/database/database.module';
import { TabController } from './tab.controller';
import { SharedModule } from '../shared/shared.module';
import { WeekProvider } from '../week/week.provider';
@Module({
  providers: [
    TabProvider,
    TabService,
    WeekProvider,
  ],
  imports: [
    DatabaseModule,
    SharedModule,
  ],
  controllers: [
    TabController,
  ],
  exports:[
    TabService,
    TabProvider,
  ],
})
export class TabModule {}
