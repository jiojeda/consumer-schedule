import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerEventsService } from '../src/consumer-events/consumer-events.service';

describe('ConsumerEventsService', () => {
  let service: ConsumerEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumerEventsService],
    }).compile();

    service = module.get<ConsumerEventsService>(ConsumerEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
