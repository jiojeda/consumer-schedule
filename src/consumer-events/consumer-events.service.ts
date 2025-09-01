import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConsumerEventsClient } from './consumer-events.client';
import { ClientKafka } from '@nestjs/microservices';
import { XMLParser } from 'fast-xml-parser';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ConsumerEventsService {
  private readonly logger = new Logger(ConsumerEventsService.name);

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly client: ConsumerEventsClient,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkForEvents() {
    try {
      //getting events data from provider
      const events = await this.client.obtainEventsFromProvider();

      // Procesar los datos de eventos a JSON de forma segura
      const jsonEvents = this.parseXmlEventsToJson(events);

      // send events data to queue repository
      this.kafkaClient.emit('new-events', {
        value: JSON.stringify(jsonEvents['output']),
      });
      this.logger.debug('data sent to queue');
    } catch (error) {
      this.logger.error(
        error.message ? error.message : 'internal server error',
      );
    }
  }
  private parseXmlEventsToJson(xml: string) {
    const alwaysArray = [
      'planList.output.base_plan',
      'planList.output.base_plan.plan',
      'planList.output.base_plan.plan.zone',
    ];

    const options = {
      parseAttributeValue: true,
      attributeNamePrefix: '',
      ignorePiTags: true,
      ignoreAttributes: false,
      isArray: (name, jpath, isLeafNode, isAttribute) => {
        if (alwaysArray.indexOf(jpath) !== -1) return true;
        return false;
      },
    };

    //transform xml to json object
    const parser = new XMLParser(options);
    const { planList } = parser.parse(xml);

    return planList;
  }
}
