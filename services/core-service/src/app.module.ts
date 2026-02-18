import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from './modules/modules.module';
import { LibsModule } from './libs/libs.module';

@Module({
  imports: [ModulesModule, LibsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
