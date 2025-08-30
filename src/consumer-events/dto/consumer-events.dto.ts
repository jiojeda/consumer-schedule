import { Expose } from '@nestjs/class-transformer';
import { BasePlanDto } from './base-plan.dto';

export class ConsumerEventsDto {
    @Expose()
    output: BasePlanDto[];

    constructor() {}
}

