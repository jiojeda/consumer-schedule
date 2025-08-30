import { Module } from '@nestjs/common';
import { ConsumerEventsService } from './consumer-events.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { ConsumerEventsClient } from './consumer-events.client';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([{
    name: "KAFKA_SERVICE",
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ["localhost:9092"],
      },
    },
  }]),
    ScheduleModule.forRoot(), HttpModule,
  ],
  providers: [ConsumerEventsService, ConsumerEventsClient],
})
export class ConsumerEventsModule {}
