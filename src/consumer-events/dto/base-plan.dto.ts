import { Expose } from "@nestjs/class-transformer";
import { PlanDto } from "./plan.dto";

export class BasePlanDto {
    @Expose({ name: 'basePlanId' })
    base: number;
    @Expose()
    sellMode: string;
    @Expose()
    title: string;
    @Expose()
    organizerCompanyId: number;
    @Expose()
    plan: PlanDto[];
}