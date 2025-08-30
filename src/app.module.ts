import { Module } from '@nestjs/common';
import { ConsumerEventsModule } from './consumer-events/consumer-events.module';

@Module({
  imports: [ConsumerEventsModule],
})
export class AppModule {}
