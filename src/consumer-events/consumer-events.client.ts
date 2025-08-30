import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

const PROVIDER_EVENTS_URL =
  'https://provider.code-challenge.feverup.com/api/events';

@Injectable()
export class ConsumerEventsClient {
  private readonly logger = new Logger(ConsumerEventsClient.name);

  constructor(private readonly httpService: HttpService) {}

  async obtainEventsFromProvider() {
    const { data } = await firstValueFrom(
      this.httpService.get(PROVIDER_EVENTS_URL).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw new HttpException(
            'Error obteniendo datos del proveedor',
            error.status ?? 500,
          );
        }),
      ),
    );

    return data;
  }
}
