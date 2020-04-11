import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../shared/database/database.module';
import { TokensProvider } from './token.provider';
import { TokensService } from './token.service';
import { TokensController } from './token.controller';
@Module({
  providers: [
    TokensProvider,
    TokensService,
  ],
  imports: [
    DatabaseModule,
  ],
  controllers: [
    TokensController,
  ],
  exports:[
    TokensService,
    TokensProvider,
  ],
})
export class TokensModule {}
