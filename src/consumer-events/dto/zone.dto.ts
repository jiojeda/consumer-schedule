
import { JsonObject, JsonProperty } from "json2typescript";


@JsonObject("zone")
export class ZoneDto {
     @JsonProperty("zone_id", Number)
    zone_id: number;

    @JsonProperty("capacity", Number)
    capacity: number;
    
    @JsonProperty("price", Number)
    price: number;

    @JsonProperty("name", String)
    name: string;

    @JsonProperty("numbered", Boolean)
    numbered: boolean;
}