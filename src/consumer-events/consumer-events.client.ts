import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

//const PROVIDER_EVENTS_URL = 'https://provider.code-challenge.feverup.com/api/events';
const PROVIDER_EVENTS_URL = 'http://localhost:8080/api/xmlOneZone';

@Injectable()
export class ConsumerEventsClient {
    private readonly logger = new Logger(ConsumerEventsClient.name);

    constructor(private readonly httpService: HttpService) {}

    async obtainEventsFromProvider() {
        const { data } = await firstValueFrom(this.httpService.get(PROVIDER_EVENTS_URL).pipe(
            catchError((error: AxiosError) => {
                this.logger.error(error.response?.data);
                throw 'An error happened!';
            }),
        ),
    );
    
    return data;
  }
}