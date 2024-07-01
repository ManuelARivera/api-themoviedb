import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Movie } from 'src/movies/schemas/movie.schema';

@Injectable()
export class HttpCustomService {
  private readonly logger = new Logger(HttpCustomService.name);
  constructor(private readonly httpService: HttpService) {}

  url = process.env.URl;
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTHORIZATION,
    },
  };

  async findAll(): Promise<Movie[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Movie[]>(this.url, this.options).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(
            `Error fetching data: ${error.message}`,
            error.stack,
          );
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}
