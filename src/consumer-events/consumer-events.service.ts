import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConsumerEventsClient } from './consumer-events.client';
import { ClientKafka } from '@nestjs/microservices';
import { XMLParser } from 'fast-xml-parser';
import { plainToClass } from '@nestjs/class-transformer';
import { ConsumerEventsDto } from './dto/consumer-events.dto';

@Injectable()
export class ConsumerEventsService {
    private readonly logger = new Logger(ConsumerEventsService.name);

    constructor(
        @Inject("KAFKA_SERVICE") private readonly kafkaClient: ClientKafka,
        private readonly client: ConsumerEventsClient
    ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug('Called when the current second is 30');
    const events = await this.client.obtainEventsFromProvider();

    const jsonEvents = this.parseXmlEventsToJson(events)

    this.logger.debug('Sending events to Kafka topic');
    this.logger.debug(JSON.stringify(jsonEvents["output"]));
    //this.kafkaClient.emit('new-events', { value: JSON.stringify(dtoEvents) });
  }

  private parseXmlEventsToJson(xml: string) {
    const alwaysArray = [
        "planList.output.base_plan",
        "planList.output.base_plan.plan",
        "planList.output.base_plan.plan.zone"
    ];

    const options = {
      parseAttributeValue: true, 
      attributeNamePrefix: "",  
      ignorePiTags: true,
      ignoreAttributes: false,
      isArray: (name, jpath, isLeafNode, isAttribute) => { 
        if( alwaysArray.indexOf(jpath) !== -1) return true;
        return false;
      }
    };

    const parser = new XMLParser(options);
    const { planList } = parser.parse(xml);

    return planList;
  }
}
