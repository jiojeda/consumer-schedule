import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumerEventsModule } from './consumer-events/consumer-events.module';

@Module({
  imports: [ConsumerEventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
