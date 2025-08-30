import { ZoneDto } from "./zone.dto";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("plan")
export class PlanDto {

    @JsonProperty("plan_start_date", String)
    plan_start_date:string;

    @JsonProperty("plan_end_date", String)
    plan_end_date:string;

    @JsonProperty("plan_id", Number)
    plan_id: number;

    @JsonProperty("sell_from", String)
    sell_from: string;

    @JsonProperty("sell_to", String)
    sell_to: string;

    @JsonProperty("sold_out", Boolean)
    sold_out:boolean;
    
    @JsonProperty("zone", [ZoneDto])
    zone: ZoneDto[];

    constructor() {}
}