import { Module } from '@nestjs/common';
import { ConsumerEventsService } from './consumer-events.service';
import { HttpModule } from '@nestjs/axios';
import { ConsumerEventsClient } from './consumer-events.client';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKERCONNECT || 'localhost:9092'],
          },
        },
      },
    ]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  providers: [ConsumerEventsService, ConsumerEventsClient],
})
export class ConsumerEventsModule {}
